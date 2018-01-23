import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object,
  mainAction: PropTypes.func,
  handleCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onClose: PropTypes.func
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.onClose();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { user, form } = this.props;

    form.validateFieldsAndScroll((err, data) => {
      if (err) {
        return;
      }

      if (user) {
        data._id = user._id;
      }

      this.props.mainAction(data);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const user = this.props.user || {};

    const title = user ? 'Edit User' : 'Add New User';

    const passwordRender =
      Object.keys(user).length === 0 ? (
        <div>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem label="Confirm Password">
            {getFieldDecorator('passwordConfirmation', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
        </div>
      ) : (
        ''
      );

    return (
      <div>
        <Modal
          title={title}
          visible={true}
          width={700}
          okText="Save"
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
          bodyStyle={{ maxHeight: '65vh', overflow: 'scroll' }}
        >
          <p>
            Ensure you complete all the required fields before clicking ‘Save
            User Details’. After saving you have the option of making the person
          </p>

          <Form className="user-register-form">
            <FormItem label="First Name">
              {getFieldDecorator('firstName', {
                initialValue: user.firstName || '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your First Name!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Last Name">
              {getFieldDecorator('lastName', {
                initialValue: user.lastName || '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your Last Name!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Role">
              {getFieldDecorator('role', {
                initialValue: user.role || 'contributor',
                rules: [{ required: true, message: 'Please select role!' }]
              })(
                <Select placeholder="Select a option">
                  <Option value="admin">Admin</Option>
                  <Option value="contributor">Contributor</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="Job Title">
              {getFieldDecorator('jobTitle', {
                initialValue: user.jobTitle || ''
              })(<Input />)}
            </FormItem>
            <FormItem label="Username">
              {getFieldDecorator('username', {
                initialValue: user.username || '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your Username!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            {passwordRender}
            <FormItem label="Email address">
              {getFieldDecorator('email', {
                initialValue: user.email || '',
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Phone Number">
              {getFieldDecorator('phone', {
                initialValue: user.phone || '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your phone number!'
                  }
                ]
              })(
                <InputNumber className="user-phone" style={{ width: '100%' }} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;

export default Form.create()(UserForm);
