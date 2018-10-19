import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Card, Button } from 'antd';
import { BaseForm, Field } from 'modules/common/components';
import { noLabelLayout } from 'modules/common/constants';

const propTypes = {
  resendConfirmationLink: PropTypes.func.isRequired,
  form: PropTypes.object
};

class ResendConfirmationLink extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.resendConfirmationLink(values);
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { __ } = this.context;

    return (
      <div className="center-content">
        <Card className="login-card" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Field
              name="email"
              layout={noLabelLayout}
              validation="email"
              control={
                <Input
                  prefix={<Icon type="mail" />}
                  placeholder={__('Email')}
                />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: '12px' }}
            >
              {__('ResendConfirmationLink')}
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

ResendConfirmationLink.propTypes = propTypes;
ResendConfirmationLink.contextTypes = {
  __: PropTypes.func
};

const ResendConfirmationLinkForm = Form.create()(ResendConfirmationLink);

export default ResendConfirmationLinkForm;
