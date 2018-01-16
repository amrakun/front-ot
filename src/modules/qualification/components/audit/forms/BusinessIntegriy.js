import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card } from 'antd';
import BaseForm from 'modules/common/components/BaseForm';

class SupplierProfile extends BaseForm {
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="14. Primary business contact">
          {this.renderField({
            label: 'Job title',
            name: 'jobTitle',
            control: <Input />
          })}
        </Card>
        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const SupplierProfileForm = Form.create()(SupplierProfile);

export default withRouter(SupplierProfileForm);
