import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Modal, Checkbox } from 'antd';
import TenderForm from '../TenderForm';
import EoiTable from '../EoiTable';
import { agreementOptions } from './constants';
import MainInfo from './MainInfo';

const CheckboxGroup = Checkbox.Group;

class SubmitTender extends TenderForm {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      submitDisabled: true,
      submitLoading: false,
      agreementModalVisible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgreementModal = this.toggleAgreementModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleAgreementChange = this.handleAgreementChange.bind(this);
  }

  toggleAgreementModal() {
    const visible = this.state.agreementModalVisible;
    this.setState({ agreementModalVisible: !visible });
  }

  handleAgreementChange(checkedList) {
    checkedList.length === agreementOptions.length
      ? this.setState({ submitDisabled: false })
      : this.setState({ submitDisabled: true });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.toggleAgreementModal();
  }

  handleOk() {
    const { currentUser } = this.context;
    const products = [];

    this.setState({ submitLoading: true });

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];
        product.name = product.document;
        delete product.key;
        delete product.document;
        products.push(product);
      }
    });

    this.save({
      supplierId: currentUser.companyId,
      tenderId: this.props.data._id,
      respondedDocuments: products
    });
  }

  render() {
    const {
      products,
      agreementModalVisible,
      submitDisabled,
      submitLoading
    } = this.state;
    const { data } = this.props;

    const formProps = {
      products: products,
      renderProductColumn: this.renderProductColumn
    };

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <MainInfo {...data} />

        <Card title="Apply to EOI" className="margin">
          <EoiTable {...formProps} />
          <br />
          <Button type="primary" htmlType="submit" className="margin">
            Save
          </Button>

          <Modal
            title="Confirmation"
            visible={agreementModalVisible}
            onCancel={this.toggleAgreementModal}
            footer={[
              <Button
                key="back"
                size="large"
                onClick={this.toggleAgreementModal}
              >
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                size="large"
                disabled={submitDisabled}
                loading={submitLoading}
                onClick={this.handleOk}
              >
                Submit
              </Button>
            ]}
          >
            <strong>
              Please tick the boxes to confirm that you have agree with the
              statements
            </strong>
            <CheckboxGroup
              options={agreementOptions}
              className="horizontal"
              onChange={this.handleAgreementChange}
            />
          </Modal>
        </Card>
      </Form>
    );
  }
}

SubmitTender.propTypes = {
  data: PropTypes.object
};

SubmitTender.contextTypes = {
  currentUser: PropTypes.object
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
