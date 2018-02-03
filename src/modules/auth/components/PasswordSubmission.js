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
    const { reset } = this.props;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          {reset ? (
            <Alert
              description="Please enter your new password."
              type="success"
            />
          ) : (
            <Alert
              description="Email confirmed succesfully! Please enter your password."
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
                  placeholder="Password"
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
                  placeholder="Confirm password"
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginBottom: '5px' }}
            >
              {reset ? 'Reset password' : 'Register'}
            </Button>
            {!reset && (
              <div>
                Already registered? <Link to="/sign-in">Sign in</Link>
              </div>
            )}
          </Form>
        </Card>
      </div>
    );
  }
}

PasswordSubmission.propTypes = propTypes;

const PasswordSubmissionForm = Form.create()(PasswordSubmission);

export default PasswordSubmissionForm;
