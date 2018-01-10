/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Modal, Checkbox } from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

const CheckboxGroup = Checkbox.Group;

class Validation extends Common {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalData: {},
      validatedValues: []
    };

    this.showValidationModal = this.showValidationModal.bind(this);
    this.hideValidationModal = this.hideValidationModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleValidationCheck = this.handleValidationCheck.bind(this);
  }

  handleOk() {
    const { modalData, validatedValues } = this.state;
    this.props.addValidation({
      _id: modalData.companyId,
      codes: validatedValues
    });
    this.hideValidationModal();
  }

  handleValidationCheck(checkedValues) {
    this.setState({ validatedValues: checkedValues });
  }

  showValidationModal(record) {
    this.setState({
      modalVisible: true,
      modalData: {
        productCodes: record.productsInfo,
        companyId: record._id,
        companyName: record.basicInfo.enName
      },
      validatedValues: record.validatedProductsInfo
    });
  }

  hideValidationModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const {
      selectedCompanies,
      modalVisible,
      modalData,
      validatedValues
    } = this.state;

    let validationOptions = [];
    modalData.productCodes &&
      modalData.productCodes.forEach(i => {
        validationOptions.push({
          label: i,
          value: i
        });
      });

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
          const productsInfo = record.productsInfo;
          if (productsInfo.length > 0) {
            return (
              <a onClick={() => this.showValidationModal(record)}>
                Validate - <strong>{productsInfo.length}</strong>
              </a>
            );
          } else {
            return '-';
          }
        }
      },
      {
        title: 'Last validation date',
        render: () => moment().format(dateFormat)
      },
      {
        title: 'Last validation result',
        render: record => (record.isProductsInfoValidated ? 'Yes' : '-')
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
            </div>
            <br />
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
              className="margin"
            />
          </Card>

          <Modal
            title={modalData.companyName}
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.hideValidationModal}
            bodyStyle={{ maxHeight: '60vh', overflow: 'scroll' }}
          >
            <p>
              <strong>Check validated</strong>
            </p>

            <CheckboxGroup
              options={validationOptions}
              value={validatedValues}
              onChange={this.handleValidationCheck}
              className="horizontal capitalize"
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Validation);
