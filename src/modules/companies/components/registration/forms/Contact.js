import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select } from 'antd';
import { countryData } from '../constants';
import BaseForm from '../../../../common/components/BaseForm';

class ContactInfo extends BaseForm {
  render() {
    const countryOptions = this.renderOptions(countryData);

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderField({
          label: 'Name',
          name: 'name',
          control: <Input placeholder="Title. First name + Last name" />
        })}

        {this.renderField({
          label: 'Job title',
          name: 'jobTitle',
          control: <Input />
        })}

        {this.renderField({
          label: 'Address',
          name: 'address',
          control: <Input />
        })}

        {this.renderField({
          label: 'Address 2',
          name: 'address2',
          control: <Input />
        })}

        {this.renderField({
          label: 'Town or city',
          name: 'townOrCity',
          control: <Input />
        })}

        {this.renderField({
          label: 'Address 3',
          name: 'address3',
          control: <Input />
        })}

        {this.renderField({
          label: 'County/state/province',
          name: 'province',
          control: <Input />
        })}

        {this.renderField({
          label: 'Postcode or zipcode',
          name: 'zipCode',
          control: <Input />
        })}

        {this.renderField({
          label: 'Country',
          name: 'country',
          control: (
            <Select placeholder="Please select a country">
              {countryOptions}
            </Select>
          )
        })}

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

        {this.renderSubmit()}
      </Form>
    );
  }
}

const ContactForm = Form.create()(ContactInfo);

export default withRouter(ContactForm);
