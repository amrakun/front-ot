import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'modules/common/components';
import { Table, Card, Icon, Tooltip, DatePicker } from 'antd';
import { labels, statusIcons } from '../../../constants';
import { dateTimeFormat } from 'modules/common/constants';
import queryString from 'query-string';
import moment from 'moment';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  tenderNumber: {
    id: 'tenderNumber',
    defaultMessage: 'Tender Number'
  },
  tenderName: {
    id: 'tenderName',
    defaultMessage: 'Tender Name'
  },
  tenderPublishDate: {
    id: 'tenderPublishDate',
    defaultMessage: 'Publish Date'
  },
  tenderCloseDate: {
    id: 'tenderCloseDate',
    defaultMessage: 'Close Date'
  },
  tenderPlaceholderName: {
    id: 'tenderPlaceholderName',
    defaultMessage: 'Tender name'
  },
  tenderSelectDate: {
    id: 'tenderSelectDate',
    defaultMessage: 'Select year and month'
  },
  eoi: {
    id: 'eoi',
    defaultMessage: 'Expression Of Interest'
  },
  rfq: {
    id: 'rfq',
    defaultMessage: 'Request For Quotation'
  }
});

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
    const { formatMessage } = this.context;
    return [
      {
        title: formatMessage(messages.tenderNumber),
        dataIndex: 'number'
      },
      {
        title: formatMessage(messages.tenderName),
        dataIndex: 'name'
      },
      {
        title: formatMessage(messages.tenderPublishDate),
        render: (text, record) => this.renderDate(record.publishDate)
      },
      {
        title: formatMessage(messages.tenderCloseDate),
        render: (text, record) => this.renderDate(record.closeDate)
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
        <T id="view">View</T>
      </a>
    );
  }

  renderTenders(args) {
    const { type, data, pagination, loading, history } = this.props;

    const { columns, operation } = args;

    const { location } = history;

    const highlightedId = location.state && location.state.newTenderId;

    const { formatMessage } = this.context;

    return (
      <Card style={{ marginBottom: '16px' }} title={labels[type]}>
        <div className="table-operations">
          <Search placeholder={formatMessage(messages.tenderPlaceholderName)} />

          <MonthPicker
            style={{ float: 'left', marginLeft: '16px' }}
            placeholder={formatMessage(messages.tenderSelectDate)}
            onChange={this.handleMonthChange}
            allowClear
            disabled
          />

          {operation || <div style={{ height: '32px' }} />}
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
  history: PropTypes.object
};

Tenders.contextTypes = {
  formatMessage: PropTypes.func
};

export default Tenders;
