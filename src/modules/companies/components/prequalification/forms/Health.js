import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import PreqForm from './PreqForm';

class PrequalificationForm extends PreqForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      doesHaveHealthSafety: data.doesHaveHealthSafety || false,
      doesHaveDocumentedProcessToEnsure:
        data.doesHaveDocumentedProcessToEnsure || false,
      doesHaveDocumentForRiskAssesment:
        data.doesHaveDocumentForRiskAssesment || false,
      doesHaveDocumentForIncidentInvestigation:
        data.doesHaveDocumentForIncidentInvestigation || false,
      doesHaveDocumentedFitness: data.doesHaveDocumentedFitness || false,
      hasWorkedOnWorldBank: data.hasWorkedOnWorldBank || false,
      hasWorkedOnLargeProjects: data.hasWorkedOnLargeProjects || false,
      doesHaveLicense: data.doesHaveLicense || false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  onConditionalChange(value, name) {
    this.state[name] = value === 'true';
  }

  render() {
    return (
      <Form onSubmit={this.save}>
        {this.renderConditionalField('doesHaveHealthSafety')}
        <Card>{this.renderBoolean('areHSEResourcesClearlyIdentified')}</Card>
        {this.renderConditionalField('doesHaveDocumentedProcessToEnsure')}
        <Card>{this.renderBoolean('areEmployeesUnderYourControl')}</Card>
        {this.renderConditionalField('doesHaveDocumentForRiskAssesment')}
        {this.renderConditionalField(
          'doesHaveDocumentForIncidentInvestigation'
        )}
        {this.renderConditionalField('doesHaveDocumentedFitness')}
        <Card>{this.renderBoolean('isWillingToComply')}</Card>

        {/* TODO: Project specific fields start */}
        <Card>
          {this.renderBoolean('hasIndustrialAccident')}
          {this.renderTextArea('tmha')}
          {this.renderTextArea('ltifr')}
          {this.renderTextArea('injuryExplanation')}
          {this.renderTextArea('seniorManagement')}
          {this.renderBoolean('isWillingToCommit')}
          {this.renderBoolean('isPerparedToCompile')}
        </Card>
        {this.renderConditionalField('hasWorkedOnWorldBank', true)}
        {this.renderConditionalField('hasWorkedOnLargeProjects', true)}
        {this.renderConditionalField('doesHaveLicense', true)}

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
