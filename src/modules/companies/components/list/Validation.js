/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button, Modal } from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Validation extends Common {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalData: []
    };

    this.showValidationModal = this.showValidationModal.bind(this);
    this.hideValidationModal = this.hideValidationModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {}

  showValidationModal(data) {
    this.setState({ modalVisible: true, modalData: data });
  }

  hideValidationModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { data, pagination, loading, onChange, addValidation } = this.props;
    const { selectedCompanies, modalVisible, modalData } = this.state;
    console.log(modalData);
    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      {
        title: 'Tier type',
        render: () => <a>View</a>
      },
      { title: 'Pre-qualification status', render: () => <a>Yes</a> },
      {
        title: 'Product/Service code',
        render: record => {
          const pI = record.productsInfo ? record.productsInfo : [];
          return (
            <a onClick={() => this.showValidationModal(pI)}>{pI.length}</a>
          );
        }
      },
      {
        title: 'Last validation date',
        render: () => moment().format(dateFormat)
      },
      {
        title: 'Last validation result',
        dataIndex: 'result'
      },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
    ];

    return (
      <Row gutter={16}>
        <Sidebar />

        <Col span={18}>
          <Card title="Companies">
            <div className="table-operations">
              <Search />

              <Button onClick={() => addValidation(this.reports)}>Save</Button>
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
              scroll={{ x: 1800 }}
              onChange={(pagination, filters, sorter) =>
                onChange(pagination, filters, sorter)
              }
            />
          </Card>

          <Modal
            title="Validation"
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={() => this.toggleValidationModal(false)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Validation);
