import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  mainAction: PropTypes.func
};

const messages = defineMessages({
  currentPassword: {
    id: 'currentPassword',
    defaultMessage: 'Current Password'
  },
  placeholderCurrentPassword: {
    id: 'placeholderCurrentPassword',
    defaultMessage: 'Please input your current password!'
  },
  newPassword: {
    id: 'newPassword',
    defaultMessage: 'New password'
  },
  confirmPassword: {
    id: 'confirmPassword',
    defaultMessage: 'Confirm New Password'
  },
  inconsistentPassword: {
    id: 'inconsistentPassword',
    defaultMessage: 'Two passwords that you enter is inconsistent!'
  }
});

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.checkConfir = this.checkConfir.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form } = this.props;

    form.validateFieldsAndScroll((err, data) => {
      if (err) {
        return;
      }

      this.props.mainAction(data);
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    const { formatMessage } = this.context;
    const { inconsistentPassword } = messages;

    if (value && value !== form.getFieldValue('newPassword')) {
      callback(formatMessage(inconsistentPassword));
    } else {
      callback();
    }
  }

  checkConfir(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.context;
    const {
      currentPassword,
      placeholderCurrentPassword,
      newPassword,
      confirmPassword
    } = messages;

    return (
      <Card>
        <h2 style={{ marginBottom: 40 }}>
          <T id="changePassword">Change Password</T>
        </h2>
        <Row>
          <Col span={12} offset={2}>
            <Form className="user-register-form" onSubmit={this.handleSubmit}>
              <FormItem label={formatMessage(currentPassword)}>
                {getFieldDecorator('currentPassword', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(placeholderCurrentPassword)
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
              <FormItem label={formatMessage(newPassword)}>
                {getFieldDecorator('newPassword', {
                  rules: [
                    {
                      validator: this.checkConfirm
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
              <FormItem label={formatMessage(confirmPassword)}>
                {getFieldDecorator('newPasswordConfirmation', {
                  rules: [
                    {
                      validator: this.checkPassword
                    }
                  ]
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: 'right' }}
                >
                  <T id="btnSave">Save</T>
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Card>
    );
  }
}

ChangePassword.propTypes = propTypes;
ChangePassword.contextTypes = {
  formatMessage: PropTypes.func
};

export default Form.create()(ChangePassword);
