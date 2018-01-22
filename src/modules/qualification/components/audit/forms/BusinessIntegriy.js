import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card, Button, Modal, Checkbox } from 'antd';
import AuditFormsBase from './AuditFormsBase';
import { evidenceCheckList } from './constants';

class BusinessIntegriy extends AuditFormsBase {
  constructor(props) {
    super(props);

    this.evidenceChecks = [];

    this.state = {
      ...this.state,
      evidenceModalVisible: false,
      submitLoading: false
    };

    this.saveAndCheckEvidence = this.saveAndCheckEvidence.bind(this);
    this.hideEvidenceModal = this.hideEvidenceModal.bind(this);
    this.handleEvidenceChange = this.handleEvidenceChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.saveAndCreatePlan = this.saveAndCreatePlan.bind(this);
    this.saveAndCreateReport = this.saveAndCreateReport.bind(this);
  }

  saveAndCheckEvidence(e) {
    e.preventDefault();

    this.collectAndSave(true); //lastTab = true
    this.setState({ evidenceModalVisible: true });
  }

  handleEvidenceChange(values) {
    this.evidenceChecks = values;
  }

  hideEvidenceModal() {
    this.setState({ evidenceModalVisible: false });
  }

  saveAndCreatePlan(e) {
    e.preventDefault();

    this.collectAndSave(true);
  }

  saveAndCreateReport(e) {
    e.preventDefault();

    this.collectAndSave(true);
  }

  handleOk() {
    this.setState({ submitLoading: true });

    const doc = {};
    this.evidenceChecks.forEach(item => (doc[item] = true));

    this.props.saveEvidenceChecks(doc);
  }

  render() {
    const render = this.renderQuestion;
    const { evidenceModalVisible, submitLoading } = this.state;
    const { response } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Business integrity">
          {render('doesHavePolicyStatement')}
          {render('ensureThroughoutCompany')}
          {render('ensureThroughoutSupplyChain')}
          {render('haveBeenSubjectToInvestigation')}
          {render('doesHaveDocumentedPolicyToCorruption')}
          {render('whoIsResponsibleForPolicy')}
        </Card>
        {this.renderGoBack()}
        {response ? (
          <div style={{ float: 'right' }}>
            {this.renderSubmit(
              'Save & create improvement plan',
              this.saveAndCreatePlan
            )}
            {this.renderSubmit(
              'Save & create report',
              this.saveAndCreateReport
            )}
          </div>
        ) : (
          this.renderSubmit('Save & submit', this.saveAndCheckEvidence)
        )}

        <Modal
          title="Confirmation"
          visible={evidenceModalVisible}
          onCancel={this.hideEvidenceModal}
          width="80vh"
          bodyStyle={{ height: '60vh', overflow: 'scroll' }}
          footer={[
            <Button key="back" onClick={this.hideEvidenceModal}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={submitLoading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <strong>
            Please send your evidences for each question to &#34;
            <a href="mailto:narantsatsral@ot.mn" target="_top">
              narantsatsral@ot.mn
            </a>&#34; , and tick the boxes to confirm that you have sent each
            evidence.
          </strong>
          <Checkbox.Group
            options={evidenceCheckList}
            className="horizontal margin"
            onChange={this.handleEvidenceChange}
          />
        </Modal>
      </Form>
    );
  }
}

const BusinessIntegriyForm = Form.create()(BusinessIntegriy);

export default withRouter(BusinessIntegriyForm);
