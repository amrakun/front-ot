import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';
import CreateReport from './modals/CreateReport';
import CreatePlan from './modals/CreatePlan';
import EvidenceCheck from 'modules/qualification/containers/audit/EvidenceCheck';

class BusinessIntegriy extends AuditFormsBase {
  constructor(props, context) {
    super(props, context);

    this.evidenceChecks = [];

    this.state = {
      ...this.state,
      evidenceModalVisible: false,
      reportModalVisible: false,
      planModalVisible: false,
    };

    this.saveAndShowModal = this.saveAndShowModal.bind(this);
  }

  saveAndShowModal(e, name) {
    e.preventDefault();

    this.setState({ [`${name}ModalVisible`]: true });
    this.collectAndSave(true);
  }

  hideModal(name) {
    this.setState({ [`${name}ModalVisible`]: false });
  }

  renderBuyerAction() {
    const { reportModalVisible, planModalVisible } = this.state;

    const { supplierInfo, exportFiles, isQualified } = this.props;

    const exportModalArgs = {
      ...supplierInfo,
      exportFiles,
      isQualified,
    };

    return (
      <div style={{ float: 'right' }}>
        {this.renderSubmit('Save & create improvement plan', e => this.saveAndShowModal(e, 'plan'))}
        {this.renderSubmit('Save & create report', e => this.saveAndShowModal(e, 'report'))}

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
    );
  }

  renderSupplierAction() {
    return this.renderSubmit('Save & submit', e =>
      this.props.form.validateFieldsAndScroll(err => {
        if (!err) {
          this.saveAndShowModal(e, 'evidence');
        }
      })
    );
  }

  rendereEvidenceCheck() {
    const { evidenceModalVisible } = this.state;
    const { match, history } = this.props;

    if (!evidenceModalVisible) {
      return null;
    }

    return (
      <EvidenceCheck history={history} match={match} hideModal={() => this.hideModal('evidence')} />
    );
  }

  render() {
    const render = this.renderQuestion;
    const { __ } = this.context;
    const { response } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderIsQualifiedAlert('businessInfo')}

        <Card title={__('Business integrity')}>
          {render('doesHavePolicyStatement')}
          {render('ensureThroughoutCompany')}
          {render('ensureThroughoutSupplyChain')}
          {render('haveBeenSubjectToInvestigation', 'reversed')}
          {render('doesHaveDocumentedPolicyToCorruption')}
          {render('whoIsResponsibleForPolicy')}
        </Card>

        {this.renderGoBack()}

        {response ? this.renderBuyerAction() : this.renderSupplierAction()}

        {this.rendereEvidenceCheck()}
      </Form>
    );
  }
}

const BusinessIntegriyForm = Form.create()(BusinessIntegriy);

BusinessIntegriy.contextTypes = {
  __: PropTypes.func,
};

export default withRouter(BusinessIntegriyForm);
