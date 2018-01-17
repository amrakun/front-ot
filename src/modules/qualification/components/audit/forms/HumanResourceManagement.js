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
          {render('workContractManagement')}
          {render('jobDescriptionProcedure')}
          {render('trainingDevelopment')}
          {render('employeePerformanceManagement')}
          {render('timeKeepingManagement')}
          {render('managementOfPractises')}
          {render('managementOfWorkforce')}
          {render('employeeAwareness')}
          {render('employeeSelection')}
          {render('employeeExitManagement')}
          {render('grievanceAndFairTreatment')}
        </Card>
        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const HumanResourceManagementForm = Form.create()(HumanResourceManagement);

export default withRouter(HumanResourceManagementForm);
