import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button } from 'antd';
import { BaseForm, Field } from 'modules/common/components';
import { noLabelLayout } from 'modules/common/constants';

const propTypes = {
  register: PropTypes.func.isRequired,
  form: PropTypes.object
};

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
    const { __ } = this.context;

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
                  placeholder={__('Email')}
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: '12px' }}
            >
              {__('Register')}
            </Button>
            {__('Already registered?')}{' '}
            <Link to="/sign-in">{__('Sign in')}</Link>
          </Form>
        </Card>
      </div>
    );
  }
}

Register.propTypes = propTypes;
Register.contextTypes = {
  __: PropTypes.func
};

const RegisterForm = Form.create()(Register);

export default RegisterForm;
