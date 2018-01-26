import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';
import CreateReport from './modals/CreateReport';
import CreatePlan from './modals/CreatePlan';
import EvidenceCheck from './modals/EvidenceCheck';

class BusinessIntegriy extends AuditFormsBase {
  constructor(props) {
    super(props);

    this.evidenceChecks = [];

    this.state = {
      ...this.state,
      evidenceModalVisible: false,
      reportModalVisible: false,
      planModalVisible: false
    };

    this.saveAndShowModal = this.saveAndShowModal.bind(this);
  }

  saveAndShowModal(e, name) {
    e.preventDefault();

    this.collectAndSave(true);
    this.setState({ [`${name}ModalVisible`]: true });
  }

  hideModal(name) {
    this.setState({ [`${name}ModalVisible`]: false });
  }

  render() {
    const render = this.renderQuestion;
    const {
      evidenceModalVisible,
      reportModalVisible,
      planModalVisible
    } = this.state;
    const { response, supplierInfo, exportFile, isQualified } = this.props;

    const exportModalArgs = {
      ...supplierInfo,
      exportFile,
      isQualified
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderIsQualifiedAlert()}
        <Card title="Business integrity">
          {render('doesHavePolicyStatement')}
          {render('ensureThroughoutCompany')}
          {render('ensureThroughoutSupplyChain')}
          {render('haveBeenSubjectToInvestigation', 'reversed')}
          {render('doesHaveDocumentedPolicyToCorruption')}
          {render('whoIsResponsibleForPolicy')}
        </Card>
        {this.renderGoBack()}
        {response ? (
          <div style={{ float: 'right' }}>
            {this.renderSubmit('Save & create improvement plan', e =>
              this.saveAndShowModal(e, 'plan')
            )}
            {this.renderSubmit('Save & create report', e =>
              this.saveAndShowModal(e, 'report')
            )}

            <CreatePlan
              {...exportModalArgs}
              title="Supplier's improvement plan"
              visible={planModalVisible}
              hideModal={() => this.hideModal('plan')}
            />

            <CreateReport
              {...exportModalArgs}
              title="Supplier's audit report"
              visible={reportModalVisible}
              hideModal={() => this.hideModal('report')}
            />
          </div>
        ) : (
          this.renderSubmit('Save & submit', e =>
            this.saveAndShowModal(e, 'evidence')
          )
        )}

        <EvidenceCheck
          title="Confirmation"
          visible={evidenceModalVisible}
          save={this.props.saveEvidenceChecks}
          hideModal={() => this.hideModal('evidence')}
        />
      </Form>
    );
  }
}

const BusinessIntegriyForm = Form.create()(BusinessIntegriy);

export default withRouter(BusinessIntegriyForm);
