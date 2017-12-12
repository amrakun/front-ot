import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select } from 'antd';
import { healthLabels, healthDescriptions } from '../constants';
import { booleanData } from '../constants';
import { BaseForm } from 'modules/common/components';

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    console.log(props.data);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);

    return (
      <Form onSubmit={this.save}>
        {this.renderField({
          name: 'doesHaveHealthSafety',
          label: healthLabels.doesHaveHealthSafety,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'areHSEResourcesClearlyIdentified',
          label: healthLabels.areHSEResourcesClearlyIdentified,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveDocumentedProcessToEnsure',
          label: healthLabels.doesHaveDocumentedProcessToEnsure,
          description: healthDescriptions.doesHaveDocumentedProcessToEnsure,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'areEmployeesUnderYourControl',
          label: healthLabels.areEmployeesUnderYourControl,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveDocumentForRiskAssesment',
          label: healthLabels.doesHaveDocumentForRiskAssesment,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveDocumentForIncidentInvestigation',
          label: healthLabels.doesHaveDocumentForIncidentInvestigation,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveDocumentedFitness',
          label: healthLabels.doesHaveDocumentedFitness,
          description: healthDescriptions.doesHaveDocumentedFitness,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'isWillingToComply',
          label: healthLabels.isWillingToComply,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}
        {/* TODO: multiple project-specific inputs */}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
