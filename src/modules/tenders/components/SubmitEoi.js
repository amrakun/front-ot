import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button, Modal, Checkbox } from 'antd';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';
import RfqForm from './forms/RfqForm';

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const agreementOptions = [
  { label: 'We have read and agreed to Oyu Tolgoi', value: 0 }
];

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
      supplierId: currentUser._id,
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
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <TabPane tab="Main info" key="1">
              <div>
                <strong>Tender name: </strong>
                {data.name}
              </div>
              <div>
                <strong>Tender number: </strong>
                {data.number}
              </div>
              <div>
                <strong>Start date: </strong>
                {data.publishDate}
              </div>
              <div>
                <strong>End date: </strong>
                {data.closeDate}
              </div>
              <div>
                <strong>Document: </strong>
                {data.file ? data.file.url : ''}
              </div>
              <br />
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </TabPane>

            <TabPane tab="Form" key="2">
              {data.type === 'eoi' ? (
                <EoiForm {...formProps} />
              ) : (
                <RfqForm {...formProps} />
              )}
              <br />
              <Button type="primary" htmlType="submit" className="margin">
                Save & continue
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
                <p>
                  Please tick the boxes to confirm that you have agree with the
                  statements
                </p>
                <CheckboxGroup
                  options={agreementOptions}
                  className="horizontal"
                  onChange={this.handleAgreementChange}
                />
              </Modal>
            </TabPane>
          </Tabs>
        </div>
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
