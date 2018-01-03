import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon, Checkbox, Card, Alert } from 'antd';

const FormItem = Form.Item;

const propTypes = {
  login: PropTypes.func.isRequired,
  form: PropTypes.object,
  location: PropTypes.object
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const email = values.email;
        const password = values.password;
        this.props.login({ email, password });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { location } = this.props;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          {location.search === '?confirmation' ? (
            <Alert
              description="Confirmation link has been sent to your email!"
              type="success"
            />
          ) : null}
          {location.search === '?confirmed' ? (
            <Alert
              description="Email confirmed succesfully! Please login using your provided details"
              type="success"
            />
          ) : null}
          {location.search === '?required' ? (
            <Alert description="Please sign in to continue!" type="info" />
          ) : null}

          <Form onSubmit={this.handleSubmit} className="margin">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter your email!' }]
              })(<Input prefix={<Icon type="user" />} placeholder="Email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please enter your Password!' }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Link className="right" to="/forgot-password">
                Forgot password
              </Link>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;

const SignInForm = Form.create()(SignIn);

export default SignInForm;
