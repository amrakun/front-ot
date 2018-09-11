import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card, Popconfirm, Button } from 'antd';
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
      areEmployeesUnderYourControl: data.areEmployeesUnderYourControl || false,
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

  handleSubmit() {
    this.save({}, true);
  }

  render() {
    const productsInfo = this.props.productsInfo || [];
    const { __ } = this.context;

    return (
      <Form>
        {this.renderStatus('healthInfo')}

        {this.renderConditionalField('doesHaveHealthSafety')}
        {this.renderConditionalField('areHSEResourcesClearlyIdentified')}
        {this.renderConditionalField('doesHaveDocumentedProcessToEnsure')}
        {this.renderConditionalField('areEmployeesUnderYourControl')}
        {this.renderConditionalField('doesHaveDocumentForRiskAssesment')}
        {this.renderConditionalField(
          'doesHaveDocumentForIncidentInvestigation'
        )}
        {this.renderConditionalField('doesHaveDocumentedFitness')}
        <Card>{this.renderBoolean('isWillingToComply')}</Card>

        {productsInfo.includes('a01001') || productsInfo.includes('a01002') ? (
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
        <Popconfirm
          title={__(
            'Are you sure you want to finalize and submit? You are not able to edit the answers once submit'
          )}
          onConfirm={this.handleSubmit}
          cancelText={__('Cancel')}
          okText={__('Submit')}
        >
          <Button style={{ float: 'right' }} type="primary">
            {__('Save & submit')}
          </Button>
        </Popconfirm>
      </Form>
    );
  }
}

PrequalificationForm.propTypes = {
  productsInfo: PropTypes.array
};

PrequalificationForm.contextTypes = {
  __: PropTypes.func
};

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
