import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker, Card } from 'antd';
import { booleanData, actionStatusData } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { labels } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';
import {
  Title,
  Common,
  Prequalification
} from 'modules/common/components/translations';
import moment from 'moment';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const { TextArea } = Input;
const messages = defineMessages({
  ...Common,
  ...Title,
  ...Prequalification.Enviroment
});

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
        <Card>
          {this.renderField({
            name: 'doesHavePlan',
            label: labels.doesHavePlan,
            dataType: 'boolean',
            control: <Select onChange={this.onHasPlan}>{booleanOptions}</Select>
          })}
          {this.renderField({
            label: labels.documentLabel,
            name: 'doesHavePlanFile',
            isVisible: doesHavePlan,
            optional: !doesHavePlan,
            dataType: 'file',
            control: <Uploader />
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'hasEnvironmentalRegulatorInvestigated',
            label: labels.hasEnvironmentalRegulatorInvestigated,
            dataType: 'boolean',
            control: (
              <Select onChange={this.onInvestigatedChange}>
                {booleanOptions}
              </Select>
            )
          })}

          {this.renderField({
            name: 'dateOfInvestigation',
            label: labels.dateOfInvestigation,
            isVisible: hasEnvironmentalRegulatorInvestigated,
            optional: !hasEnvironmentalRegulatorInvestigated,
            initialValue: moment(data.dateOfInvestigation),
            control: <DatePicker format={dateFormat} placeholder="Date" />
          })}

          {this.renderField({
            name: 'reasonForInvestigation',
            label: labels.reasonForInvestigation,
            isVisible: hasEnvironmentalRegulatorInvestigated,
            optional: !hasEnvironmentalRegulatorInvestigated,
            control: <TextArea />
          })}

          {this.renderField({
            name: 'actionStatus',
            label: labels.actionStatus,
            isVisible: hasEnvironmentalRegulatorInvestigated,
            optional: !hasEnvironmentalRegulatorInvestigated,
            control: <Select>{statusOptions}</Select>
          })}

          {this.renderField({
            label: labels.investigationDocumentation,
            name: 'investigationDocumentation',
            isVisible: hasEnvironmentalRegulatorInvestigated,
            optional: !hasEnvironmentalRegulatorInvestigated,
            dataType: 'file',
            control: <Uploader />
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'hasConvictedForEnvironmentalLaws',
            label: labels.hasConvictedForEnvironmentalLaws,
            dataType: 'boolean',
            control: (
              <Select onChange={this.onConvictedChange}>
                {booleanOptions}
              </Select>
            )
          })}

          {this.renderField({
            name: 'proveHasNotConvicted',
            label: labels.proveHasNotConvicted,
            isVisible: hasConvictedForEnvironmentalLaws,
            optional: !hasConvictedForEnvironmentalLaws,
            control: <TextArea />
          })}
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

PrequalificationForm.propTypes = {
  intl: intlShape.isRequired
};

const BusinessForm = Form.create()(PrequalificationForm);

export default injectIntl(withRouter(BusinessForm));
