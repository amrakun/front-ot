import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Card } from 'antd';
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
    const { data } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
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
            dataType: 'file',
            isVisible: isReceived,
            optional: !isReceived,
            control: (
              <Uploader
                initialFile={data.file}
                onReceiveFile={(...args) => this.fileUpload(...args)}
              />
            )
          })}
        </Card>
        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const CertificateForm = Form.create()(RegistrationForm);

export default withRouter(CertificateForm);
