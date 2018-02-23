import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button } from 'antd';
import { BaseForm, Field } from 'modules/common/components';
import { Link } from 'react-router-dom';

const propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  form: PropTypes.object
};

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
    const { __ } = this.context;
    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Field
              label={__('Please enter your registered email address')}
              name="email"
              validation="email"
              control={
                <Input
                  prefix={<Icon type="mail" />}
                  placeholder={__('Email')}
                />
              }
            />
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
              style={{ marginBottom: '12px' }}
            >
              {__('Send')}
            </Button>
            <Link to="/sign-in">{__('Sign in')}</Link>
          </Form>
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = propTypes;
ForgotPassword.contextTypes = {
  __: PropTypes.func
};

const ForgotPasswordForm = Form.create()(ForgotPassword);

export default ForgotPasswordForm;
