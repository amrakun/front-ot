/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, DatePicker } from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search } from 'modules/common/components';
import queryString from 'query-string';
import { Common } from 'modules/companies/components';

class ReportsAndPlans extends Common {
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
        title: 'Status by action',
        dataIndex: 'status',
        filters: [
          {
            text: 'Qualified',
            value: 'qualfied'
          },
          {
            text: 'Sent improvement plan/report',
            value: 'sent'
          }
        ]
      },
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'More',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditor report',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditor improvement plan',
        render: () => <a>View</a>
      },
      { title: 'Contact person', dataIndex: 'supplier.contactInfo.name' },
      { title: 'Email address', dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone number', dataIndex: 'supplier.contactInfo.phone' }
    ];
  }

  render() {
    const { pagination, loading, onChange, data } = this.props;

    return (
      <Card title="Reports & improvement plans">
        <div className="table-operations">
          <Search />
          <DatePicker.RangePicker onChange={this.handleDateRangeChange} />
        </div>

        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          scroll={{ x: 1500 }}
          pagination={pagination}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
      </Card>
    );
  }
}

export default withRouter(ReportsAndPlans);
