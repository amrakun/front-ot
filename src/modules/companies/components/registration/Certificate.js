import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Card, Col } from 'antd';
import { booleanData, certLabels } from './constants';
import { BaseForm, Uploader } from 'modules/common/components';

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      isReceived: props.data.isReceived || false
    };

    this.onIsReceivedChange = this.onIsReceivedChange.bind(this);
  }

  onIsReceivedChange(value) {
    this.setState({ isReceived: value === 'true' });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const { isReceived } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="">
        <Col lg={{ span: 12, offset: 6 }} xl={{ span: 10, offset: 7 }}>
          <Card>
            {this.renderField({
              name: 'isReceived',
              label: certLabels.isReceived,
              dataType: 'boolean',
              control: (
                <Select onChange={this.onIsReceivedChange}>
                  {booleanOptions}
                </Select>
              )
            })}

            {this.renderField({
              label: 'Please upload your certificate',
              name: 'file',
              attachmentType: 'Certificate',
              isVisible: isReceived,
              optional: !isReceived,
              dataType: 'file',
              control: <Uploader />
            })}
            {this.renderSubmit('Save & submit', this.handleSubmit)}
          </Card>
        </Col>
      </Form>
    );
  }
}

const CertificateForm = Form.create()(RegistrationForm);

export default withRouter(CertificateForm);
