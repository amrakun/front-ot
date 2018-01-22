import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, DatePicker } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search } from 'modules/companies/components';
import queryString from 'query-string';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
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

  columns() {
    return [
      {
        title: 'Type',
        dataIndex: 'status',
        filters: [
          {
            text: 'Open',
            value: 'open'
          },
          {
            text: 'Closed',
            value: 'closed'
          }
        ]
      },
      {
        title: 'Publish date',
        render: record => moment(record.publishDate).format(dateTimeFormat),
        key: 'date'
      },
      {
        title: 'Expiration date',
        render: record => moment(record.expirationDate).format(dateTimeFormat),
        key: 'expirationDate'
      },
      {
        title: 'Invited suppliers',
        render: record =>
          record.supplierIds ? record.supplierIds.length : '-',
        key: 'suppliers'
      },
      {
        title: 'Participated suppliers',
        render: record => (record.responses ? record.responses.length : '-'),
        key: 'responses'
      },
      {
        title: 'Qualified suppliers',
        render: () => '0',
        key: 'qualified'
      },
      {
        title: 'Sent improvement plan',
        render: () => '0',
        key: 'isSent'
      },
      {
        title: 'Sent auditer report',
        render: () => '0',
        key: 'auditerReportSent'
      },
      {
        title: 'More',
        render: record => (
          <Link to={`/audit/response/${record._id}`}>View</Link>
        ),
        key: 'action'
      }
    ];
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    return (
      <Card title="Qualification responses">
        <div className="table-operations">
          <Search />
          <DatePicker.RangePicker onChange={this.handleDateRangeChange} />
        </div>

        <Table
          columns={this.columns()}
          rowKey={record => record._id}
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

AuditResponses.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(AuditResponses);
