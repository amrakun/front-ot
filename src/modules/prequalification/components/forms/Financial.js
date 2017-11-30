import React from 'react';
import { withRouter } from 'react-router';
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  Upload,
  Icon
} from 'antd';
import {
  yearData,
  booleanData,
  currencyData,
  dateFormat
} from '../../constants';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    lg: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 8
    },
    lg: {
      span: 14,
      offset: 8
    }
  }
};
const yearOptions = yearData.map((el, i) => <Option key={i}>{el}</Option>);

class PrequalificationForm extends React.Component {
  state = {
    canProvide: false,
    initialRender: true
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleProvideSelect(value) {
    let newState;
    value === '0'
      ? (newState = { canProvide: true, initialRender: false })
      : (newState = { canProvide: false, initialRender: false });
    this.setState(newState);
  }

  componentDidMount() {
    const data = this.props.data;
    this.handleProvideSelect(data.canProvide);
    if (data.recordDate1) data.recordDate1 = moment(data.recordDate1);
    if (data.recordDate1) data.recordDate2 = moment(data.recordDate2);
    if (data.recordDate1) data.recordDate3 = moment(data.recordDate3);
    this.props.form.setFieldsValue(data);
  }

  renderItem(label, id) {
    const { getFieldDecorator } = this.props.form;
    const { canProvide } = this.state;

    return (
      <FormItem
        className="multiple-wrapper"
        label={label}
        extra={
          id === 'turnover'
            ? 'Turnover may be used by buyers as a search criteria. Currency conversions based on exchange rates on the day of the search will be applied to your answer for buyers searching in a different currency'
            : ''
        }
        {...formItemLayout}
      >
        <Row gutter={16}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Year1`, {
                rules: [
                  { required: canProvide, message: 'Please select an year!' }
                ]
              })(<Select placeholder="Select an year">{yearOptions}</Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Data1`, {
                rules: [
                  { required: canProvide, message: 'Please enter an input!' }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Year2`, {
                rules: [{ required: false, message: 'Please select an year!' }]
              })(<Select placeholder="Select an year">{yearOptions}</Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Data2`, {
                rules: [{ required: false, message: 'Please enter an input!' }]
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Year3`, {
                rules: [{ required: false, message: 'Please select an year!' }]
              })(<Select placeholder="Select an year">{yearOptions}</Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator(`${id}Data3`, {
                rules: [{ required: false, message: 'Please enter an input!' }]
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    );
  }

  renderRecord(i) {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <FormItem>
            {getFieldDecorator(`recordDate${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Please select date'
                }
              ]
            })(<DatePicker format={dateFormat} placeholder="Start" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>
            {getFieldDecorator(`recordUpload${i}`, {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: false,
                  message: 'Please upload your file'
                }
              ]
            })(
              <Upload
                name={`recordUpload${i}`}
                action="/upload.do"
                listType="picture"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </FormItem>
        </Col>
      </Row>
    );
  }

  render() {
    const { canProvide, initialRender } = this.state;
    const { getFieldDecorator } = this.props.form;
    const booleanOptions = booleanData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const currencyOptions = currencyData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className="preq-form">
        <FormItem
          {...formItemLayout}
          label="Can you provide accounts for the last 3 financial year?"
          hasFeedback
        >
          {getFieldDecorator('canProvide', {
            rules: [
              {
                required: true,
                message: 'Please select one'
              }
            ]
          })(
            <Select
              placeholder="Select one"
              onChange={value => this.handleProvideSelect(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>

        <div className={canProvide ? '' : 'hidden'}>
          <FormItem {...formItemLayout} label="Currency" hasFeedback>
            {getFieldDecorator('currency', {
              rules: [
                {
                  required: canProvide,
                  message: 'Please select one'
                }
              ]
            })(
              <Select placeholder="Select a currency">{currencyOptions}</Select>
            )}
          </FormItem>
          {this.renderItem('Annual turnover', 'turnover')}
          {this.renderItem('Pre-tax profit', 'pretax')}
          {this.renderItem('Total assets', 'assets')}
          {this.renderItem('Total current assets', 'currentAssets')}
          {this.renderItem('Total shareholders equity ', 'shareholders')}
        </div>
        <FormItem
          {...formItemLayout}
          label="If not, explain the reasons"
          hasFeedback
          className={canProvide || initialRender ? 'hidden' : ''}
        >
          {getFieldDecorator('reasons', {
            rules: [
              {
                required: !canProvide,
                message: 'Please provide the reasons!'
              }
            ]
          })(<TextArea style={{ minHeight: '80px' }} />)}
        </FormItem>
        <FormItem
          className="multiple-wrapper"
          label="Please provide financial records for your last 3 years"
          extra="The most recent years worth of accounts will always appear on top."
          {...formItemLayout}
        >
          {this.renderRecord(1)}
          {this.renderRecord(2)}
          {this.renderRecord(3)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Is your company up to date with Social Security payments?"
          hasFeedback
        >
          {getFieldDecorator('toDateSSp', {
            rules: [
              {
                required: true,
                message: 'Please select one'
              }
            ]
          })(<Select placeholder="Select one">{booleanOptions}</Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Is your company up to date with Corporation Tax payments?"
          hasFeedback
        >
          {getFieldDecorator('toDateCTp', {
            rules: [
              {
                required: true,
                message: 'Please select one'
              }
            ]
          })(<Select placeholder="Select one">{booleanOptions}</Select>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const FinancialForm = Form.create()(PrequalificationForm);

export default withRouter(FinancialForm);
