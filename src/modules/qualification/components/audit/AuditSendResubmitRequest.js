import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card, Col, Input } from 'antd';
import { BaseForm } from 'modules/common/components';

const { TextArea } = Input;

class SendRequest extends BaseForm {
  render() {
    const { __ } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="">
        <Col lg={{ span: 12, offset: 6 }} xl={{ span: 10, offset: 7 }}>
          <Card>
            {this.renderField({
              name: 'description',
              label: __('Description'),
              control: <TextArea />,
            })}
            {this.renderSubmit('Submit', this.handleSubmit)}
          </Card>
        </Col>
      </Form>
    );
  }
}

const SendRequestForm = Form.create()(SendRequest);

export default withRouter(SendRequestForm);
