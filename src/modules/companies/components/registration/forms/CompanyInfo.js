import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import addressFields from './address';
import { Form, Input, Select, Spin, Card } from 'antd';
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
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'basicInfo.title',
    defaultMessage: '1. Please provide us with your company details'
  },
  address: {
    id: 'addressTitle',
    defaultMessage: '2. Address'
  }
});

class CompanyInfo extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;
    const soleTrader = data.corporateStructure === 'Sole Trader';

    this.state = {
      selectedCountry: data.registeredInCountry,
      selectedAimag: data.registeredInAimag,
      isRegisteredOnSup: data.isRegisteredOnSup,
      totalEmps: data.totalNumberOfEmployees,
      mongolEmps: data.totalNumberOfMongolianEmployees,
      umnugoviEmps: data.totalNumberOfUmnugoviEmployees,
      loading: false,
      soleTrader
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleAimagChange = this.handleAimagChange.bind(this);
    this.handleIsRegisteredChange = this.handleIsRegisteredChange.bind(this);
    this.handleEmpsNumChange = this.handleEmpsNumChange.bind(this);
    this.validateEmpsNum = this.validateEmpsNum.bind(this);
    this.handleBusinessTypeChange = this.handleBusinessTypeChange.bind(this);
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

  handleEmpsNumChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  validateEmpsNum(value, callback, name) {
    const { totalEmps, mongolEmps } = this.state;

    if (name === 'mongolEmps' && parseInt(value, 10) > totalEmps)
      callback('Should be less than total number of employees');

    if (name === 'umnugoviEmps' && parseInt(value, 10) > mongolEmps)
      callback('Should be less than total number of Mongolian employees');

    callback();
  }

  handleBusinessTypeChange(value) {
    this.setState({ soleTrader: value === 'Sole Trader' });
  }

  render() {
    const {
      selectedCountry,
      selectedAimag,
      isRegisteredOnSup,
      soleTrader
    } = this.state;

    const booleanOptions = this.renderOptions(booleanData);
    const countryOptions = this.renderOptions(countryData);
    const { formatMessage } = this.context;

    return (
      <Spin spinning={this.state.loading} delay={500}>
        <Form>
          <Card title={formatMessage(messages.title)}>
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
              label: labels.corporateStructure,
              name: 'corporateStructure',
              control: (
                <Select
                  placeholder="Please select an option"
                  onChange={this.handleBusinessTypeChange}
                >
                  {this.renderOptions(structureData)}
                </Select>
              )
            })}

            {this.renderField({
              label: 'SAP number',
              name: 'sapNumber',
              isVisible: isRegisteredOnSup,
              optional: !isRegisteredOnSup,
              control: <Input type="number" />
            })}

            {this.renderField({
              label: 'Company name (in English)',
              name: 'enName',
              control: <Input />
            })}
          </Card>

          <Card title={formatMessage(messages.address)}>
            {addressFields(
              this.renderField.bind(this),
              this.renderOptions.bind(this)
            )}
          </Card>

          <Card>
            {this.renderField({
              label: '3. Country you are registered in',
              name: 'registeredInCountry',
              control: (
                <Select
                  onChange={this.handleCountryChange}
                  showSearch
                  filterOption={this.filterOption}
                >
                  {countryOptions}
                </Select>
              )
            })}
            {this.renderField({
              label: 'Aimag you are registered in',
              name: 'registeredInAimag',
              isVisible: selectedCountry === 'MN',
              optional: selectedCountry !== 'MN',
              control: (
                <Select
                  onChange={this.handleAimagChange}
                  showSearch
                  filterOption={this.filterOption}
                >
                  {this.renderOptions(aimagData)}
                </Select>
              )
            })}
            {this.renderField({
              label: 'Soum you are registered in',
              name: 'registeredInSum',
              isVisible:
                selectedCountry === 'MN' && selectedAimag === 'Omnogovi',
              optional: !(
                selectedCountry === 'MN' && selectedAimag === 'Omnogovi'
              ),
              control: (
                <Select showSearch filterOption={this.filterOption}>
                  {this.renderOptions(soumData)}
                </Select>
              )
            })}
            {this.renderField({
              label: 'Are you Chinese state owned entity?',
              name: 'isChinese',
              control: <Select>{booleanOptions}</Select>,
              isVisible: selectedCountry === 'CN',
              optional: selectedCountry !== 'CN'
            })}

            {this.renderField({
              label: '6. Company registration number',
              name: 'registrationNumber',
              isVisible: !soleTrader,
              optional: soleTrader,
              control: <Input type="number" />
            })}

            {this.renderField({
              label: '7. Certificate of registration',
              description: descriptions.certificateOfRegistration,
              name: 'certificateOfRegistration',
              dataType: 'file',
              isVisible: !soleTrader,
              optional: soleTrader,
              control: <Uploader />
            })}

            {this.renderField({
              label: '8. Company website',
              name: 'website',
              optional: true,
              isVisible: !soleTrader,
              control: <Input />
            })}
            {this.renderField({
              label: '9. Company e-mail',
              name: 'email',
              validation: 'email',
              isVisible: !soleTrader,
              optional: soleTrader,
              control: <Input />
            })}
            {this.renderField({
              label: labels.foreignOwnershipPercentage,
              name: 'foreignOwnershipPercentage',
              isVisible: !soleTrader,
              optional: soleTrader,
              control: (
                <Select placeholder="Please select an option">
                  {this.renderOptions(foreignPercentageData)}
                </Select>
              )
            })}

            {this.renderField({
              label: `11. Total number of employees`,
              name: 'totalNumberOfEmployees',
              control: (
                <Input
                  onChange={e => this.handleEmpsNumChange(e, 'totalEmps')}
                  type="number"
                />
              )
            })}
            {this.renderField({
              label: `12. Total number of Mongolian employees`,
              name: 'totalNumberOfMongolianEmployees',
              validator: (rule, value, callback) =>
                this.validateEmpsNum(value, callback, 'mongolEmps'),
              control: (
                <Input
                  onChange={e => this.handleEmpsNumChange(e, 'mongolEmps')}
                  type="number"
                />
              )
            })}
            {this.renderField({
              label: `13. Total number of Umnugovi employees`,
              name: 'totalNumberOfUmnugoviEmployees',
              validator: (rule, value, callback) =>
                this.validateEmpsNum(value, callback, 'umnugoviEmps'),
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

CompanyInfo.contextTypes = {
  formatMessage: PropTypes.func
};

const CompanyInfoForm = Form.create()(CompanyInfo);

export default withRouter(CompanyInfoForm);
