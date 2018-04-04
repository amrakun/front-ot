import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon, Checkbox, Card, Alert } from 'antd';

const FormItem = Form.Item;

const propTypes = {
  login: PropTypes.func.isRequired,
  form: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
  chooseLoginAs: PropTypes.object
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

  renderLogin() {
    const { getFieldDecorator } = this.props.form;
    const { __ } = this.context;
    const search = this.props.location.search || [{}];
    const { loading } = this.props;

    return (
      <div>
        {search === '?confirmation' && (
          <Alert
            description={__('Confirmation link has been sent to your email!')}
            type="success"
          />
        )}

        {search === '?confirmed' && (
          <Alert
            description={__(
              'Account activated successfully! Please login using your provided details'
            )}
            type="success"
          />
        )}

        {search === '?required' && (
          <Alert description={__('Please sign in to continue!')} type="info" />
        )}

        <Form onSubmit={this.handleSubmit} className="margin">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: __('Please enter your email!') }
              ]
            })(
              <Input prefix={<Icon type="mail" />} placeholder={__('Email')} />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: __('Please enter your password!') }
              ]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder={__('Password')}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>{__('Remember me')}</Checkbox>)}
            <Link className="right" to="/forgot-password">
              {__('Forgot password')}
            </Link>
            <Button type="primary" loading={loading} htmlType="submit">
              {__('Sign in')}
            </Button>
            {__('Or')} <Link to="/register">{__('register now!')}</Link>
          </FormItem>
        </Form>
      </div>
    );
  }

  renderLoginAsItem({ login, loginParams, user }) {
    let content = user.username;

    if (user.firstName && user.lastName) {
      content = `${user.lastName} ${user.firstName}`;
    }

    return (
      <li onClick={() => login({ ...loginParams, loginAs: user._id })}>
        {content}
      </li>
    );
  }

  renderChooseLoginAs() {
    const { chooseLoginAs, login } = this.props;
    const { loginParams, user, delegatedUser } = chooseLoginAs;

    return (
      <div>
        <Alert description="Please choose your account!" type="info" />

        <ul className="login-as-form margin">
          {this.renderLoginAsItem({ login, loginParams, user })}
          {this.renderLoginAsItem({ login, loginParams, user: delegatedUser })}
        </ul>
      </div>
    );
  }

  render() {
    const { chooseLoginAs } = this.props;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          {chooseLoginAs ? this.renderChooseLoginAs() : this.renderLogin()}
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;
SignIn.contextTypes = {
  __: PropTypes.func
};

const SignInForm = Form.create()(SignIn);

export default SignInForm;
