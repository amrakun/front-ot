import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, InputNumber, Upload, Button } from 'antd';

const FormItem = Form.Item;
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
    xs: { span: 24, offset: 0 },
    sm: { span: 14, offset: 8 },
    lg: { span: 8, offset: 8 }
  }
};

class RegistrationForm extends React.Component {
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.data);
  }

  renderShareholder(k, isRequired) {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label={<strong>Shareholder {k}</strong>}
          colon={false}
        />
        <FormItem {...formItemLayout} label="Name" hasFeedback>
          {getFieldDecorator(`name${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: isRequired,
                whitespace: true,
                message: 'Please enter a name.'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Job title" hasFeedback>
          {getFieldDecorator(`title${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: isRequired,
                whitespace: true,
                message: 'Please enter a title.'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Share percentage %" hasFeedback>
          {getFieldDecorator(`share${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: isRequired,
                message: 'Please enter share'
              }
            ]
          })(<InputNumber htmlType="number" />)}
        </FormItem>
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="20. Please provide key shareholders information"
          extra="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb."
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              {
                required: true,
                message: 'Please upload your key shareholders information!'
              }
            ]
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>
        {this.renderShareholder('1', true)}
        {this.renderShareholder('2', false)}
        {this.renderShareholder('3', false)}
        {this.renderShareholder('4', false)}
        {this.renderShareholder('5', false)}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ShareholderForm = Form.create()(RegistrationForm);

export default withRouter(ShareholderForm);
