import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  mainAction: PropTypes.func
};

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
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
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

    return (
      <Card>
        <h2 style={{ marginBottom: 40 }}>Change Password</h2>
        <Row>
          <Col span={12} offset={2}>
            <Form className="user-register-form" onSubmit={this.handleSubmit}>
              <FormItem label="Current Password">
                {getFieldDecorator('currentPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your current password!'
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
              <FormItem label="New Password">
                {getFieldDecorator('newPassword', {
                  rules: [
                    {
                      validator: this.checkConfirm
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
              <FormItem label="Confirm New Password">
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
                  Save
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

export default Form.create()(ChangePassword);
