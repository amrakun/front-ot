import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button } from 'antd';
import { BaseForm, Field, T } from 'modules/common/components';
import { noLabelLayout } from 'modules/common/constants';
import { defineMessages } from 'react-intl';

const propTypes = {
  register: PropTypes.func.isRequired,
  form: PropTypes.object
};

const messages = defineMessages({
  email: {
    id: 'profileEmail',
    defaultMessage: 'Email'
  }
});

class Register extends BaseForm {
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
        this.props.register(values);
      }
    });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
    const { loading } = this.props;
    const { formatMessage } = this.context;
    const { email } = messages;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Field
              name="email"
              layout={noLabelLayout}
              validation="email"
              control={
                <Input
                  prefix={<Icon type="mail" />}
                  placeholder={formatMessage(email)}
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: '12px' }}
            >
              <T id="register">Register</T>
            </Button>
            <T id="alreadyRegistered">Already registered?</T>{' '}
            <Link to="/sign-in">
              <T id="signIn">Sign in</T>
            </Link>
          </Form>
        </Card>
      </div>
    );
  }
}

Register.propTypes = propTypes;
Register.contextTypes = {
  formatMessage: PropTypes.func
};

const RegisterForm = Form.create()(Register);

export default RegisterForm;
