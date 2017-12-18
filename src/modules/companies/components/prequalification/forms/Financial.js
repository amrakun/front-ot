import React from 'react';
import { Form, Select, Row, Col, DatePicker, Input, InputNumber } from 'antd';
import moment from 'moment';
import { yearData, booleanData, currencyData } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      canProvideAccountsInfo: props.data.canProvideAccountsInfo || false
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

    this.props.save({
      canProvideAccountsInfo: this.getFieldValue(
        'canProvideAccountsInfo',
        'boolean'
      ),
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
            hasFeedback: false,
            control: <InputNumber htmlType="number" />
          })}
        </Col>
      </Row>
    );
  }

  renderYearAmountGroup(label, prefix) {
    return (
      <Form.Item
        className="multiple-wrapper"
        label={label}
        {...this.formItemLayout()}
      >
        {this.renderYearAmount(prefix, 0)}
        {this.renderYearAmount(prefix, 1)}
        {this.renderYearAmount(prefix, 2)}
      </Form.Item>
    );
  }

  renderDateFile(index) {
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
            optional: true,
            control: <DatePicker format={dateFormat} placeholder="Start" />
          })}
        </Col>
        <Col span={12}>
          {this.renderField({
            name: `recordsInfo${index}File`,
            initialValue: initialFile,
            hasFeedback: false,
            optional: true,
            dataType: 'file',
            control: (
              <Uploader
                initialFile={initialFile}
                onReceiveFile={(...args) =>
                  this[`recordsInfo${index}FileUpload`](...args)
                }
              />
            )
          })}
        </Col>
      </Row>
    );
  }

  render() {
    const currencyOptions = this.renderOptions(currencyData);
    const booleanOptions = this.renderOptions(booleanData);
    const { canProvideAccountsInfo } = this.state;

    return (
      <Form className="preq-form">
        {this.renderField({
          label: 'Can you provide accounts for the last 3 financial year?',
          name: 'canProvideAccountsInfo',
          control: (
            <Select onChange={this.onCanProvide}>{booleanOptions}</Select>
          )
        })}

        <div style={canProvideAccountsInfo ? {} : { display: 'none' }}>
          {this.renderField({
            label: 'Currency',
            name: 'currency',
            optional: !canProvideAccountsInfo,
            control: (
              <Select placeholder="Select a currency">{currencyOptions}</Select>
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
        </div>

        {this.renderField({
          label: 'If not, explain the reasons',
          name: 'reasons',
          isVisible: !canProvideAccountsInfo,
          optional: canProvideAccountsInfo,
          control: <Input.TextArea style={{ minHeight: '80px' }} />
        })}

        <Form.Item
          className="multiple-wrapper"
          label="Please provide financial records for your last 3 years"
          extra="The most recent years worth of accounts will always appear on top."
          {...this.formItemLayout()}
        >
          {this.renderDateFile(0)}
          {this.renderDateFile(1)}
          {this.renderDateFile(2)}
        </Form.Item>

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

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

export default Form.create()(PrequalificationForm);
