import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input } from 'antd';
import { healthLabels, healthDescriptions } from '../constants';
import { booleanData } from '../constants';
import { BaseForm } from 'modules/common/components';

const TextArea = Input.TextArea;

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

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

        {this.renderField({
          name: 'hasIndustrialAccident',
          label: healthLabels.hasIndustrialAccident,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'tmha',
          label: healthLabels.tmha,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'ltifr',
          label: healthLabels.ltifr,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'injuryExplanation',
          label: healthLabels.injuryExplanation,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'seniorManagement',
          label: healthLabels.seniorManagement,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'isWillingToCommit',
          label: healthLabels.isWillingToCommit,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'isPerparedToCompile',
          label: healthLabels.isPerparedToCompile,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'hasWorkedOnWorldBank',
          label: healthLabels.hasWorkedOnWorldBank,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'hasWorkedOnWorldBankDescription',
          label: ' ',
          optional: true,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'hasWorkedOnLargeProjects',
          label: healthLabels.hasWorkedOnLargeProjects,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'hasWorkedOnLargeProjectsDescription',
          label: ' ',
          optional: true,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'doesHaveLicense',
          label: healthLabels.doesHaveLicense,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveLicenseDescription',
          label: ' ',
          optional: true,
          control: <TextArea />
        })}
        {/* TODO: multiple project-specific inputs */}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
