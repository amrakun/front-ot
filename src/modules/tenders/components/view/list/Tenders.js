import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import moment from 'moment';
import { Table, Card, Icon, DatePicker } from 'antd';
import { Paginator, Search, HelpModal } from 'modules/common/components';
import { dateTimeFormat } from 'modules/common/constants';
import router from 'modules/common/router';
import { labels, statusIcons } from '../../../constants';

const MonthPicker = DatePicker.MonthPicker;

class Tenders extends React.Component {
  constructor(props) {
    super(props);

    const { history, type } = props;

    this.statusParam = `${type}status`;

    const query = queryString.parse(history.location.search);
    const status = query[this.statusParam] || '';

    this.state = {
      statuses: status.split(','),
    };

    this.renderOperation = this.renderOperation.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleMonthChange(value) {
    const { type } = this.props;

    router.setParams(this.props.history, { [`${type}month`]: value });
  }

  handleTableChange(pagination, filters) {
    const statuses = filters.status;

    if (statuses && statuses.length > 0) {
      router.setParams(this.props.history, {
        [this.statusParam]: statuses.join(','),
      });
    } else {
      router.removeParams(this.props.history, this.statusParam);
    }

    this.setState({ statuses });
  }

  renderIcon(name, style) {
    const s = statusIcons[name];
    return <Icon type={s.type} style={{ color: s.color, ...style }} />;
  }

  commonColumns() {
    const { __ } = this.context;

    return [
      {
        title: __('Tender Number'),
        dataIndex: 'number',
        fixed: 'left',
        width: 75,
      },
      {
        title: __('Tender Description'),
        width: 100,
        render: (text, record) => <p style={{ maxWidth: '300px' }}>{record.name}</p>,
      },
      {
        title: __('Publish Date'),
        render: (text, record) => this.renderDate(record.publishDate),
        width: 150,
      },
      {
        title: __('Close Date'),
        render: (text, record) => this.renderDate(record.closeDate),
        width: 150,
      },
    ];
  }

  renderBoolean(text, record) {
    if (record.sentRegretLetter) return 'Yes';
    else return '-';
  }

  renderDate(date) {
    return moment(date).format(dateTimeFormat);
  }

  renderFileDownload(url) {
    const { __ } = this.context;

    return (
      <a href={url} target="__blank">
        {__('View')}
      </a>
    );
  }

  renderTenders(args) {
    const { type, data, loading, history, totalCount } = this.props;
    const { __ } = this.context;

    const { columns, operation, isSupplier } = args;

    const { location } = history;

    const highlightedId = location.state && location.state.newTenderId;

    const label = labels[type] ? __(labels[type]) : labels[type];

    let title = label;

    if (isSupplier) {
      title = (
        <div>
          {label} <HelpModal videoId={type} />
        </div>
      );
    }

    return (
      <Card style={{ marginBottom: '16px' }} title={title}>
        <div className="table-operations">
          <Search placeholder={__('Tender Name')} paramPrefix={type} />

          <MonthPicker
            style={{ float: 'left', width: '200px', marginLeft: '20px' }}
            placeholder={__('Select year and month')}
            onChange={this.handleMonthChange}
            allowClear
          />

          {operation || <div style={{ height: '32px' }} />}
        </div>

        <Table
          columns={columns}
          rowKey={record => record._id}
          rowClassName={record => {
            if (record._id === highlightedId) return 'highlight';
          }}
          pagination={false}
          dataSource={data}
          loading={loading}
          scroll={{ x: 1500 }}
          onChange={this.handleTableChange}
          className="tenders-table"
        />

        <Paginator total={totalCount} paramPrefix={type} />
      </Card>
    );
  }
}

Tenders.propTypes = {
  type: PropTypes.string,
  isSupplier: PropTypes.bool,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  history: PropTypes.object,
  totalCount: PropTypes.number,
};

Tenders.contextTypes = {
  __: PropTypes.func,
};

export default Tenders;
