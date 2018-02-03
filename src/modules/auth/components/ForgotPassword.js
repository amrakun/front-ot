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
    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Field
              name="email"
              validation="email"
              control={
                <Input prefix={<Icon type="mail" />} placeholder="Email" />
              }
            />
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
              style={{ marginBottom: '12px' }}
            >
              Send
            </Button>
            <Link to="/sign-in">Sign in</Link>
          </Form>
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = propTypes;

const ForgotPasswordForm = Form.create()(ForgotPassword);

export default ForgotPasswordForm;
