import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';

class CoreHSEQ extends AuditFormsBase {
  render() {
    const render = this.renderQuestion;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Core HSEQ">
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

export default withRouter(CoreHSEQForm);
