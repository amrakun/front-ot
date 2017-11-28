import React from 'react'
import {withRouter} from 'react-router'
import { Form, Input, Select, Button, Upload, Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Have you received capacity building certificate?"
          hasFeedback
        >
          {getFieldDecorator('certificate_existing', {
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
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
        >
         {getFieldDecorator('upload', {
           valuePropName: 'fileList',
           getValueFromEvent: this.normFile,
           rules: [{
             required: true,
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
        >
          {getFieldDecorator('certificate_existing', {
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Please provide CW and PO number"
          hasFeedback
        >
          {getFieldDecorator('contact_name', {
            rules: [{
              required: true, message: 'Please enter your name!',
            }],
          })(
            <Input placeholder="Title. First name + Last name" />
          )}
        </FormItem>
      </Form>
    );
  }
}

const CertificateForm = Form.create()(RegistrationForm);

export default withRouter(CertificateForm);
