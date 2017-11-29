import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select, Button } from 'antd';
import { countryData } from '../../constants';

const FormItem = Form.Item;
const Option = Select.Option;

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

class RegistrationForm extends React.Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const countryOptions = countryData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <label>14. Primary business contact</label>
        <FormItem {...formItemLayout} label="Name" hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter your name!'
              }
            ]
          })(<Input placeholder="Title. First name + Last name" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Job title" hasFeedback>
          {getFieldDecorator('jobTitle', {
            rules: [
              {
                required: true,
                message: 'Please enter your job title!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Address" hasFeedback>
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please enter your address!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Address 2" hasFeedback>
          {getFieldDecorator('address2')(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Address 3" hasFeedback>
          {getFieldDecorator('address3')(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Town or city" hasFeedback>
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Please enter your town/city!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="County/state/province" hasFeedback>
          {getFieldDecorator('state', {
            rules: [
              {
                required: true,
                message: 'Please enter your country/state/province!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Postcode or zipcode" hasFeedback>
          {getFieldDecorator('zipcode')(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Country" hasFeedback>
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please select your country!' }]
          })(
            <Select placeholder="Please select a country">
              {countryOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone" hasFeedback>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please enter your phone number!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone 2" hasFeedback>
          {getFieldDecorator('phone2')(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your company e-mail!'
              }
            ]
          })(<Input />)}
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

const ContactForm = Form.create()(RegistrationForm);

export default withRouter(ContactForm);
