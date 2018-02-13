import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, InputNumber, Row, Col } from 'antd';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  mainAction: PropTypes.func
};

const messages = defineMessages({
  firstName: {
    id: 'profileFirstName',
    defaultMessage: 'First Name'
  },
  lastName: {
    id: 'profileLastName',
    defaultMessage: 'Last Name'
  },
  jobTitle: {
    id: 'profileJobTitle',
    defaultMessage: 'Job Title'
  },
  email: {
    id: 'profileEmail',
    defaultMessage: 'Email address'
  },
  phone: {
    id: 'profilePhone',
    defaultMessage: 'Phone Number'
  },
  username: {
    id: 'profileUserName',
    defaultMessage: 'Username'
  },
  password: {
    id: 'profilePassword',
    defaultMessage: 'Password'
  }
});

const placeholders = defineMessages({
  firstName: {
    id: 'profilePlaceholderFirstName',
    defaultMessage: 'Please input your First Name!'
  },
  lastName: {
    id: 'profilePlaceholderLastName',
    defaultMessage: 'Please input your Last Name!'
  },
  validEmail: {
    id: 'profilePlaceholderValidEmail',
    defaultMessage: 'The input is not valid E-mail!'
  },
  email: {
    id: 'profilePlaceholderEmail',
    defaultMessage: 'Please input your Email address!'
  },
  phone: {
    id: 'profilePlaceholderPhone',
    defaultMessage: 'Please input your Phone Number!'
  },
  username: {
    id: 'profilePlaceholderUsername',
    defaultMessage: 'Please input your Username!'
  },
  password: {
    id: 'profilePlaceholderPassword',
    defaultMessage: 'Please input your current Password!'
  }
});

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
    const { formatMessage } = this.context;
    const user = this.props.currentUser || {};
    // Field messages
    const f = messages;

    // Placeholder messages
    const p = placeholders;

    return (
      <Card>
        <h2 style={{ marginBottom: 40 }}>
          <T id="profileGeneralInformation">General Information</T>
        </h2>
        <Row>
          <Col span={12} offset={2}>
            <Form className="user-register-form" onSubmit={this.handleSubmit}>
              <FormItem label={formatMessage(f.firstName)}>
                {getFieldDecorator('firstName', {
                  initialValue: user.firstName || '',
                  rules: [
                    {
                      required: true,
                      message: formatMessage(p.firstName)
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem label={formatMessage(f.lastName)}>
                {getFieldDecorator('lastName', {
                  initialValue: user.lastName || '',
                  rules: [
                    {
                      required: true,
                      message: formatMessage(p.lastName)
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem label={formatMessage(f.jobTitle)}>
                {getFieldDecorator('jobTitle', {
                  initialValue: user.jobTitle || ''
                })(<Input />)}
              </FormItem>
              <FormItem label={formatMessage(f.email)}>
                {getFieldDecorator('email', {
                  initialValue: user.email || '',
                  rules: [
                    {
                      type: 'email',
                      message: formatMessage(p.validEmail)
                    },
                    {
                      required: true,
                      message: formatMessage(p.email)
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem label={formatMessage(f.phone)}>
                {getFieldDecorator('phone', {
                  initialValue: user.phone || '',
                  rules: [
                    {
                      required: true,
                      message: formatMessage(p.phone)
                    }
                  ]
                })(
                  <InputNumber
                    className="user-phone"
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <h2>
                <T id="profileUsernameAndPassword">Username & Password</T>
              </h2>
              <FormItem label={formatMessage(f.username)}>
                {getFieldDecorator('username', {
                  initialValue: user.username || '',
                  rules: [
                    {
                      required: true,
                      message: formatMessage(p.username)
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem label={formatMessage(f.password)}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(p.password)
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

Profile.propTypes = propTypes;
Profile.contextTypes = {
  formatMessage: PropTypes.func
};

export default Form.create()(Profile);
