/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Modal, Checkbox, Divider, Button, Icon } from 'antd';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
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
    const { totalCount, exportExcel } = this.props;
    const { modalVisible, modalData, validatedValues } = this.state;

    let validationOptions = [];

    modalData.productCodes &&
      modalData.productCodes.forEach(i => {
        validationOptions.push({
          label: i,
          value: i
        });
      });

    const columns = this.getWrappedColumns([
      {
        title: 'Product/Service code',
        render: record => {
          const productsInfo = record.productsInfo;
          if (productsInfo.length > 0) {
            return (
              <a onClick={() => this.showValidationModal(record)}>
                Total: <strong>{productsInfo.length}</strong>
                <Divider type="vertical" />
                Validated:&nbsp;
                <strong>{record.validatedProductsInfo.length}</strong>
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
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={exportExcel}>
                Export excel
                <Icon type="file-excel" />
              </Button>
            </div>
            {this.renderTable({ columns })}
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
