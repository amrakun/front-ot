import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select } from 'antd';

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

  handleCancel(e) {
    this.props.onClose();
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const user = this.props || {};

    const title = user ? 'Edit User' : 'Add New User';

    return (
      <div>
        <Modal
          title={title}
          visible={true}
          width={700}
          okText="Save"
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
        >
          <p>
            Ensure you complete all the required fields before clicking ‘Save
            User Details’. After saving you have the option of making the person
          </p>
          <Form className="user-register-form">
            <FormItem label="First Name">
              {getFieldDecorator('firstname', {
                initialValue: user.firstname || '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your First Name!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Last Name">
              {getFieldDecorator('lastname', {
                initialValue: user.lastname || '',
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
                initialValue: user ? user.role : '',
                rules: [{ required: true, message: 'Please select role!' }]
              })(
                <Select placeholder="Select a option">
                  <Option value="admin">Admin</Option>
                  <Option value="contributor">Contributor</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="Job Title">
              {getFieldDecorator('job', {
                initialValue: user ? user.job : ''
              })(<Input />)}
            </FormItem>
            <FormItem label="Username">
              {getFieldDecorator('username', {
                initialValue: user ? user.username : '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your Username!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            {!user ? (
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
            )}
            <FormItem label="Email address">
              {getFieldDecorator('email', {
                initialValue: user ? user.email : '',
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
                initialValue: user ? user.phone : '',
                rules: [
                  {
                    required: true,
                    message: 'Please input your phone number!'
                  }
                ]
              })(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;

export default Form.create()(UserForm);
