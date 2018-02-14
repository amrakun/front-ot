import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button, Alert } from 'antd';
import { BaseForm, Field, T } from 'modules/common/components';
import { noLabelLayout } from 'modules/common/constants';
import { defineMessages } from 'react-intl';

const propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.object
};

const messages = defineMessages({
  enterNewPassword: {
    id: 'enterNewPassword',
    defaultMessage: 'Please enter your new password'
  },
  password: {
    id: 'password',
    defaultMessage: 'Password'
  },
  confirmPassword: {
    id: 'confirmPassword',
    defaultMessage: 'Confirm Password'
  },
  confirmSuccess: {
    id: 'confirmSuccess',
    defaultMessage: 'Email confirmed succesfully! Please enter your password.'
  },
  inconsistentPassword: {
    id: 'inconsistentPassword',
    defaultMessage: 'Two passwords that you enter is inconsistent!'
  },
  resetPassword: {
    id: 'resetPassword',
    defaultMessage: 'Reset password'
  },
  register: {
    id: 'register',
    defaultMessage: 'Register'
  }
});

class PasswordSubmission extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    const { formatMessage } = this.context;
    const { inconsistentPassword } = messages;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage(inconsistentPassword));
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value) {
      form.validateFields(['passwordConfirmation'], { force: true });
    }
    callback();
  }

  render() {
    const { reset } = this.props;
    const { formatMessage } = this.context;
    const {
      enterNewPassword,
      confirmSuccess,
      confirmPassword,
      password,
      resetPassword,
      register
    } = messages;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          {reset ? (
            <Alert
              description={formatMessage(enterNewPassword)}
              type="success"
            />
          ) : (
            <Alert description={formatMessage(confirmSuccess)} type="success" />
          )}

          <Form onSubmit={this.handleSubmit} className="margin">
            <Field
              name="password"
              layout={noLabelLayout}
              rules={[{ validator: this.checkConfirm }]}
              control={
                <Input
                  type="password"
                  prefix={<Icon type="lock" />}
                  placeholder={formatMessage(password)}
                />
              }
            />
            <Field
              name="passwordConfirmation"
              layout={noLabelLayout}
              rules={[{ validator: this.checkPassword }]}
              control={
                <Input
                  type="password"
                  prefix={<Icon type="lock" />}
                  placeholder={formatMessage(confirmPassword)}
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginBottom: '5px' }}
            >
              {reset ? formatMessage(resetPassword) : formatMessage(register)}
            </Button>
            {!reset && (
              <div>
                <T id="alreadyRegistered">Already registered?</T>{' '}
                <Link to="/sign-in">
                  <T id="signIn">Sign in</T>
                </Link>
              </div>
            )}
          </Form>
        </Card>
      </div>
    );
  }
}

PasswordSubmission.propTypes = propTypes;
PasswordSubmission.contextTypes = {
  formatMessage: PropTypes.func
};

const PasswordSubmissionForm = Form.create()(PasswordSubmission);

export default PasswordSubmissionForm;
