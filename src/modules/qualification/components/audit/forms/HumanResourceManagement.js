import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';

class HumanResourceManagement extends AuditFormsBase {
  render() {
    const render = this.renderQuestion;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Human resource management">
          {render('workContractManagement', 'multiple')}
          {render('jobDescriptionProcedure', 'multiple')}
          {render('trainingDevelopment', 'multiple')}
          {render('employeePerformanceManagement', 'multiple')}
          {render('timeKeepingManagement', 'multiple')}
          {render('managementOfPractises', 'multiple')}
          {render('managementOfWorkforce', 'multiple')}
          {render('employeeAwareness', 'multiple')}
          {render('employeeSelection', 'multiple')}
          {render('employeeExitManagement', 'multiple')}
          {render('grievanceAndFairTreatment', 'multiple')}
        </Card>
        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const HumanResourceManagementForm = Form.create()(HumanResourceManagement);

export default withRouter(HumanResourceManagementForm);
