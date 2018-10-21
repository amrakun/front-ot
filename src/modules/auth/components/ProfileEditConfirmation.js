import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card, Button } from 'antd';

const propTypes = {
  submit: PropTypes.func.isRequired
};

const FormItem = Form.Item;

class ProfileEditConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.submit();
  }

  render() {
    const { user, form } = this.props;
    const { getFieldDecorator } = form;
    const temporarySecureInformation = user.temporarySecureInformation || {};
    const { __ } = this.context;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit} className="margin">
            <FormItem label={__('Email')}>
              {getFieldDecorator('email', {
                initialValue: temporarySecureInformation.email
              })(<Input disabled={true} />)}
            </FormItem>

            <FormItem label={__('User name')}>
              {getFieldDecorator('username', {
                initialValue: temporarySecureInformation.username
              })(<Input disabled={true} />)}
            </FormItem>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginBottom: '5px' }}
            >
              {__('Confirm')}
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

ProfileEditConfirmation.propTypes = propTypes;
ProfileEditConfirmation.contextTypes = {
  __: PropTypes.func
};

export default Form.create()(ProfileEditConfirmation);
