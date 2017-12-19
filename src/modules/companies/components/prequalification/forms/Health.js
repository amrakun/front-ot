import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input } from 'antd';
import {
  healthLabels,
  healthDescriptions,
  booleanData,
  documentLabel
} from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';

const TextArea = Input.TextArea;

class PrequalificationForm extends BaseForm {
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
      doesHaveDocumentedFitness: data.doesHaveDocumentedFitness || false
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

  renderConditionalField(name, isTextarea) {
    const isVisible = this.state[name];

    return (
      <div>
        {this.renderBoolean(name)}
        {isTextarea
          ? this.renderTextArea(`${name}Description`)
          : this.renderField({
              label: documentLabel,
              name: `${name}File`,
              dataType: 'file',
              isVisible: isVisible,
              optional: !isVisible,
              control: (
                <Uploader
                  initialFile={this.props.data[`name`]}
                  onReceiveFile={(...args) =>
                    this[`${name}FileUpload`](...args)
                  }
                />
              )
            })}
      </div>
    );
  }

  renderTextArea(name, label) {
    return this.renderField({
      name: name,
      label: label || 'Provide details',
      optional: label ? false : true,
      control: <TextArea />
    });
  }

  renderBoolean(name) {
    const booleanOptions = this.renderOptions(booleanData);

    return this.renderField({
      name: name,
      label: healthLabels[name],
      dataType: 'boolean',
      description: healthDescriptions[name] && healthDescriptions[name],
      control: (
        <Select onChange={value => this.onConditionalChange(value, name)}>
          {booleanOptions}
        </Select>
      )
    });
  }

  render() {
    return (
      <Form onSubmit={this.save}>
        {this.renderConditionalField('doesHaveHealthSafety')}
        {this.renderBoolean('areHSEResourcesClearlyIdentified')}
        {this.renderConditionalField('doesHaveDocumentedProcessToEnsure')}
        {this.renderBoolean('areEmployeesUnderYourControl')}
        {this.renderConditionalField('doesHaveDocumentForRiskAssesment')}
        {this.renderConditionalField(
          'doesHaveDocumentForIncidentInvestigation'
        )}
        {this.renderConditionalField('doesHaveDocumentedFitness')}
        {this.renderBoolean('isWillingToComply')}

        {/* TODO: Project specific fields start */}
        {this.renderBoolean('hasIndustrialAccident')}
        {this.renderTextArea('tmha')}
        {this.renderTextArea('ltifr')}
        {this.renderTextArea('injuryExplanation')}
        {this.renderTextArea('seniorManagement')}
        {this.renderBoolean('isWillingToCommit')}
        {this.renderBoolean('isPerparedToCompile')}
        {this.renderConditionalField('hasWorkedOnWorldBank', true)}
        {this.renderConditionalField('hasWorkedOnLargeProjects', true)}
        {this.renderConditionalField('doesHaveLicense', true)}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
