import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Search } from 'modules/common/components';
import {
  Table,
  Card,
  Popconfirm,
  Button,
  Icon,
  Tooltip,
  DatePicker,
  Divider
} from 'antd';
import { labels, statusIcons } from '../../constants';
import { dateTimeFormat } from 'modules/common/constants';
import queryString from 'query-string';
import moment from 'moment';

const MonthPicker = DatePicker.MonthPicker;

class Tenders extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    this.state = {
      statuses: query.status && query.status.split(',')
    };

    this.renderOperation = this.renderOperation.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
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

  handleMonthChange(value) {
    this.updateQueryString(query => {
      query.month = value;
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

    this.props.onChange(pagination);
  }

  renderIcon(name, style) {
    const s = statusIcons[name];
    return <Icon type={s.type} style={{ color: s.color, ...style }} />;
  }

  renderTooltippedIcon(record) {
    let { status, isParticipated, isSent } = record;

    if (isParticipated && status !== 'canceled') status = 'draft';
    if (isSent && status !== 'canceled') status = 'participated';

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
        title: 'Tender number',
        dataIndex: 'number'
      },
      {
        title: 'Tender name',
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
          },
          {
            text: <span>{renderIcon('canceled')} Canceled</span>,
            value: 'canceled'
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
        dataIndex: 'sourcingOfficer'
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
            value: 'closed'
          },
          {
            text: <span>{renderIcon('participated')} Participated</span>,
            value: 'participated'
          }
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        render: record => this.renderTooltippedIcon(record)
      },
      ...this.commonColumns(),
      {
        title: 'File',
        render: (text, record) =>
          record.file ? this.renderFileDownload(record.file.url) : '-'
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
    const { currentUser, notInterested, cancelTender } = this.props;
    const { status, _id, isParticipated, isSent } = record;

    const canNotInterested = status === 'open' && !isSent && !isParticipated;

    if (currentUser) {
      if (currentUser.isSupplier) {
        return (
          <div style={{ width: '160px' }}>
            <Link to={`/tender/submit/${_id}`}>Open</Link>
            {canNotInterested && [
              <Divider type="vertical" key={0} />,
              <Popconfirm
                key={1}
                title="Are you sure you are not interested？"
                placement="bottomRight"
                okText="Yes"
                cancelText="No"
                onConfirm={() => notInterested(_id)}
              >
                <a>Not interested</a>
              </Popconfirm>
            ]}
          </div>
        );
      } else {
        return (
          <div style={{ width: '120px' }}>
            <Link to={`/tender/${_id}`}>View</Link>
            {!['closed', 'awarded'].includes(status) && [
              <Divider key={0} type="vertical" />,
              <Link key={1} to={`/tender/edit/${_id}`}>
                Edit
              </Link>
            ]}
            {!['closed', 'awarded', 'canceled'].includes(status) && [
              <Divider key={0} type="vertical" />,
              <Popconfirm
                key={3}
                title="Are you sure you want to cancel this tender？"
                placement="bottomRight"
                okText="Yes"
                cancelText="No"
                onConfirm={() => cancelTender(_id)}
              >
                <a>Cancel</a>
              </Popconfirm>
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

    const { location } = history;

    const highlightedId = location.state && location.state.newTenderId;

    let columns = this.supplierColumns();
    if (currentUser && !currentUser.isSupplier) columns = this.buyerColumns();

    return (
      <Card style={{ marginBottom: '16px' }} title={labels[type]}>
        <div className="table-operations">
          <Search placeholder="Tender name" />

          <MonthPicker
            style={{ float: 'left', marginLeft: '16px' }}
            placeholder="Select year and month"
            onChange={this.handleMonthChange}
            allowClear
            disabled
          />

          {currentUser && !currentUser.isSupplier ? (
            <Button disabled={exportLoading} onClick={exportTenders}>
              Export to excel
              <Icon type="file-excel" />
            </Button>
          ) : (
            <div style={{ height: '30px' }} />
          )}
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
  onChange: PropTypes.func,
  currentUser: PropTypes.object,
  notInterested: PropTypes.func,
  cancelTender: PropTypes.func,
  history: PropTypes.object,
  exportTenders: PropTypes.func,
  exportLoading: PropTypes.bool
};

export default withRouter(Tenders);
