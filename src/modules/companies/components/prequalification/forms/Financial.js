import React from 'react';
import { Form, Select, Row, Col, DatePicker, Input, Card } from 'antd';
import moment from 'moment';
import { yearData, booleanData, currencyData } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  annualTurnover: {
    id: 'annualTurnover',
    defaultMessage: 'Annual turnover'
  },
  preTaxProfit: {
    id: 'preTaxProfit',
    defaultMessage: 'Pre-tax profit'
  },
  totalAssets: {
    id: 'totalAssets',
    defaultMessage: 'Total assets'
  },
  totalCurrentAssets: {
    id: 'totalCurrentAssets',
    defaultMessage: 'Total current assets'
  },
  totalShareholderEquity: {
    id: 'totalCurrentAssets',
    defaultMessage: 'Total current assets'
  },
  financialInfo: {
    id: 'financialInfo',
    defaultMessage: 'Please provide financial records for your last 3 years'
  },
  financialInfoDesc: {
    id: 'financialInfoDesc',
    defaultMessage:
      'The most recent years worth of accounts will always appear on top'
  }
});
class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      canProvideAccountsInfo: props.data.canProvideAccountsInfo
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCanProvide = this.onCanProvide.bind(this);
  }

  onCanProvide(value) {
    this.setState({ canProvideAccountsInfo: value === 'true' });
  }

  collectYearAmountValue(prefix, values) {
    const year = this.getFieldValue(`${prefix}Year`);
    const amount = this.getFieldValue(`${prefix}Amount`);

    if (year && amount) {
      values.push({ year, amount });
    }
  }

  collectYearAmountValues(prefix) {
    const values = [];

    this.collectYearAmountValue(`${prefix}0`, values);
    this.collectYearAmountValue(`${prefix}1`, values);
    this.collectYearAmountValue(`${prefix}2`, values);

    return values;
  }

  collectRecordsInfoValue(index, values) {
    const date = this.getFieldValue(`recordsInfo${index}Date`);
    const file = this.getFieldValue(`recordsInfo${index}File`, 'file');

    if (date && file) {
      values.push({ date, file });
    }
  }

  collectRecordsInfoValues() {
    const values = [];

    this.collectRecordsInfoValue(0, values);
    this.collectRecordsInfoValue(1, values);
    this.collectRecordsInfoValue(2, values);

    return values;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.saveDirect({
      canProvideAccountsInfo: this.getFieldValue(
        'canProvideAccountsInfo',
        'boolean'
      ),
      reasonToCannotNotProvide: this.getFieldValue('reasonToCannotNotProvide'),
      currency: this.getFieldValue('currency'),
      annualTurnover: this.collectYearAmountValues('annualTurnover'),
      preTaxProfit: this.collectYearAmountValues('preTaxProfit'),
      totalAssets: this.collectYearAmountValues('totalAssets'),
      totalCurrentAssets: this.collectYearAmountValues('totalCurrentAssets'),
      totalShareholderEquity: this.collectYearAmountValues(
        'totalShareholderEquity'
      ),
      recordsInfo: this.collectRecordsInfoValues(),
      isUpToDateSSP: this.getFieldValue('isUpToDateSSP', 'boolean'),
      isUpToDateCTP: this.getFieldValue('isUpToDateCTP', 'boolean')
    });
  }

  renderYearAmount(prefix, index) {
    const { canProvideAccountsInfo } = this.state;
    const data = this.props.data || {};
    const yearAmountArray = data[prefix] || [];

    let year = '';
    let amount = 0;

    if (yearAmountArray[index]) {
      year = yearAmountArray[index].year;
      amount = yearAmountArray[index].amount;
    }

    return (
      <Row gutter={16}>
        <Col span={12}>
          {this.renderField({
            name: `${prefix}${index}Year`,
            dataType: 'number',
            initialValue: year,
            hasFeedback: false,
            optional: !canProvideAccountsInfo,
            control: (
              <Select placeholder="Select an year">
                {this.renderOptions(yearData)}
              </Select>
            )
          })}
        </Col>
        <Col span={12}>
          {this.renderField({
            name: `${prefix}${index}Amount`,
            initialValue: amount,
            dataType: 'number',
            optional: !canProvideAccountsInfo,
            hasFeedback: false,
            control: <Input type="number" />
          })}
        </Col>
      </Row>
    );
  }

  renderYearAmountGroup(label, prefix) {
    const { formatMessage } = this.props.intl;
    return (
      <Form.Item
        className="multiple-wrapper"
        required={true}
        label={formatMessage(messages[prefix])}
      >
        {this.renderYearAmount(prefix, 0)}
        {this.renderYearAmount(prefix, 1)}
        {this.renderYearAmount(prefix, 2)}
      </Form.Item>
    );
  }

  renderDateFile(index) {
    const { canProvideAccountsInfo } = this.state;
    const data = this.props.data || {};
    const recordsInfo = data.recordsInfo || [];

    let initialDate = null;
    let initialFile = null;

    if (recordsInfo[index]) {
      initialDate = moment(recordsInfo[index].date);
      initialFile = recordsInfo[index].file;
    }

    return (
      <Row gutter={16}>
        <Col span={12}>
          {this.renderField({
            name: `recordsInfo${index}Date`,
            initialValue: initialDate,
            hasFeedback: false,
            optional: !canProvideAccountsInfo,
            control: (
              <DatePicker format={dateFormat} placeholder="Choose date" />
            )
          })}
        </Col>
        <Col span={12}>
          {this.renderField({
            name: `recordsInfo${index}File`,
            initialValue: initialFile,
            hasFeedback: false,
            optional: !canProvideAccountsInfo,
            dataType: 'file',
            control: <Uploader />
          })}
        </Col>
      </Row>
    );
  }

  render() {
    const currencyOptions = this.renderOptions(currencyData);
    const booleanOptions = this.renderOptions(booleanData);
    const { canProvideAccountsInfo } = this.state;
    const { formatMessage } = this.props.intl;

    const reasonVisible =
      canProvideAccountsInfo !== undefined ? !canProvideAccountsInfo : false;

    return (
      <Form className="preq-form">
        <Card bodyStyle={{ paddingBottom: '16px' }}>
          {this.renderField({
            label: 'Can you provide accounts for the last 3 financial years?',
            name: 'canProvideAccountsInfo',
            control: (
              <Select onChange={this.onCanProvide}>{booleanOptions}</Select>
            )
          })}

          <div className={!canProvideAccountsInfo ? 'hidden' : ''}>
            {this.renderField({
              label: 'Currency',
              name: 'currency',
              optional: !canProvideAccountsInfo,
              control: (
                <Select placeholder="Select a currency">
                  {currencyOptions}
                </Select>
              )
            })}

            {this.renderYearAmountGroup('Annual turnover', 'annualTurnover')}
            {this.renderYearAmountGroup('Pre-tax profit', 'preTaxProfit')}
            {this.renderYearAmountGroup('Total assets', 'totalAssets')}
            {this.renderYearAmountGroup(
              'Total current assets',
              'totalCurrentAssets'
            )}
            {this.renderYearAmountGroup(
              'Total shareholders equity ',
              'totalShareholderEquity'
            )}

            <Form.Item
              className="multiple-wrapper"
              label={formatMessage(messages.financialInfo)}
              extra={formatMessage(messages.financialInfoDesc)}
            >
              {this.renderDateFile(0)}
              {this.renderDateFile(1)}
              {this.renderDateFile(2)}
            </Form.Item>
          </div>

          {this.renderField({
            label: 'If not, explain the reasons',
            name: 'reasonToCannotNotProvide',
            isVisible: reasonVisible,
            optional: !reasonVisible,
            control: <Input.TextArea style={{ minHeight: '80px' }} />
          })}
        </Card>

        <Card bodyStyle={{ paddingBottom: '16px' }}>
          {this.renderField({
            label: 'Is your company up to date with Social Security payments?',
            name: 'isUpToDateSSP',
            control: <Select placeholder="Select one">{booleanOptions}</Select>
          })}

          {this.renderField({
            label: 'Is your company up to date with Corporation Tax payments?',
            name: 'isUpToDateCTP',
            control: <Select placeholder="Select one">{booleanOptions}</Select>
          })}
        </Card>

        {this.renderSubmit()}
      </Form>
    );
  }
}

PrequalificationForm.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Form.create()(PrequalificationForm));
