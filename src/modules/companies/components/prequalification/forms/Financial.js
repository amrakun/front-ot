import React from 'react';
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Upload,
  Icon
} from 'antd';
import moment from 'moment';
import { yearData, booleanData, currencyData } from '../constants';
import { BaseForm, Field } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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
    const path = this.getFieldValue(`recordsInfo${index}Path`) || '/path';

    if (date && path) {
      values.push({ date, path });
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
          <Field
            name={`${prefix}${index}Year`}
            dataType="number"
            initialValue={year}
            control={
              <Select placeholder="Select an year">
                {this.renderOptions(yearData)}
              </Select>
            }
          />
        </Col>
        <Col span={12}>
          <Field
            name={`${prefix}${index}Amount`}
            initialValue={amount}
            dataType="number"
            control={<InputNumber htmlType="number" />}
          />
        </Col>
      </Row>
    );
  }

  renderYearAmountGroup(label, prefix) {
    return (
      <Form.Item
        className="multiple-wrapper"
        label={label}
        {...this.formItemLayout}
      >
        {this.renderYearAmount(prefix, 0)}
        {this.renderYearAmount(prefix, 1)}
        {this.renderYearAmount(prefix, 2)}
      </Form.Item>
    );
  }

  renderDatePath(index) {
    const data = this.props.data || {};
    const recordsInfo = data.recordsInfo || [];

    let initialDate = null;
    let initialPath = '';

    if (recordsInfo[index]) {
      initialDate = moment(recordsInfo[index].date);
      initialPath = recordsInfo[index].path;
    }

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Field
            name={`recordsInfo${index}Date`}
            initialValue={initialDate}
            control={<DatePicker format={dateFormat} placeholder="Start" />}
          />
        </Col>
        <Col span={12}>
          <Field
            name={`recordsInfo${index}Path`}
            initialValue={initialPath}
            control={
              <Upload action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            }
          />
        </Col>
      </Row>
    );
  }

  render() {
    const currencyOptions = this.renderOptions(currencyData);
    const booleanOptions = this.renderOptions(booleanData);

    return (
      <Form className="preq-form">
        {this.renderField({
          label: 'Can you provide accounts for the last 3 financial year?',
          name: 'canProvideAccountsInfo',
          control: <Select placeholder="Select one">{booleanOptions}</Select>
        })}

        {this.renderField({
          label: 'Currency',
          name: 'currency',
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
        <Field
          label="If not, explain the reasons"
          name="reasons"
          control={<Input.TextArea style={{ minHeight: '80px' }} />}
        />
        <Form.Item
          className="multiple-wrapper"
          label="Please provide financial records for your last 3 years"
          extra="The most recent years worth of accounts will always appear on top."
          {...this.formItemLayout}
        >
          {this.renderDatePath(0)}
          {this.renderDatePath(1)}
          {this.renderDatePath(2)}
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
