import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker } from 'antd';
import { booleanData, actionStatusData } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { envLabels, envDescriptions } from '../constants';
import { BaseForm } from 'modules/common/components';

const { TextArea } = Input;

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      hasEnvironmentalRegulatorInvestigated: false,
      hasConvictedForEnvironmentalLaws: false
    };

    this.onInvestigatedChange = this.onInvestigatedChange.bind(this);
    this.onConvictedChange = this.onConvictedChange.bind(this);
  }

  onInvestigatedChange(value) {
    this.setState({ hasEnvironmentalRegulatorInvestigated: value === 'true' });
  }

  onConvictedChange(value) {
    this.setState({ hasConvictedForEnvironmentalLaws: value === 'true' });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const statusOptions = this.renderOptions(actionStatusData);
    const {
      hasEnvironmentalRegulatorInvestigated,
      hasConvictedForEnvironmentalLaws
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderField({
          name: 'doesHavePlan',
          label: envLabels.doesHavePlan,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'hasEnvironmentalRegulatorInvestigated',
          label: envLabels.hasEnvironmentalRegulatorInvestigated,
          dataType: 'boolean',
          control: (
            <Select onChange={this.onInvestigatedChange}>
              {booleanOptions}
            </Select>
          )
        })}

        {this.renderField({
          name: 'dateOfInvestigation',
          label: envLabels.dateOfInvestigation,
          isVisible: hasEnvironmentalRegulatorInvestigated,
          optional: !hasEnvironmentalRegulatorInvestigated,
          control: <DatePicker format={dateFormat} placeholder="Date" />
        })}

        {this.renderField({
          name: 'reasonForInvestigation',
          label: envLabels.reasonForInvestigation,
          isVisible: hasEnvironmentalRegulatorInvestigated,
          optional: !hasEnvironmentalRegulatorInvestigated,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'actionStatus',
          label: envLabels.actionStatus,
          isVisible: hasEnvironmentalRegulatorInvestigated,
          optional: !hasEnvironmentalRegulatorInvestigated,
          control: <Select>{statusOptions}</Select>
        })}

        {this.renderField({
          name: 'hasConvictedForEnvironmentalLaws',
          label: envLabels.hasConvictedForEnvironmentalLaws,
          dataType: 'boolean',
          control: (
            <Select onChange={this.onConvictedChange}>{booleanOptions}</Select>
          )
        })}

        {this.renderField({
          name: 'proveHasNotConvicted',
          label: envLabels.proveHasNotConvicted,
          isVisible: hasConvictedForEnvironmentalLaws,
          optional: !hasConvictedForEnvironmentalLaws,
          control: <TextArea />
        })}

        {this.renderField({
          name: 'additionalInformation',
          label: envLabels.additionalInformation,
          description: envDescriptions.additionalInformation,
          control: <TextArea />
        })}

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
