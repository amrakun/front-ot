/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, DatePicker, Button, Icon } from 'antd';
import { dateFormat, dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search, Uploader } from 'modules/common/components';
import queryString from 'query-string';
import { Common } from 'modules/companies/components';
import { Link } from 'react-router-dom';

class ReportsAndPlans extends Common {
  constructor(props) {
    super(props);

    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(file, record, fileType) {
    if (file[0].url) {
      this.props.saveFiles({
        supplierId: record.supplier._id,
        auditId: record.audit._id,
        [fileType]: file[0].url
      });
    }
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
            text: 'On time',
            value: 'onTime'
          },
          {
            text: 'Late',
            value: 'late'
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
        title: 'Applied information',
        render: record =>
          record.supplier ? (
            <Link
              to={{
                pathname: '/audit/qualify',
                state: {
                  supplierId: record.supplier._id,
                  auditId: record.audit._id
                }
              }}
            >
              View
            </Link>
          ) : (
            '-'
          )
      },
      {
        title: 'Last auditor report',
        render: record => (
          <Uploader
            onChange={args => this.handleUpload(args, record, 'report')}
            defaultFileList={[
              {
                url: record.reportFile,
                name: record.reportSentDate
                  ? moment(record.reportSentDate, dateTimeFormat)
                  : 'Not sent yet'
              }
            ]}
          />
        )
      },
      {
        title: 'Last auditor improvement plan',
        render: record => (
          <Uploader
            onChange={args =>
              this.handleUpload(args, record, 'improvementPlan')
            }
            defaultFileList={[
              {
                url: record.improvementPlanFile,
                name: record.improvementPlanSentDate
                  ? moment(record.improvementPlanSentDate, dateTimeFormat)
                  : 'Not sent yet'
              }
            ]}
          />
        )
      },
      { title: 'Contact person', dataIndex: 'supplier.contactInfo.name' },
      { title: 'Email address', dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone number', dataIndex: 'supplier.contactInfo.phone' }
    ];
  }

  render() {
    const { pagination, loading, onChange, data } = this.props;
    const { selectedCompanies } = this.state;

    return (
      <Card title="Reports & improvement plans">
        <div className="table-operations">
          <Search />
          <DatePicker.RangePicker
            style={{ float: 'left', marginLeft: '8px' }}
            onChange={this.handleDateRangeChange}
          />
          <Button>
            Send<Icon type="mail" />
          </Button>
        </div>

        <Table
          rowSelection={{
            selectedCompanies,
            onChange: this.onSelectedCompaniesChange
          }}
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          scroll={{ x: 1700 }}
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
