import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Popconfirm, Input, DatePicker } from 'antd';
import { labels } from '../../constants';
import { dateFormat, dateTimeFormat } from 'modules/common/constants';
import queryString from 'query-string';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

class Tenders extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);
    const searchQuery = query.search;

    this.status = query.status && query.status.split(',');

    let dateRange = [];
    if (query.from) dateRange = [moment(query.from), moment(query.to)];

    this.state = {
      search: searchQuery || '',
      dateRange: dateRange
    };

    this.renderOperation = this.renderOperation.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      search: queryString.stringify(query)
    });
  }

  handleDateRangeChange(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.from = value[0]._d;
    query.to = value[1]._d;

    history.push({
      search: queryString.stringify(query)
    });
  }

  buyerColumns() {
    return [
      {
        title: 'Status',
        dataIndex: 'status',
        filters: [
          {
            text: 'Draft',
            value: 'draft'
          },
          {
            text: 'Open',
            value: 'open'
          },
          {
            text: 'Closed',
            value: 'closed'
          },
          {
            text: 'Awarded',
            value: 'awarded'
          }
        ],
        filteredValue: this.status
      },
      {
        title: 'Number',
        dataIndex: 'number'
      },
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Publish date',
        render: (text, record) => this.renderDate(record.publishDate)
      },
      {
        title: 'Close date',
        render: (text, record) => this.renderDate(record.closeDate)
      },
      {
        title: 'Suppliers',
        dataIndex: 'requestedCount'
      },
      {
        title: 'Submitted',
        dataIndex: 'submittedCount'
      },
      {
        title: 'Not interested',
        dataIndex: 'notInterestedCount'
      },
      {
        title: 'Not responded',
        dataIndex: 'notRespondedCount'
      },
      {
        title: 'Sourcing officer',
        dataIndex: 'createdUser.email'
      },
      {
        title: 'Regret letter',
        render: this.renderBoolean
      },
      {
        title: 'More',
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record)
      }
    ];
  }

  supplierColumns() {
    return [
      {
        title: 'Status',
        render: this.renderStatus,
        dataIndex: 'status',
        filters: [
          {
            text: 'Open',
            value: 'open'
          },
          {
            text: 'Closed',
            value: 'closed'
          },
          {
            text: 'Participated',
            value: 'participated'
          }
        ]
      },
      {
        title: 'Number',
        dataIndex: 'number'
      },
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Publish date',
        render: (text, record) => this.renderDate(record.publishDate)
      },
      {
        title: 'Close date',
        render: (text, record) => this.renderDate(record.closeDate)
      },
      {
        title: 'File',
        render: (text, record) => this.renderFileDownload(record.file.url)
      },
      {
        title: 'Actions',
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record)
      }
    ];
  }

  renderStatus(text, record) {
    return record.isParticipated ? 'participated' : record.status;
  }

  renderBoolean(text, record) {
    if (record.sentRegretLetter) return 'Yes';
    else return '-';
  }

  renderDate(date) {
    return moment(date).format(dateTimeFormat);
  }

  renderFileDownload(url) {
    return (
      <a href={url} target="_blank">
        View
      </a>
    );
  }

  renderOperation(record) {
    const { currentUser, notInterested } = this.props;
    const { status, _id, isParticipated } = record;
    const canParticipate = status === 'open' && !isParticipated;

    if (currentUser) {
      if (currentUser.isSupplier) {
        return (
          <div style={{ width: '160px' }}>
            {canParticipate && [
              <Link to={`/tender/submit/${_id}`} key={0}>
                More
              </Link>,
              <span className="ant-divider" key={1} />
            ]}
            <Popconfirm
              title="Are you sure you are not interested？"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => notInterested(_id)}
            >
              <a>Not interested</a>
            </Popconfirm>
          </div>
        );
      } else {
        return (
          <div>
            <Link to={`/tender/${_id}`}>View</Link>
            {status === 'draft' && [
              <span className="ant-divider" key={0} />,
              <Link key={1} to={`/tender/edit/${_id}`}>
                Edit
              </Link>
            ]}
          </div>
        );
      }
    } else {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/sign-in?required`}>More</Link>
        </div>
      );
    }
  }

  render() {
    const {
      currentUser,
      type,
      data,
      pagination,
      loading,
      onChange,
      history
    } = this.props;

    const { search, dateRange } = this.state;
    const { location } = history;

    const highlightedId = location.state && location.state.newTenderId;

    let columns = this.supplierColumns();
    if (currentUser && !currentUser.isSupplier) columns = this.buyerColumns();

    return (
      <Card style={{ marginBottom: '16px' }} title={labels[type]}>
        <div className="table-operations">
          <Search
            defaultValue={search}
            placeholder="Name or number"
            style={{ width: 200, float: 'left' }}
            onSearch={this.handleSearch}
          />

          <RangePicker
            defaultValue={dateRange}
            format={dateFormat}
            placeholder={['From', 'To']}
            onChange={this.handleDateRangeChange}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          rowKey={record => record._id}
          rowClassName={record => {
            if (record._id === highlightedId) return 'highlight';
          }}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          scroll={{ x: 1500 }}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
      </Card>
    );
  }
}

Tenders.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  currentUser: PropTypes.object,
  notInterested: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Tenders);
