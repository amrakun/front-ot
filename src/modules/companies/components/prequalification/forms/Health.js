import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card } from 'antd';
import PreqForm from './PreqForm';
import PropTypes from 'prop-types';

class PrequalificationForm extends PreqForm {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      doesHaveHealthSafety: data.doesHaveHealthSafety || false,
      areHSEResourcesClearlyIdentified:
        data.areHSEResourcesClearlyIdentified || false,
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

  onConditionalChange(value, name) {
    this.state[name] = value === 'true';
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save({}, true);
  }

  render() {
    const { productsInfo } = this.props;

    return (
      <Form onSubmit={this.save}>
        {this.renderConditionalField('doesHaveHealthSafety')}
        {this.renderConditionalField('areHSEResourcesClearlyIdentified')}
        {this.renderConditionalField('doesHaveDocumentedProcessToEnsure')}
        <Card>{this.renderBoolean('areEmployeesUnderYourControl')}</Card>
        {this.renderConditionalField('doesHaveDocumentForRiskAssesment')}
        {this.renderConditionalField(
          'doesHaveDocumentForIncidentInvestigation'
        )}
        {this.renderConditionalField('doesHaveDocumentedFitness')}
        <Card>{this.renderBoolean('isWillingToComply')}</Card>

        {productsInfo.includes(
          "a01001 - large epcm's >$100m/greenfield projects"
        ) || productsInfo.includes("a01002 - small epcm's (<$100m)") ? (
          <div>
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
          </div>
        ) : (
          ''
        )}

        {this.renderGoBack()}
        {this.renderSubmit('Save & submit')}
      </Form>
    );
  }
}

PrequalificationForm.propTypes = {
  productsInfo: PropTypes.array
};

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
