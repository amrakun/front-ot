import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Select, Row, Col, DatePicker, Input, Card, Popconfirm } from 'antd';
import moment from 'moment';
import { yearData, booleanData, currencyData } from '../constants';
import { Uploader } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import PreqForm from './PreqForm';

class PrequalificationForm extends PreqForm {
  constructor(props) {
    super(props);

    this.state = {
      canProvideAccountsInfo: props.data.canProvideAccountsInfo,
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
      canProvideAccountsInfo: this.getFieldValue('canProvideAccountsInfo', 'boolean'),
      reasonToCannotNotProvide: this.getFieldValue('reasonToCannotNotProvide'),
      currency: this.getFieldValue('currency'),
      annualTurnover: this.collectYearAmountValues('annualTurnover'),
      preTaxProfit: this.collectYearAmountValues('preTaxProfit'),
      totalAssets: this.collectYearAmountValues('totalAssets'),
      totalCurrentAssets: this.collectYearAmountValues('totalCurrentAssets'),
      totalShareholderEquity: this.collectYearAmountValues('totalShareholderEquity'),
      recordsInfo: this.collectRecordsInfoValues(),
      isUpToDateSSP: this.getFieldValue('isUpToDateSSP', 'boolean'),
      isUpToDateCTP: this.getFieldValue('isUpToDateCTP', 'boolean'),
    });
  }

  renderYearAmount(prefix, index) {
    const { canProvideAccountsInfo } = this.state;
    const { __ } = this.context;
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
              <Select {...this.common} placeholder={__('Select an year')}>
                {this.renderOptions(yearData, true)}
              </Select>
            ),
          })}
        </Col>
        <Col span={12}>
          {this.renderField({
            name: `${prefix}${index}Amount`,
            initialValue: amount,
            dataType: 'number',
            optional: !canProvideAccountsInfo,
            hasFeedback: false,
            control: <Input type="number" />,
          })}
        </Col>
      </Row>
    );
  }

  renderYearAmountGroup(label, prefix, extra) {
    const { __ } = this.context;
    return (
      <Form.Item
        className="multiple-wrapper"
        required={true}
        label={__(label)}
        extra={extra ? __(extra) : ''}
      >
        {this.renderYearAmount(prefix, 0)}
        {this.renderYearAmount(prefix, 1)}
        {this.renderYearAmount(prefix, 2)}
      </Form.Item>
    );
  }

  renderDateFile(index) {
    const { canProvideAccountsInfo } = this.state;
    const { __ } = this.context;
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
            control: <DatePicker format={dateFormat} placeholder={__('Choose date')} />,
          })}
        </Col>
        <Col span={12}>
          {this.renderField({
            name: `recordsInfo${index}File`,
            initialValue: initialFile,
            hasFeedback: false,
            optional: !canProvideAccountsInfo,
            dataType: 'file',
            control: <Uploader />,
          })}
        </Col>
      </Row>
    );
  }

  renderSkipButton() {
    const { skip, corporateStructure } = this.props;
    const { __ } = this.context;

    if (corporateStructure !== 'Sole Trader') {
      return null;
    }

    return (
      <Popconfirm
        title={__(
          'This action can not be undone and this is only useful for sole traders or individuals. Are you sure ?'
        )}
        onConfirm={skip}
      >
        <Button style={{ backgroundColor: '#f15a24', color: '#ffffff' }}>
          {__('Skip pre qualification')}
        </Button>
      </Popconfirm>
    );
  }

  render() {
    const currencyOptions = this.renderOptions(currencyData);
    const booleanOptions = this.renderOptions(booleanData);

    const { country } = this.props;
    const { canProvideAccountsInfo } = this.state;
    const { __ } = this.context;

    const reasonVisible = canProvideAccountsInfo !== undefined ? !canProvideAccountsInfo : false;

    return (
      <Form className="preq-form" key={`key-${canProvideAccountsInfo}`}>
        {this.renderStatus('financialInfo')}

        <Card bodyStyle={{ paddingBottom: '16px' }}>
          {this.renderField({
            label: 'Can you provide accounts for the last 3 financial years?',
            name: 'canProvideAccountsInfo',
            control: (
              <Select {...this.common} {...this.common} onChange={this.onCanProvide}>
                {booleanOptions}
              </Select>
            ),
          })}

          <div className={!canProvideAccountsInfo ? 'hidden' : ''}>
            {this.renderField({
              label: 'Currency',
              name: 'currency',
              optional: !canProvideAccountsInfo,
              control: (
                <Select
                  {...this.common}
                  {...this.common}
                  placeholder={__('Select a currency')}
                  showSearch
                >
                  {currencyOptions}
                </Select>
              ),
            })}

            {this.renderYearAmountGroup(
              'Sales revenue',
              'annualTurnover',
              "Line#1 of 'Income Statement' on Financial Statements (Form-A) for Finance office of Government"
            )}

            {this.renderYearAmountGroup(
              'Net income before tax',
              'preTaxProfit',
              "Line#18 of 'Income Statement' on Financial Statements (Form-A) for Finance office of Government"
            )}
            {this.renderYearAmountGroup(
              'Total of assets',
              'totalAssets',
              "Line#1.1.11 of 'Balance sheet' on Financial Statements (Form-A) for Finance office of Government"
            )}

            {this.renderYearAmountGroup(
              'Total of current assets',
              'totalCurrentAssets',
              "Line#1.3 of 'Balance sheet' on Financial Statements (Form-A) for Finance office of Government"
            )}
            {this.renderYearAmountGroup('Total shareholders equity ', 'totalShareholderEquity')}

            <Form.Item
              {...this.common}
              className="multiple-wrapper"
              label={__('Please provide financial records for your last 3 years')}
              extra={__('The most recent years worth of accounts will always appear on top')}
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
            control: <Input.TextArea {...this.common} style={{ minHeight: '80px' }} />,
          })}
        </Card>

        <Card bodyStyle={{ paddingBottom: '16px' }}>
          {this.renderField({
            label: 'Is your company up to date with Social Security payments?',
            name: 'isUpToDateSSP',
            isVisible: country === 'MN',
            optional: country !== 'MN',
            control: (
              <Select {...this.common} {...this.common} placeholder={__('Select one')}>
                {booleanOptions}
              </Select>
            ),
          })}

          {this.renderField({
            label: 'Is your company up to date with Corporation Tax payments?',
            name: 'isUpToDateCTP',
            control: (
              <Select {...this.common} {...this.common} placeholder={__('Select one')}>
                {booleanOptions}
              </Select>
            ),
          })}
        </Card>

        {this.renderSkipButton()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

PrequalificationForm.propTypes = {
  onSkip: PropTypes.func,
};

PrequalificationForm.contextTypes = {
  __: PropTypes.func,
};

export default Form.create()(PrequalificationForm);
