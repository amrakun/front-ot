import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  AutoComplete,
  Spin,
  Card
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

import { BaseForm, Uploader } from 'modules/common/components';

class CompanyInfo extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedCountry: data.registeredInCountry,
      selectedAimag: data.registeredInAimag,
      isRegisteredOnSup: data.isRegisteredOnSup,
      loading: false
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleAimagChange = this.handleAimagChange.bind(this);
    this.handleIsRegisteredChange = this.handleIsRegisteredChange.bind(this);
  }

  handleCountryChange(value) {
    this.setState({ selectedCountry: value });
  }

  handleAimagChange(value) {
    this.setState({ selectedAimag: value });
  }

  handleIsRegisteredChange(value) {
    this.setState({ isRegisteredOnSup: value === 'true' });
  }

  render() {
    const { data } = this.props;
    const {
      autoCompleteResult,
      selectedCountry,
      selectedAimag,
      isRegisteredOnSup
    } = this.state;

    const websiteOptions = this.renderAutoCompleteOptions(autoCompleteResult);
    const booleanOptions = this.renderOptions(booleanData);
    const countryOptions = this.renderOptions(countryData);

    return (
      <Spin spinning={this.state.loading} delay={500}>
        <Form>
          <Card title="Please provide us with your company details">
            {this.renderField({
              label: 'Are you an existing supplier?',
              name: 'isRegisteredOnSup',
              dataType: 'boolean',
              control: (
                <Select onChange={this.handleIsRegisteredChange}>
                  {booleanOptions}
                </Select>
              )
            })}
            {this.renderField({
              label: 'SAP number',
              name: 'sapNumber',
              isVisible: isRegisteredOnSup,
              optional: !isRegisteredOnSup,
              validation: 'number',
              control: <Input type="number" />
            })}
            {this.renderField({
              label: '1. Company name (in English)',
              name: 'enName',
              control: <Input />
            })}
            {/* {this.renderField({
              label: 'Company name (in Mongolian)',
              name: 'mnName',
              optional: true,
              control: <Input />
            })} */}
            {this.renderField({
              label: '2. Address',
              name: 'address',
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
              optional: true,
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
              control: <Input type="number" />
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
                  onChange={this.handleCountryChange}
                >
                  {countryOptions}
                </Select>
              )
            })}
            {this.renderField({
              label: 'Aimag you are registered in',
              name: 'registeredInAimag',
              isVisible: selectedCountry === 'Mongolia',
              optional: selectedCountry !== 'Mongolia',
              control: (
                <Select
                  placeholder="Please select an aimag"
                  onChange={this.handleAimagChange}
                >
                  {this.renderOptions(aimagData)}
                </Select>
              )
            })}
            {this.renderField({
              label: 'Soum you are registered in',
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
              control: <Input type="number" />
            })}
            {this.renderField({
              label: '7. Certificate of registration',
              description: descriptions.certificateOfRegistration,
              name: 'certificateOfRegistration',
              dataType: 'file',
              control: (
                <Uploader
                  initialFile={data.certificateOfRegistration}
                  onReceiveFile={(...args) =>
                    this.certificateOfRegistrationUpload(...args)
                  }
                />
              )
            })}
            {this.renderField({
              label: '8. Company website',
              name: 'website',
              optional: true,
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
              control: <Input type="number" />
            })}
            {this.renderField({
              label: `12. Total number of Mongolian employees`,
              name: 'totalNumberOfMongolianEmployees',
              control: <Input type="number" />
            })}
            {this.renderField({
              label: `13. Total number of Umnugovi employees`,
              name: 'totalNumberOfUmnugoviEmployees',
              control: <Input type="number" />
            })}
          </Card>
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
