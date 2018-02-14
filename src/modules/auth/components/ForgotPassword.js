import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button } from 'antd';
import { BaseForm, Field } from 'modules/common/components';
import { Link } from 'react-router-dom';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  form: PropTypes.object
};

const messages = defineMessages({
  email: {
    id: 'signInEmail',
    defaultMessage: 'Email'
  }
});

class ForgotPassword extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.forgotPassword({ email: values.email });
      }
    });
  }

  render() {
    const { formatMessage } = this.context;
    const { email } = messages;
    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Field
              label="Please enter your registered email address:"
              name="email"
              validation="email"
              messageId="registeredEmail"
              control={
                <Input
                  prefix={<Icon type="mail" />}
                  placeholder={formatMessage(email)}
                />
              }
            />
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
              style={{ marginBottom: '12px' }}
            >
              <T id="btnSend">Send</T>
            </Button>
            <Link to="/sign-in">
              <T id="signIn">Sign in</T>
            </Link>
          </Form>
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = propTypes;
ForgotPassword.contextTypes = {
  formatMessage: PropTypes.func
};

const ForgotPasswordForm = Form.create()(ForgotPassword);

export default ForgotPasswordForm;
