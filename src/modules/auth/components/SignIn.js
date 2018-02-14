import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon, Checkbox, Card, Alert } from 'antd';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const FormItem = Form.Item;

const propTypes = {
  login: PropTypes.func.isRequired,
  form: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
  chooseLoginAs: PropTypes.object
};

const messages = defineMessages({
  email: {
    id: 'signInEmail',
    defaultMessage: 'Email'
  },
  password: {
    id: 'password',
    defaultMessage: 'Password'
  },
  placeholderEmail: {
    id: 'profilePlaceholderEmail',
    defaultMessage: 'Please enter your email!'
  },
  placeholderPassword: {
    id: 'profilePlaceholderPassword',
    defaultMessage: 'Please enter your password!'
  },
  confirmation: {
    id: 'confirmationEmail',
    defaultMessage: 'Confirmation link has been sent to your email!'
  },
  activated: {
    id: 'activatedEmail',
    defaultMessage:
      'Account activated succesfully! Please login using your provided details'
  },
  signInToContinue: {
    id: 'signInToContinue',
    defaultMessage: 'Please sign in to continue!'
  }
});

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
    const { formatMessage } = this.context;
    const search = this.props.location.search || [{}];
    const { loading } = this.props;
    const {
      email,
      password,
      placeholderEmail,
      placeholderPassword,
      confirmation,
      activated,
      signInToContinue
    } = messages;

    return (
      <div>
        {search === '?confirmation' && (
          <Alert description={formatMessage(confirmation)} type="success" />
        )}
        {search === '?confirmed' && (
          <Alert description={formatMessage(activated)} type="success" />
        )}
        {search === '?required' && (
          <Alert description={formatMessage(signInToContinue)} type="info" />
        )}

        <Form onSubmit={this.handleSubmit} className="margin">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: formatMessage(placeholderEmail) }
              ]
            })(
              <Input
                prefix={<Icon type="mail" />}
                placeholder={formatMessage(email)}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: formatMessage(placeholderPassword) }
              ]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder={formatMessage(password)}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>
                <T id="rememberMe">Remember me</T>
              </Checkbox>
            )}
            <Link className="right" to="/forgot-password">
              <T id="forgotPassword">Forgot password</T>
            </Link>
            <Button type="primary" loading={loading} htmlType="submit">
              <T id="signIn">Нэвтрэх</T>
            </Button>
            <T id="or">Or</T>{' '}
            <Link to="/register">
              <T id="registerNow">register now!</T>
            </Link>
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

        <ul className="login-as-form">
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
  formatMessage: PropTypes.func
};

const SignInForm = Form.create()(SignIn);

export default SignInForm;
