import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  AutoComplete,
  Upload,
  InputNumber,
  Spin
} from 'antd';
import {
  structureData,
  foreignPercentageData,
  booleanData,
  soumData,
  countryData,
  aimagData,
  descriptions,
  labels
} from '../constants';

import BaseForm from '../../../../common/components/BaseForm';

class CompanyInfo extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedCountry: props.data.registeredInCountry,
      selectedAimag: props.data.registeredInAimag,
      loading: false
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleAimagChange = this.handleAimagChange.bind(this);
  }

  handleCountryChange(value) {
    this.setState({ selectedCountry: value });
  }

  handleAimagChange(value) {
    this.setState({ selectedAimag: value });
  }

  render() {
    const { autoCompleteResult, selectedCountry, selectedAimag } = this.state;

    const websiteOptions = this.renderAutoCompleteOptions(autoCompleteResult);
    const booleanOptions = this.renderOptions(booleanData);
    const countryOptions = this.renderOptions(countryData);

    return (
      <Spin spinning={this.state.loading} delay={500}>
        <Form onSubmit={this.handleSubmit}>
          {this.renderField({
            label: 'Are you an existing supplier?',
            name: 'isRegisteredOnSup',
            dataType: 'boolean',
            control: <Select>{booleanOptions}</Select>
          })}
          {this.renderField({
            label: 'SAP number',
            name: 'sapNumber',
            control: <Input />
          })}
          {this.renderField({
            label: '1. Company name (in English)',
            name: 'enName',
            control: <Input />
          })}
          {this.renderField({
            label: 'Company name (in Mongolian)',
            name: 'mnName',
            control: <Input />
          })}
          {this.renderField({
            label: '2. Address',
            name: 'address',
            optional: true,
            control: <Input />
          })}
          {this.renderField({
            label: 'Address 2',
            name: 'address2',
            optional: true,
            control: <Input />
          })}
          {this.renderField({
            label: 'Address 3',
            name: 'address3',
            control: <Input />
          })}
          {this.renderField({
            label: 'Town or city',
            name: 'townOrCity',
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
            control: <Select>{countryOptions}</Select>
          })}
          {this.renderField({
            label: '3. Country you are registered in',
            name: 'registeredInCountry',
            control: (
              <Select
                placeholder="Please select a country"
                onChange={value => this.handleCountryChange(value)}
              >
                {countryOptions}
              </Select>
            )
          })}
          {this.renderField({
            label: '3. Aimag you are registered in',
            name: 'registeredInAimag',
            isVisible: selectedCountry === 'Mongolia',
            optional: selectedCountry !== 'Mongolia',
            control: (
              <Select
                placeholder="Please select an aimag"
                onChange={value => this.handleAimagChange(value)}
              >
                {this.renderOptions(aimagData)}
              </Select>
            )
          })}
          {this.renderField({
            label: '3. Soum you are registered in',
            name: 'registeredInSum',
            isVisible:
              selectedCountry === 'Mongolia' && selectedAimag === 'Umnugovi',
            optional: !(
              selectedCountry === 'Mongolia' && selectedAimag === 'Umnugovi'
            ),
            control: (
              <Select placeholder="Please select a soum">
                {this.renderOptions(soumData)}
              </Select>
            )
          })}
          {this.renderField({
            label: 'Are you Chinese state owned entity?',
            name: 'isChinese',
            control: <Select>{booleanOptions}</Select>,
            isVisible: selectedCountry === 'China',
            optional: selectedCountry !== 'China'
          })}
          {this.renderField({
            label: labels.isSubContractor,
            description: descriptions.isSubContractor,
            name: 'isSubContractor',
            control: (
              <Select placeholder="Please select an option">
                {booleanOptions}
              </Select>
            )
          })}
          {this.renderField({
            label: labels.corporateStructure,
            name: 'corporateStructure',
            control: (
              <Select placeholder="Please select an option">
                {this.renderOptions(structureData)}
              </Select>
            )
          })}
          {this.renderField({
            label: '6. Company registration number',
            name: 'registrationNumber',
            control: <Input />
          })}
          {this.renderField({
            label: '7. Certificate of registration',
            description: descriptions.certificateOfRegistration,
            name: 'certificateOfRegistration',
            initialValue: '/path',
            control: (
              <Upload
                name="certificateOfRegistration"
                action="/upload.do"
                listType="picture"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )
          })}
          {this.renderField({
            label: '8. Company website',
            name: 'website',
            control: (
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )
          })}
          {this.renderField({
            label: (
              <span>
                9. Company e-mail&nbsp;
                <Tooltip title={descriptions.email}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            ),
            name: 'email',
            control: <Input />,
            validation: 'email'
          })}
          {this.renderField({
            label: labels.foreignOwnershipPercentage,
            name: 'foreignOwnershipPercentage',
            control: (
              <Select placeholder="Please select an option">
                {this.renderOptions(foreignPercentageData)}
              </Select>
            )
          })}
          {this.renderField({
            label: `11. Total number of employees`,
            name: 'totalNumberOfEmployees',
            control: <InputNumber htmlType="number" />
          })}
          {this.renderField({
            label: `12. Total number of Mongolian employees`,
            name: 'totalNumberOfMongolianEmployees',
            control: <InputNumber htmlType="number" />
          })}
          {this.renderField({
            label: `12. Total number of Umnugovi employees`,
            name: 'totalNumberOfUmnugoviEmployees',
            control: <InputNumber htmlType="number" />
          })}

          {this.renderSubmit()}
        </Form>
      </Spin>
    );
  }
}

CompanyInfo.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object
};

const CompanyInfoForm = Form.create()(CompanyInfo);

export default withRouter(CompanyInfoForm);
