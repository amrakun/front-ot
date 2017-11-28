import React from 'react'
import {withRouter} from 'react-router'
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <label>14. Primary business contact</label>
        <FormItem
          {...formItemLayout}
          label="Name"
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
        <FormItem
          {...formItemLayout}
          label="Job title"
          hasFeedback
        >
          {getFieldDecorator('contact_job', {
            rules: [{
              required: true, message: 'Please enter your job title!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address"
          hasFeedback
        >
          {getFieldDecorator('contact_address', {
            rules: [{
              required: true, message: 'Please enter your address!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address 2"
          hasFeedback
        >
          {getFieldDecorator('contact_address_2')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address 3"
          hasFeedback
        >
          {getFieldDecorator('contact_address_3')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Town or city"
          hasFeedback
        >
          {getFieldDecorator('contact_city', {
            rules: [{
              required: true, message: 'Please enter your town/city!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="County/state/province"
          hasFeedback
        >
          {getFieldDecorator('contact_state', {
            rules: [{
              required: true,
              message: 'Please enter your country/state/province!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Postcode or zipcode"
          hasFeedback
        >
          {getFieldDecorator('contact_zipcode')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Country"
          hasFeedback
        >
          {getFieldDecorator('contact_country', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="mongolia">Mongolia</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone"
          hasFeedback
        >
          {getFieldDecorator('contact_phone', {
            rules: [{
              required: true,
              message: 'Please enter your phone number!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone 2"
          hasFeedback
        >
          {getFieldDecorator('contact_phone_2')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('contact_email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your company e-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save & continue</Button>
        </FormItem>
      </Form>
    );
  }
}

const ContactForm = Form.create()(RegistrationForm);

export default withRouter(ContactForm);
