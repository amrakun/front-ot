import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card } from 'antd';
import BaseForm from 'modules/common/components/BaseForm';
import { labels } from './constants';

const TextArea = Input.TextArea;

class SupplierProfile extends BaseForm {
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Supplier profile">
          {this.renderField({
            label: labels.sotri,
            name: 'sotri',
            control: <TextArea />
          })}
          {this.renderField({
            label: labels.sotie,
            name: 'sotie',
            control: <TextArea />
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
