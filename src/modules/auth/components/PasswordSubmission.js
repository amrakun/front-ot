import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button, Alert } from 'antd';
import { BaseForm, Field } from 'modules/common/components';
import { noLabelLayout } from 'modules/common/constants';

const propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.object
};

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
    const { __ } = this.context;
    if (value && value !== form.getFieldValue('password')) {
      callback(__('Two passwords that you enter is inconsistent!'));
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
    const { __ } = this.context;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          {reset ? (
            <Alert
              description={__('Please enter your new password')}
              type="success"
            />
          ) : (
            <Alert
              description={__(
                'Email confirmed successfully! Please enter your password'
              )}
              type="success"
            />
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
                  placeholder={__('Password')}
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
                  placeholder={__('Confirm Password')}
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginBottom: '5px' }}
            >
              {reset ? __('Reset password') : __('Register')}
            </Button>
            {!reset && (
              <div>
                {__('Already registered?')}{' '}
                <Link to="/sign-in">{__('Sign in')}</Link>
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
  __: PropTypes.func
};

const PasswordSubmissionForm = Form.create()(PasswordSubmission);

export default PasswordSubmissionForm;
