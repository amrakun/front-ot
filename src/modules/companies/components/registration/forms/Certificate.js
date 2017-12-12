import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select } from 'antd';
import { booleanData, certLabels } from '../constants';
import { BaseForm } from 'modules/common/components';

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      isOTSupplier: props.data.isOTSupplier || false
    };

    this.onIsSupplierChange = this.onIsSupplierChange.bind(this);
  }

  onIsSupplierChange(value) {
    this.setState({ isOTSupplier: value === 'true' });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const { isOTSupplier } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderField({
          name: 'isReceived',
          label: certLabels.isReceived,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'isOTSupplier',
          label: certLabels.isOTSupplier,
          dataType: 'boolean',
          control: (
            <Select onChange={this.onIsSupplierChange}>{booleanOptions}</Select>
          )
        })}

        {this.renderField({
          name: 'cwpo',
          label: certLabels.cwpo,
          dataType: 'boolean',
          isVisible: isOTSupplier,
          control: <Input />
        })}

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const CertificateForm = Form.create()(RegistrationForm);

export default withRouter(CertificateForm);
