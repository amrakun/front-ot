import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Modal, Checkbox, Tabs } from 'antd';
import { BaseForm } from 'modules/common/components';
import { agreementOptions } from './constants';
import Actions from './Actions';
import EoiTable from './EoiTable';
import MainInfo from './MainInfo';
import { TenderMessagesSingle } from 'modules/tender_messages/containers/';

const TabPane = Tabs.TabPane;

const CheckboxGroup = Checkbox.Group;

class SubmitTender extends BaseForm {
  constructor(props) {
    super(props);

    const { response } = props;

    this.state = {
      respondedDocuments: response ? response.respondedDocuments : [],
      submitDisabled: true,
      submitLoading: false,
      agreementModalVisible: false,
    };

    this.onChangeDocuments = this.onChangeDocuments.bind(this);
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
    checkedList.length === agreementOptions().length
      ? this.setState({ submitDisabled: false })
      : this.setState({ submitDisabled: true });
  }

  onChangeDocuments(respondedDocuments) {
    this.setState({ respondedDocuments });
  }

  collectDocuments() {
    return this.state.respondedDocuments.map(document => {
      delete document.key;
      delete document.__typename;

      return document;
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.toggleAgreementModal();
  }

  handleOk() {
    this.setState({ submitLoading: true });
    this.props.save({ respondedDocuments: this.collectDocuments() }, true);
  }

  render() {
    const { agreementModalVisible, submitDisabled, submitLoading } = this.state;

    const { data, response } = this.props;

    const { __ } = this.context;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="Main">
          <Form layout="inline">
            <MainInfo {...data} />

            <Card title={__('Apply to EOI')} className="margin">
              <EoiTable
                requestedDocuments={data.requestedDocuments || []}
                respondedDocuments={response ? response.respondedDocuments : []}
                onChange={this.onChangeDocuments}
              />

              <br />

              <Actions
                tender={data}
                __={__}
                onNotInterested={() => this.save({ isNotInterested: true })}
                onSaveDraft={() => this.save({ respondedDocuments: this.collectDocuments() })}
                onSubmit={this.handleSubmit}
              />

              <Modal
                title={__('Confirmation')}
                visible={agreementModalVisible}
                onCancel={this.toggleAgreementModal}
                footer={[
                  <Button key="back" size="large" onClick={this.toggleAgreementModal}>
                    {__('Return')}
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    size="large"
                    disabled={submitDisabled}
                    loading={submitLoading}
                    onClick={this.handleOk}
                  >
                    {__('Submit')}
                  </Button>,
                ]}
              >
                <strong>
                  {__('Please tick the boxes to confirm that you have agree with the statements')}
                </strong>

                <CheckboxGroup
                  options={agreementOptions(__)}
                  className="horizontal"
                  onChange={this.handleAgreementChange}
                />
              </Modal>
            </Card>
          </Form>
        </TabPane>
        <TabPane key="2" tab="Messages">
          <TenderMessagesSingle
            tenderDetail={this.props.data}
            queryParams={this.props.queryParams}
          />
        </TabPane>
      </Tabs>
    );
  }
}

SubmitTender.propTypes = {
  data: PropTypes.object,
};

SubmitTender.contextTypes = {
  __: PropTypes.func,
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
