import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  mainAction: PropTypes.func
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
    const user = this.props.currentUser || {};

    return (
      <Card>
        <h2 style={{ marginBottom: 40 }}>General Information</h2>
        <Row>
          <Col span={12} offset={2}>
            <Form className="user-register-form" onSubmit={this.handleSubmit}>
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
              <FormItem label="Job Title">
                {getFieldDecorator('jobTitle', {
                  initialValue: user.jobTitle || ''
                })(<Input />)}
              </FormItem>
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
                  <InputNumber
                    className="user-phone"
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <h2>Username & Password</h2>
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
              <FormItem label="Password">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your current password!'
                    }
                  ]
                })(<Input type="password" />)}
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

Profile.propTypes = propTypes;

export default Form.create()(Profile);
