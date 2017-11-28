import React from 'react'
import {withRouter} from 'react-router'
import { Form, Input, Tooltip, Icon, Select,
  Button, AutoComplete, Upload } from 'antd';
import { Countries } from '../../../common/components'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    lg: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 8,
    },
    lg: {
      span: 14,
      offset: 8,
    },
  },
};

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  handleShowChange(value, target) {
    console.log(target);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const {
      isExisting,
      companyName,
      address,
      address2,
      address3,
      city,
      state,
      zipcode,
      country,
      countryRegistered,
      aimag,
      soum,
      isChinese,
      sactionsCountry,
      structure,
      registrationNumber,
      website,
      email,
      foreignPercentage,
      employees,
      employeesMongolian,
      employeesUmnugovi,
    } = this.props.data;

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Are you an existing supplier?"
          hasFeedback
        >
          {getFieldDecorator('isExisting', {
            initialValue: isExisting,
            rules: [{
              required: true,
              message: 'Please select an option!'
            }],
          })(
            <Select name="companyIsExisting">
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="1. Company name"
          hasFeedback
        >
          {getFieldDecorator('companyName', {
            initialValue: companyName,
            rules: [{
              required: true,
              message: 'Please enter your company name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="2. Address"
          hasFeedback
        >
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [{
              required: true, message: 'Please enter your address!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address 2"
          hasFeedback
        >
          {getFieldDecorator('address2', {
            initialValue: address2,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address 3"
          hasFeedback
        >
          {getFieldDecorator('address3', {
            initialValue: address3,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Town or city"
          hasFeedback
        >
          {getFieldDecorator('city', {
            initialValue: city,
            rules: [{
              required: true, message: 'Please enter your town/city!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="County/state/province"
          hasFeedback
        >
          {getFieldDecorator('state', {
            initialValue: state,
            rules: [{
              required: true,
              message: 'Please enter your country/state/province!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Postcode or zipcode"
          hasFeedback
        >
          {getFieldDecorator('zipcode', {
            initialValue: zipcode,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Country"
          hasFeedback
        >
          {getFieldDecorator('country', {
            initialValue: country,
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Countries />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="3. Country you are registered in"
          hasFeedback
        >
          {getFieldDecorator('countryRegistered', {
            initialValue: countryRegistered,
            rules: [{
                required: true,
                message: 'Please select your country registered in!'
              },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="mongolia">Mongolia</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="3. Aimag you are registered in"
          hasFeedback
        >
          {getFieldDecorator('aimag', {
            initialValue: aimag,
            rules: [{
                required: true,
                message: 'Please select an aimag!'
              },
            ],
          })(
            <Select placeholder="Please select an aimag" onChange={(value) => this.handleShowChange(value, 'soum')}>
              <Option value="0">Umnugovi</Option>
              <Option value="1">Khovd</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="3. Soum you are registered in"
          hasFeedback
        >
          {getFieldDecorator('soum', {
            initialValue: soum,
            rules: [{
                required: true,
                message: 'Please select a soum!'
              },
            ],
          })(
            <Select placeholder="Please select a soum">
              <Option value="0">Dalanzadgad</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Are you Chinese state owned entity?"
          hasFeedback
        >
          {getFieldDecorator('isChinese', {
            initialValue: isChinese,
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select>
              <Option value="0">Yes</Option>
              <Option value="1">No</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="4. Does your company, parent company or any sub-contractor is
                registered in any of the following countries to which
                international trade sanctions apply"
          hasFeedback
        >
          {getFieldDecorator('sactionsCountry', {
            initialValue: sactionsCountry,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="5. Please select the corporate structure that most closely
                matches your company"
          hasFeedback
        >
          {getFieldDecorator('structure', {
            initialValue: structure,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              6. Company registration number&nbsp;
              <Tooltip title="Company's registration number">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('registrationNumber', {
            initialValue: registrationNumber,
            rules: [{
              required: true,
              message: 'Please input your company registration number!',
              whitespace: true
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label="7. Certificate of registration"
         extra='You may upload "jpg,jpeg,png,rtf,pdf" files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb.'
        >
         {getFieldDecorator('upload', {
           valuePropName: 'fileList',
           getValueFromEvent: this.normFile,
           rules: [{
             required: true,
             message: 'Please input your company registration sertificate!'
           }],
         })(
           <Upload name="logo" action="/upload.do" listType="picture">
             <Button>
               <Icon type="upload" /> Click to upload
             </Button>
           </Upload>
         )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="8. Company website"
          hasFeedback
        >
          {getFieldDecorator('website', {
            initialValue: website,
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
          label="9. Company e-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your company e-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="10. Please indicate what percentage of company is owned by
                foreign entity"
          hasFeedback
        >
          {getFieldDecorator('foreignPercentage', {
            initialValue: foreignPercentage,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="11. Total number of employees"
          hasFeedback
        >
          {getFieldDecorator('employees', {
            initialValue: employees,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="12. Total number of Mongolian employees"
          hasFeedback
        >
          {getFieldDecorator('employeesMongolian', {
            initialValue: employeesMongolian,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="12. Total number of Umnugovi employees"
          hasFeedback
        >
          {getFieldDecorator('employeesUmnugovi', {
            initialValue: employeesUmnugovi,
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select placeholder="Please select an option">
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save & continue</Button>
        </FormItem>
      </Form>
    );
  }
}

const CompanyInfoForm = Form.create()(RegistrationForm);

export default withRouter(CompanyInfoForm);
