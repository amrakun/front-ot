import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Button, Icon } from 'antd';
import { BaseForm } from 'modules/common/components';
import { Title, Common } from 'modules/common/components/translations';
import addressFields from './address';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  ...Common,
  ...Title
});

class ContactInfo extends BaseForm {
  render() {
    const { form } = this.props;
    const basicInfo = this.props.basicInfo || {};

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

    const { formatMessage } = this.props.intl;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title={formatMessage(messages.business)}>
          {this.renderField({
            label: 'Full name',
            name: 'name',
            control: (
              <Input
                placeholder={formatMessage(messages.placeholderFullName)}
              />
            )
          })}

          {this.renderField({
            label: 'Job title',
            name: 'jobTitle',
            control: <Input />
          })}
        </Card>

        <Card
          title={formatMessage(messages.address)}
          extra={
            basicInfo.address && (
              <Button onClick={copyAddress}>
                <Icon type="copy" />
                {formatMessage(messages.copy)}
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
            control: (
              <Input
                type="number"
                placeholder={formatMessage(messages.placeholderNumeric)}
              />
            )
          })}

          {this.renderField({
            label: 'Phone 2',
            name: 'phone2',
            control: (
              <Input
                type="number"
                placeholder={formatMessage(messages.placeholderNumeric)}
              />
            )
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

ContactInfo.propTypes = {
  intl: intlShape.isRequired
};

const ContactForm = Form.create()(ContactInfo);

export default injectIntl(withRouter(ContactForm));
