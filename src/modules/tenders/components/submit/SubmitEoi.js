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
    this.saveDraft = this.saveDraft.bind(this);
    this.collectInputs = this.collectInputs.bind(this);
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

  collectInputs() {
    const documents = [];

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];

        documents.push({
          notes: product.notes,
          isSubmitted: product.isSubmitted,
          file: product.file,
          name: product.document
        });
      }
    });

    return documents;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.toggleAgreementModal();
  }

  handleOk() {
    this.setState({ submitLoading: true });
    this.props.save({ respondedDocuments: this.collectInputs() }, true);
  }

  saveDraft() {
    this.save({ respondedDocuments: this.collectInputs() });
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

          {!data.isSent && (
            <div className="margin">
              <Button style={{ marginRight: '16px' }} onClick={this.saveDraft}>
                Save as draft
              </Button>
              <Button type="primary" htmlType="submit">
                Save & submit
              </Button>
            </div>
          )}

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

const form = Form.create()(SubmitTender);

export default withRouter(form);
