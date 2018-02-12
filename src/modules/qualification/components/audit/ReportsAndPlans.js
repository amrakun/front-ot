/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, DatePicker, Button, Icon, Modal, Checkbox } from 'antd';
import { dateFormat, dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search, Uploader } from 'modules/common/components';
import queryString from 'query-string';
import { Common } from 'modules/companies/components';
import { Link } from 'react-router-dom';

class ReportsAndPlans extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      modalVisible: false,
      filesToSend: ['report', 'improvementPlan']
    };

    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleFilesToSendChange = this.handleFilesToSendChange.bind(this);
  }

  handleSend() {
    const { selectedCompanies, filesToSend } = this.state;

    this.props.sendFiles({
      responseIds: selectedCompanies,
      improvementPlan: filesToSend.includes('improvementPlan'),
      report: filesToSend.includes('report')
    });

    this.hideModal();
  }

  handleFilesToSendChange(value) {
    this.setState({ filesToSend: value });
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
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
    const { selectedCompanies, modalVisible, filesToSend } = this.state;
    console.log(data);
    const filesToSendOptions = [
      { label: 'Report', value: 'report' },
      { label: 'Improvement plan', value: 'improvementPlan' }
    ];

    return (
      <Card title="Reports & improvement plans">
        <div className="table-operations">
          <Search />

          <DatePicker.RangePicker
            style={{ float: 'left', marginLeft: '8px' }}
            onChange={this.handleDateRangeChange}
          />

          <Button
            onClick={this.showModal}
            disabled={selectedCompanies.length < 1}
          >
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

        <Modal
          title={`Send reports and improvement plans for ${
            selectedCompanies.length
          } suppliers`}
          visible={modalVisible}
          onOk={this.handleSend}
          onCancel={this.hideModal}
        >
          <Checkbox.Group
            options={filesToSendOptions}
            value={filesToSend}
            onChange={this.handleFilesToSendChange}
          />
        </Modal>
      </Card>
    );
  }
}

export default withRouter(ReportsAndPlans);
