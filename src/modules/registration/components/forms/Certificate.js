import React from 'react'
import {withRouter} from 'react-router'
import { Form, Input, Select, Button, Upload, Icon} from 'antd';
import { booleanData } from '../../constants'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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
      offset: 8,
    },
    lg: {
      span: 14,
      offset: 8,
    },
  },
};

class RegistrationForm extends React.Component {
  state = {
    isReceived: false,
    isExisting: false,
    isVisibleExisting: false
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleReceivedChange(value) {
    const form = this.props.form;
    let newState = {isReceived: false, isVisibleExisting: true, isExisting: false};
    if (value === '0')//Yes
      newState = {isReceived: true, isVisibleExisting: false, isExisting: false};

    form.setFieldsValue({upload: ''})
    form.setFieldsValue({isExisting: ''})
    form.setFieldsValue({cwNumber: ''})
    this.setState(newState);
  }

  handleExistingChange(value) {
    let isExisting = false;
    if (value === '0')//Yes
      isExisting = true;

    this.props.form.setFieldsValue({cwNumber: ''})
    this.setState({isExisting});
  }

  componentDidMount() {
    const data = this.props.data;
    this.handleExistingChange(data.isReceived);
    this.handleExistingChange(data.isExisting);
    this.props.form.setFieldsValue(data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const booleanOptions = booleanData.map((el, i) => <Option key={i}>{el}</Option>);
    const { isReceived, isExisting, isVisibleExisting } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Have you received capacity building certificate?"
          hasFeedback
        >
          {getFieldDecorator('isReceived', {
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select
              placeholder="Please select an option"
              onChange={(value) => this.handleReceivedChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label="Please upload your certificate"
         extra='You may upload "jpg,jpeg,png,rtf,pdf" files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb.'
         style={isReceived ? {} : {display: 'none'}}
        >
         {getFieldDecorator('upload', {
           valuePropName: 'fileList',
           getValueFromEvent: this.normFile,
           rules: [{
             required: isReceived,
             message: 'Please input your company registration sertificate!'
           }],
         })(
           <Upload name="logo" action="/upload.do" listType="picture">
             <Button>
               <Icon type="upload" /> Click to upload
             </Button>
           </Upload>
         )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Are you an existing supplier to OT?"
          hasFeedback
          style={isVisibleExisting ? {} : {display: 'none'}}
          extra={!isReceived && !isExisting ? 'You must receive Capacity building certificate in order to complete your registration' : ''}
        >
          {getFieldDecorator('isExisting', {
            rules: [
              { required: isVisibleExisting, message: 'Please select an option!' },
            ],
          })(
            <Select
              placeholder="Please select an option"
              onChange={(value) => this.handleExistingChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Please provide CW and PO number"
          hasFeedback
          style={isExisting ? {} : {display: 'none'}}
        >
          {getFieldDecorator('cwNumber', {
            rules: [{
              required: !isReceived,
              message: 'Please enter CW and PO number!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" disabled={!isReceived && !isExisting ? true : false} htmlType="submit">Save & continue</Button>
        </FormItem>
      </Form>
    );
  }
}

const CertificateForm = Form.create()(RegistrationForm);

export default withRouter(CertificateForm);
