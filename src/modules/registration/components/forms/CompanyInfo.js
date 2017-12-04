import React from 'react';
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
  aimagData
} from '../../constants';
// import { Countries } from '../../../common/components'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    lg: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 8
    },
    lg: {
      span: 14,
      offset: 8
    }
  }
};

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    isSoumVisible: false,
    isAimagVisible: false,
    isChineseVisible: false,
    loading: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net', '.mn'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  handleCountryChange(value) {
    const form = this.props.form;
    let showOrHide;
    if (value === '0') {
      //mongolia
      showOrHide = {
        isAimagVisible: true,
        isChineseVisible: false,
        isSoumVisible: false
      };
      form.setFieldsValue({ isChinese: '' });
    } else if (value === '1') {
      //china
      showOrHide = {
        isAimagVisible: false,
        isChineseVisible: true,
        isSoumVisible: false
      };
      form.setFieldsValue({ registeredInAimag: '', registeredInSum: '' });
    } else {
      showOrHide = {
        isAimagVisible: false,
        isChineseVisible: false,
        isSoumVisible: false
      };
      form.setFieldsValue({
        registeredInAimag: '',
        registeredInSum: '',
        isChinese: ''
      });
    }

    this.setState(showOrHide);
  }
  handleAimagChange(value) {
    let showOrHide = { isSoumVisible: false };
    if (value === '0')
      //umnugovi
      showOrHide = { isSoumVisible: true };

    this.setState(showOrHide);
  }
  componentDidMount() {
    const data = this.props.data;
    this.handleCountryChange(data.registeredInCountry);
    this.handleAimagChange(data.registeredInAimag);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const data = this.props.data || {};

    const {
      autoCompleteResult,
      isSoumVisible,
      isAimagVisible,
      isChineseVisible
    } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    const structureOptions = structureData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const foreignPercentageOptions = foreignPercentageData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const booleanOptions = booleanData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const aimagOptions = aimagData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const soumOptions = soumData.map((el, i) => <Option key={i}>{el}</Option>);
    const countryOptions = countryData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));

    return (
      <Spin spinning={this.state.loading} delay={500}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Are you an existing supplier?"
            hasFeedback
          >
            {getFieldDecorator('isRegisteredOnSup', {
              initialValue: data.isRegisteredOnSup ? '0' : '1',
              rules: [
                {
                  required: true,
                  message: 'Please select an option!'
                }
              ]
            })(<Select>{booleanOptions}</Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="1. Company name (in English)"
            hasFeedback
          >
            {getFieldDecorator('enName', {
              initialValue: data.enName ? data.enName : '',
              rules: [
                {
                  required: true,
                  message: 'Please enter your company name!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Company name (in Mongolian)"
            hasFeedback
          >
            {getFieldDecorator('mnName', {
              initialValue: data.mnName ? data.mnName : '',
              rules: [
                {
                  required: true,
                  message: 'Please enter your company name!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="2. Address" hasFeedback>
            {getFieldDecorator('address', {
              initialValue: data.address ? data.address : '',
              rules: [
                {
                  required: true,
                  message: 'Please enter your address!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Address 2" hasFeedback>
            {getFieldDecorator('address2', {
              initialValue: data.address2 ? data.address2 : ''
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Address 3" hasFeedback>
            {getFieldDecorator('address3', {
              initialValue: data.address3 ? data.address3 : ''
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Town or city" hasFeedback>
            {getFieldDecorator('townOrCity', {
              initialValue: data.townOrCity ? data.townOrCity : '',
              rules: [
                {
                  required: true,
                  message: 'Please enter your town/city!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="County/state/province"
            hasFeedback
          >
            {getFieldDecorator('province', {
              initialValue: data.provice ? data.provice : '',
              rules: [
                {
                  required: true,
                  message: 'Please enter your country/state/province!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Postcode or zipcode" hasFeedback>
            {getFieldDecorator('zipCode', {
              initialValue: data.zipCode ? data.zipCode : ''
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Country" hasFeedback>
            {getFieldDecorator('country', {
              initialValue: data.country ? data.country : '',
              rules: [
                { required: true, message: 'Please select your country!' }
              ]
            })(<Select>{countryOptions}</Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="3. Country you are registered in"
            hasFeedback
          >
            {getFieldDecorator('registeredInCountry', {
              initialValue: data.registeredInCountry
                ? data.registeredInCountry
                : '',
              rules: [
                {
                  required: true,
                  message: 'Please select your country registered in!'
                }
              ]
            })(
              <Select
                placeholder="Please select a country"
                onChange={value => this.handleCountryChange(value)}
              >
                {countryOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="3. Aimag you are registered in"
            hasFeedback
            style={isAimagVisible ? {} : { display: 'none' }}
          >
            {getFieldDecorator('registeredInAimag', {
              initialValue: data.registeredInAimag
                ? data.registeredInAimag
                : '',
              rules: [
                {
                  required: isAimagVisible,
                  message: 'Please select an aimag!'
                }
              ]
            })(
              <Select
                placeholder="Please select an aimag"
                onChange={value => this.handleAimagChange(value)}
              >
                {aimagOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="3. Soum you are registered in"
            hasFeedback
            style={isSoumVisible ? {} : { display: 'none' }}
          >
            {getFieldDecorator('registeredInSum', {
              initialValue: data.registeredInSum ? data.registeredInSum : '',
              rules: [
                {
                  required: isSoumVisible,
                  message: 'Please select a soum!'
                }
              ]
            })(
              <Select placeholder="Please select a soum">{soumOptions}</Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Are you Chinese state owned entity?"
            hasFeedback
            style={isChineseVisible ? {} : { display: 'none' }}
          >
            {getFieldDecorator('isChinese', {
              initialValue: data.isChinese ? data.isChinese : '',
              rules: [
                {
                  required: isChineseVisible,
                  message: 'Please select your country!'
                }
              ]
            })(<Select>{booleanOptions}</Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="4. Does your company, parent company or any sub-contractor is
                  registered in any of the following countries to which
                  international trade sanctions apply"
            hasFeedback
            extra="Belarus,
                    Burundi,
                    Central African Republic,
                    Cuba,
                    Democratic Republic of Congo,
                    Iran,
                    Iraq,
                    Lebanon,
                    Libya,
                    North Korea,
                    Somalia,
                    Sudan,
                    Syria,
                    Ukraine/Russia,
                    Venezuela,
                    Yemen and
                    Zimbabwe."
          >
            {getFieldDecorator('isSubContractor', {
              initialValue: data.isSubContractor ? '0' : '1',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(
              <Select placeholder="Please select an option">
                {booleanOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="5. Please select the corporate structure that most closely
                  matches your company"
            hasFeedback
          >
            {getFieldDecorator('corporateStructure', {
              initialValue: data.corporateStructure
                ? data.corporateStructure
                : '',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(
              <Select placeholder="Please select an option">
                {structureOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="6. Company registration number"
            hasFeedback
          >
            {getFieldDecorator('registrationNumber', {
              initialValue: data.registrationNumber
                ? data.registrationNumber
                : '',
              rules: [
                {
                  required: true,
                  message: 'Please input your company registration number!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="7. Certificate of registration"
            extra="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
                 PDF files. Files that have the ability to contain macros or other
                 types of active code are not acceptable. Maximum file size is
                 30mb."
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: false,
                  message: 'Please input your company registration sertificate!'
                }
              ]
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="8. Company website" hasFeedback>
            {getFieldDecorator('website', {
              initialValue: data.website ? data.website : ''
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                9. Company e-mail&nbsp;
                <Tooltip title="generic shared email zaaval oruulah buguud, OT hudaldan
                    avaltiin gazraas zarlagdaj baigaa Oroltsoh sonirhol huleen avah
                    bolon busad megdel zuvhun ug email hayagaar yavuulah bolohiig
                    anhaarna uu.Huviin email oruulsnaas uuden Eoi huleen avaagui
                    hariutslagiig OT huleehgui bolohiig anhaarna uu">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('email', {
              initialValue: data.email ? data.email : '',
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your company e-mail!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="10. Please indicate what percentage of company is owned by
                  foreign entity"
            hasFeedback
          >
            {getFieldDecorator('foreignOwnershipPercentage', {
              initialValue: data.foreignOwnershipPercentage
                ? data.foreignOwnershipPercentage
                : '',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(
              <Select placeholder="Please select an option">
                {foreignPercentageOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="11. Total number of employees"
            hasFeedback
          >
            {getFieldDecorator('totalIntOfEmployees', {
              initialValue: data.totalIntOfEmployees
                ? data.totalIntOfEmployees
                : '',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(<InputNumber htmlType="number" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="12. Total number of Mongolian employees"
            hasFeedback
          >
            {getFieldDecorator('totalIntOfMongolianEmployees', {
              initialValue: data.totalIntOfMongolianEmployees
                ? data.totalIntOfMongolianEmployees
                : '',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(<InputNumber htmlType="number" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="12. Total number of Umnugovi employees"
            hasFeedback
          >
            {getFieldDecorator('totalIntOfUmnugoviEmployees', {
              initialValue: data.totalIntOfUmnugoviEmployees
                ? data.totalIntOfUmnugoviEmployees
                : '',
              rules: [{ required: true, message: 'Please select an option!' }]
            })(<InputNumber htmlType="number" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save & continue
            </Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

const CompanyInfoForm = Form.create()(RegistrationForm);

export default withRouter(CompanyInfoForm);
