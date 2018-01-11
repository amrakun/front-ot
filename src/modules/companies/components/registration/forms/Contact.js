import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Button, Icon } from 'antd';
import BaseForm from 'modules/common/components/BaseForm';
import addressFields from './address';

class ContactInfo extends BaseForm {
  render() {
    const { basicInfo, form } = this.props;

    const copyAddress = () => {
      const { setFieldsValue } = form;

      let values = {
        address: basicInfo.address,
        address2: basicInfo.address2,
        address3: basicInfo.address3,
        zipCode: basicInfo.zipCode,
        townOrCity: basicInfo.townOrCity,
        province: basicInfo.province,
        country: basicInfo.country
      };

      setFieldsValue(values);
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="14. Primary business contact">
          {this.renderField({
            label: 'Full name',
            name: 'name',
            control: <Input placeholder="First name + Last name" />
          })}

          {this.renderField({
            label: 'Job title',
            name: 'jobTitle',
            control: <Input />
          })}
        </Card>

        <Card
          title="Address"
          extra={
            basicInfo.address && (
              <Button onClick={copyAddress}>
                <Icon type="copy" />Copy from Company information
              </Button>
            )
          }
        >
          {addressFields(
            this.renderField.bind(this),
            this.renderOptions.bind(this)
          )}
        </Card>

        <Card>
          {this.renderField({
            label: 'Phone',
            name: 'phone',
            control: <Input />
          })}

          {this.renderField({
            label: 'Phone 2',
            name: 'phone2',
            control: <Input />
          })}

          {this.renderField({
            label: 'E-mail',
            name: 'email',
            validation: 'email',
            control: <Input />
          })}
        </Card>
        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const ContactForm = Form.create()(ContactInfo);

export default withRouter(ContactForm);
