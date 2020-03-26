import React from 'react';
import { withRouter } from 'react-router';
import { Form, Card, Col, Input } from 'antd';
import { certLabels } from './constants';
import { BaseForm, Uploader } from 'modules/common/components';

const { TextArea } = Input;

class CertificateFormContainer extends BaseForm {
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="">
        <Col lg={{ span: 12, offset: 6 }} xl={{ span: 10, offset: 7 }}>
          <Card>
            {this.renderField({
              name: 'description',
              label: certLabels.description,
              control: <TextArea />,
            })}

            {this.renderField({
              label: 'Please upload your certificate',
              name: 'file',
              attachmentType: 'Certificate',
              dataType: 'file',
              optional: true,
              control: <Uploader />,
            })}
            {this.renderSubmit('Save & submit', this.handleSubmit)}
          </Card>
        </Col>
      </Form>
    );
  }
}

const CertificateForm = Form.create()(CertificateFormContainer);

export default withRouter(CertificateForm);
