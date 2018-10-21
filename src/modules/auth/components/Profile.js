import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, InputNumber, Row, Col } from 'antd';
import { HelpModal } from 'modules/common/components';

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
    const { __ } = this.context;
    const user = this.props.currentUser || {};

    return (
      <div>
        <HelpModal videoId="auth" />
        <br />
        <br />

        <Card>
          <Row>
            <Col span={12} offset={2}>
              <Form className="user-register-form" onSubmit={this.handleSubmit}>
                <h2>{__('General Information')}</h2>

                <FormItem label={__('First name')}>
                  {getFieldDecorator('firstName', {
                    initialValue: user.firstName || '',
                    rules: [
                      {
                        required: true,
                        message: __('Please input your First Name!')
                      }
                    ]
                  })(<Input />)}
                </FormItem>

                <FormItem label={__('Last name')}>
                  {getFieldDecorator('lastName', {
                    initialValue: user.lastName || '',
                    rules: [
                      {
                        required: true,
                        message: __('Please input your Last Name!')
                      }
                    ]
                  })(<Input />)}
                </FormItem>

                <FormItem label={__('Job Title')}>
                  {getFieldDecorator('jobTitle', {
                    initialValue: user.jobTitle || ''
                  })(<Input />)}
                </FormItem>

                <FormItem label={__('Phone Number')}>
                  {getFieldDecorator('phone', {
                    initialValue: user.phone || '',
                    rules: [
                      {
                        required: true,
                        message: __('Please input your Phone Number!')
                      }
                    ]
                  })(
                    <InputNumber
                      className="user-phone"
                      style={{ width: '100%' }}
                    />
                  )}
                </FormItem>

                <h2>{__('Secure information')}</h2>

                <FormItem label={__('Email address')}>
                  {getFieldDecorator('email', {
                    initialValue: user.email || '',
                    rules: [
                      {
                        type: 'email',
                        message: __('The input is not valid E-mail!')
                      },
                      {
                        required: true,
                        message: __('Please input your Email address!')
                      }
                    ]
                  })(<Input />)}
                </FormItem>

                <FormItem label={__('Username')}>
                  {getFieldDecorator('username', {
                    initialValue: user.username || '',
                    rules: [
                      {
                        required: true,
                        message: __('Please input your Username!')
                      }
                    ]
                  })(<Input />)}
                </FormItem>

                <FormItem label={__('Password')}>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: __('Please input your current Password!')
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
                    {__('Save')}
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = propTypes;
Profile.contextTypes = {
  __: PropTypes.func
};

export default Form.create()(Profile);
