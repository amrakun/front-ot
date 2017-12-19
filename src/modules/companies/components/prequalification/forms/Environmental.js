import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker } from 'antd';
import { booleanData, actionStatusData } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { envLabels, documentLabel } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';
import moment from 'moment';

const { TextArea } = Input;

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasEnvironmentalRegulatorInvestigated:
        data.hasEnvironmentalRegulatorInvestigated || false,
      hasConvictedForEnvironmentalLaws:
        data.hasConvictedForEnvironmentalLaws || false,
      doesHavePlan: data.doesHavePlan || false
    };

    this.onInvestigatedChange = this.onInvestigatedChange.bind(this);
    this.onConvictedChange = this.onConvictedChange.bind(this);
    this.onHasPlan = this.onHasPlan.bind(this);
  }

  onInvestigatedChange(value) {
    this.setState({ hasEnvironmentalRegulatorInvestigated: value === 'true' });
  }

  onConvictedChange(value) {
    this.setState({ hasConvictedForEnvironmentalLaws: value === 'true' });
  }

  onHasPlan(value) {
    this.setState({ doesHavePlan: value === 'true' });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const statusOptions = this.renderOptions(actionStatusData);

    const { data } = this.props;

    const {
      hasEnvironmentalRegulatorInvestigated,
      hasConvictedForEnvironmentalLaws,
      doesHavePlan
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderField({
          name: 'doesHavePlan',
          label: envLabels.doesHavePlan,
          dataType: 'boolean',
          control: <Select onChange={this.onHasPlan}>{booleanOptions}</Select>
        })}
        {this.renderField({
          label: documentLabel,
          name: 'doesHavePlanFile',
          dataType: 'file',
          isVisible: doesHavePlan,
          optional: !doesHavePlan,
          control: (
            <Uploader
              initialFile={data.doesHavePlanFile}
              onReceiveFile={(...args) => this.doesHavePlanFileUpload(...args)}
            />
          )
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
          initialValue: moment(data.dateOfInvestigation),
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
          label: envLabels.investigationDocumentation,
          name: 'investigationDocumentation',
          dataType: 'file',
          isVisible: hasEnvironmentalRegulatorInvestigated,
          optional: !hasEnvironmentalRegulatorInvestigated,
          control: (
            <Uploader
              initialFile={data.investigationDocumentation}
              onReceiveFile={(...args) =>
                this.investigationDocumentationUpload(...args)
              }
            />
          )
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

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
