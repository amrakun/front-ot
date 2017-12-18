import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker } from 'antd';
import { booleanData, actionStatusData } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { envLabels, envDescriptions } from '../constants';
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
      investigationDocumentation: data.investigationDocumentation
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

  onUploadInvestigationDocumentation(file) {
    let investigationDocumentation = { name: file.name, url: file.response };

    if (file.status === 'removed') {
      investigationDocumentation = null;
    }

    this.setState({ investigationDocumentation });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const statusOptions = this.renderOptions(actionStatusData);

    const { data } = this.props;

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
