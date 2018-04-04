import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import AuditFormsBase from './AuditFormsBase';

class HumanResourceManagement extends AuditFormsBase {
  render() {
    const { __ } = this.context;
    const render = this.renderQuestion;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderIsQualifiedAlert('hrInfo')}

        <Card title={__('Human resource management')}>
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

HumanResourceManagement.contextTypes = {
  __: PropTypes.func
};

export default withRouter(HumanResourceManagementForm);
