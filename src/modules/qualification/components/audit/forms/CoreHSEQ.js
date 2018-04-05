import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';

class CoreHSEQ extends AuditFormsBase {
  render() {
    const { __ } = this.context;
    const render = this.renderQuestion;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderIsQualifiedAlert('coreHseqInfo')}

        <Card title={__('Core HSEQ')}>
          {render('doesHaveHealthSafety')}
          {render('doesHaveDocumentedPolicy')}
          {render('doesPerformPreemployment')}
          {render('doWorkProceduresConform')}
          {render('doesHaveFormalProcess')}
          {render('doesHaveTrackingSystem')}
          {render('doesHaveValidIndustry')}
          {render('doesHaveFormalProcessForReporting')}
          {render('doesHaveLiabilityInsurance')}
          {render('doesHaveFormalProcessForHealth')}
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const CoreHSEQForm = Form.create()(CoreHSEQ);

CoreHSEQ.contextTypes = {
  __: PropTypes.func
};

export default withRouter(CoreHSEQForm);
