import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Button, Input, DatePicker, Upload, Icon } from 'antd';
import { booleanData, actionStatusData, dateFormat } from '../../constants'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 12,
    },
    lg: {
      span: 14,
      offset: 10,
    },
  },
};

class PrequalificationForm extends React.Component {
  state = {
    isInvestigated: false,
    isConvicted: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleInvestigatedChange(value) {
    let newState;
    if (value === '0') { //yes
      newState = { isInvestigated: true }
    } else {
      newState = { isInvestigated: false }
      this.props.form.setFieldsValue({
        dateInvestigated: '', reasons: '', actionStatus: '', upload: ''
      })
    }
    this.setState(newState);
  }

  handleConvictedChange(value) {
    let newState;
    if (value === '0') { //yes
      newState = { isConvicted: true }
    } else {
      newState = { isConvicted: false }
      this.props.form.setFieldsValue({
        stepsTaken: ''
      })
    }
    this.setState(newState);
  }

  componentDidMount() {
    const data = this.props.data;
    data.dateInvestigated ? data.dateInvestigated = moment(data.dateInvestigated) : '';
    this.handleInvestigatedChange(data.investigated);
    this.handleConvictedChange(data.convicted);
    this.props.form.setFieldsValue(data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const booleanOptions = booleanData.map((el, i) => <Option key={i}>{el}</Option>);
    const statusOptions = actionStatusData.map((el, i) => <Option key={i}>{el}</Option>);
    const { isInvestigated, isConvicted } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label='Does the organisation have environmental management plans or procedures (including air quality, greenhouse gases emissions, water and contamination prevention, noise and vibration, Waste Management)?'
          hasFeedback
        >
          {getFieldDecorator('plans', {
            rules: [{
              required: true,
              message: 'Please select one'
            }]
          })(
            <Select placeholder="Select one">
              {booleanOptions}
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='Has any environmental regulator inspected / investigated your company within the last 5 years?'
          hasFeedback
        >
          {getFieldDecorator('investigated', {
            rules: [{
              required: true,
              message: 'Please select one'
            }]
          })(
            <Select
              placeholder="Select one"
              onChange={(value) => this.handleInvestigatedChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date of Inspection / Investigation"
          hasFeedback
          className={isInvestigated ? '' : 'hidden'}
        >
           {getFieldDecorator(`dateInvestigated`, {
             rules: [{
               required: false,
               message: 'Please select date'
             }]
           })(
             <DatePicker
               format={dateFormat}
               placeholder="Select a date"
             />
           )}
         </FormItem>
        <FormItem
          {...formItemLayout}
          label='Reasons for investigation/inspection'
          hasFeedback
          className={isInvestigated ? '' : 'hidden'}
        >
          {getFieldDecorator('reasons', {
            rules: [{
              required: false,
              message: 'Please enter an input'
            }]
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Action status'
          hasFeedback
          className={isInvestigated ? '' : 'hidden'}
        >
          {getFieldDecorator('actionStatus', {
            rules: [{
              required: false,
              message: 'Please select one'
            }]
          })(
            <Select placeholder="Select one">
              {statusOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Upload Inspection / Investigation Documentation"
          hasFeedback
          className={isInvestigated ? '' : 'hidden'}
        >
          {getFieldDecorator(`upload`, {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{
              required: false,
              message: 'Please upload your file'
            }]
          })(
            <Upload name='upload' action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='Has your company ever been convicted for a breach of any Environmental laws in the countries you operate?'
          hasFeedback
        >
          {getFieldDecorator('convicted', {
            rules: [{
              required: true,
              message: 'Please select one'
            }]
          })(
            <Select
              placeholder="Select one"
              onChange={(value) => this.handleConvictedChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='If Yes, what steps have you taken to ensure this does not happen again? '
          hasFeedback
          className={isConvicted ? '' : 'hidden'}
        >
          {getFieldDecorator('stepsTaken', {
            rules: [{
              required: isConvicted,
              message: 'Please enter an input'
            }]
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Additional Information'
          extra='Please use this space to provide additional information regarding your Corporate Social Responsibility'
          hasFeedback
        >
          {getFieldDecorator('additional', {
            rules: [{
              required: true,
              message: 'Please enter an input'
            }]
          })(
            <TextArea />
          )}
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

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
