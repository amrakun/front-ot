import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Table, Card, Popconfirm, Input, Button, Icon, Tooltip } from 'antd';
import { labels, statusIcons } from '../../constants';
import { dateTimeFormat } from 'modules/common/constants';
import queryString from 'query-string';
import moment from 'moment';

const Search = Input.Search;

class Tenders extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);
    const searchQuery = query.search;

    this.state = {
      statuses: query.status && query.status.split(','),
      search: searchQuery || ''
    };

    this.renderOperation = this.renderOperation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  updateQueryString(updateder) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    updateder(query);

    history.push({
      search: queryString.stringify(query)
    });
  }

  handleSearch(value) {
    this.updateQueryString(query => {
      query.search = value;
    });
  }

  handleTableChange(pagination, filters) {
    const statuses = filters.status;

    if (statuses) {
      this.updateQueryString(query => {
        this.setState({ statuses });
        query.status = statuses.join(',');
      });
    }

    this.props.handleTableChange(pagination);
  }

  renderIcon(name, style) {
    const s = statusIcons[name];
    return <Icon type={s.type} style={{ color: s.color, ...style }} />;
  }

  renderTooltippedIcon(record) {
    let { status, isParticipated } = record;

    if (isParticipated) status = 'participated';

    return (
      <Tooltip title={<span className="capitalize">{status}</span>}>
        {this.renderIcon(status, {
          fontSize: '20px',
          lineHeight: '12px'
        })}
      </Tooltip>
    );
  }

  commonColumns() {
    return [
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
      }
    ];
  }

  buyerColumns() {
    const renderIcon = this.renderIcon;
    return [
      {
        title: 'Status',
        filters: [
          {
            text: <span>{renderIcon('draft')} Draft</span>,
            value: 'draft'
          },
          {
            text: <span>{renderIcon('open')} Open</span>,
            value: 'open'
          },
          {
            text: <span>{renderIcon('closed')} Closed</span>,
            value: 'closed'
          },
          {
            text: <span>{renderIcon('awarded')} Awarded</span>,
            value: 'awarded'
          }
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        render: record => this.renderTooltippedIcon(record)
      },
      ...this.commonColumns(),
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
    const renderIcon = this.renderIcon;
    return [
      {
        title: 'Status',
        filters: [
          {
            text: <span>{renderIcon('open')} Open</span>,
            value: 'open'
          },
          {
            text: <span>{renderIcon('closed')} Closed</span>,
            value: 'draft'
          },
          {
            text: <span>{renderIcon('participated')} Participated</span>,
            value: 'closed'
          }
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        render: record => this.renderTooltippedIcon(record)
      },
      ...this.commonColumns(),
      {
        title: 'File',
        render: (text, record) => this.renderFileDownload(record.file.url)
      },
      {
        title: 'Action',
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
          canParticipate && (
            <div style={{ width: '160px' }}>
              <Link to={`/tender/submit/${_id}`}>More</Link>
              <span className="ant-divider" />
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
          )
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
      history,
      exportTenders,
      exportLoading
    } = this.props;

    const { search } = this.state;
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
            style={{ width: 200, float: 'left', marginRight: '16px' }}
            onSearch={this.handleSearch}
          />

          <Button disabled={exportLoading} onClick={exportTenders}>
            Export to excel
            <Icon type="file-excel" />
          </Button>
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
          onChange={this.handleTableChange}
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
  handleTableChange: PropTypes.func,
  currentUser: PropTypes.object,
  notInterested: PropTypes.func,
  history: PropTypes.object,
  exportTenders: PropTypes.func,
  exportLoading: PropTypes.bool
};

export default withRouter(Tenders);
