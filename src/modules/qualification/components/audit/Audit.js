/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import {
  Table,
  Card,
  Row,
  Col,
  Button,
  Icon,
  Modal,
  message,
  DatePicker
} from 'antd';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/companies/components';
import { dateFormat, dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';

class Audit extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      auditModalVisible: false
    };

    this.addAudit = this.addAudit.bind(this);
    this.toggleAuditModal = this.toggleAuditModal.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
  }

  addAudit() {
    if (!this.dateRange) {
      message.error('Please choose publish and close date!');
    } else {
      const { addAudit } = this.props;
      const { selectedCompanies } = this.state;

      this.setState({ auditModalVisible: false });
      addAudit({
        supplierIds: selectedCompanies,
        publishDate: this.dateRange[0],
        closeDate: this.dateRange[1]
      });
    }
  }

  toggleAuditModal(value) {
    if (value && this.state.selectedCompanies.length < 1)
      message.error('Please select atleast one supplier');
    else this.setState({ auditModalVisible: value });
  }

  toggleViewModal(value) {
    this.setState({ viewModalVisible: value });
  }

  handleDateRangeChange(value) {
    this.dateRange = value;
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedCompanies, auditModalVisible } = this.state;

    const columns = this.getWrappedColumns([
      {
        title: 'Qualified',
        render: () => 'No'
      },
      {
        title: 'Auditor report',
        render: () => <a>View</a>
      },
      {
        title: 'Auditor improvement plan',
        render: () => <a>View</a>
      },
      {
        title: 'Last qualification date',
        render: record =>
          record.lastAudit
            ? moment(record.lastAudit.closeDate).format(dateFormat)
            : '-'
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={() => this.toggleAuditModal(true)}>
                Send desktop audit invitation
                <Icon type="mail" />
              </Button>
            </div>

            <Table
              rowSelection={{
                selectedCompanies,
                onChange: this.onSelectedCompaniesChange
              }}
              columns={columns}
              rowKey={record => record._id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              scroll={{ x: 1600 }}
              onChange={(pagination, filters, sorter) =>
                onChange(pagination, filters, sorter)
              }
            />
          </Card>

          <Modal
            title="Send desktop audit invitation"
            visible={auditModalVisible}
            onCancel={() => this.toggleAuditModal(false)}
            onOk={this.addAudit}
          >
            Sending desktop audit invitation to&nbsp;
            <strong>{selectedCompanies.length}</strong> suppliers.
            <a onClick={() => window.open('/audit/template')}>View template</a>
            <DatePicker.RangePicker
              className="margin"
              onOk={this.handleDateRangeChange}
              showTime
              format={dateTimeFormat}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Audit);
