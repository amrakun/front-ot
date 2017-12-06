import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Upload, Select } from 'antd';
import { booleanData, groupTypeData, countryData } from '../constants';

const FormItem = Form.Item;
const Option = Select.Option;
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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 14, offset: 8 },
    lg: { span: 8, offset: 8 }
  }
};

let uuid = 0;
class DynamicFieldSet extends React.Component {
  state = {
    hasParent: false
  };
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleParentChange = value => {
    let hasParent = { hasParent: false };
    if (value === '0') hasParent = { hasParent: true };

    this.props.form.setFieldsValue({
      parentName: '',
      parentRegNum: '',
      parentAddress: ''
    });
    this.setState(hasParent);
  };

  componentDidMount() {
    this.add();
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const booleanOptions = booleanData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const groupTypeOptions = groupTypeData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const countryOptions = countryData.map((el, i) => (
      <Option key={i}>{el}</Option>
    ));
    const hasParent = this.state.hasParent;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem {...formItemLayout} label={`Shareholder ${k}`}>
            {k > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
          <FormItem {...formItemLayout} label="Name" required={false}>
            {getFieldDecorator(`shareholder_name_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field."
                }
              ]
            })(
              <Input
                placeholder="passenger name"
                style={{ width: '60%', marginRight: 8 }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Job title" required={false}>
            {getFieldDecorator(`shareholder_title_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field."
                }
              ]
            })(
              <Input
                placeholder="passenger name"
                style={{ width: '60%', marginRight: 8 }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Share percentage"
            required={false}
          >
            {getFieldDecorator(`shareholder_share_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field."
                }
              ]
            })(
              <Input
                placeholder="passenger name"
                style={{ width: '60%', marginRight: 8 }}
              />
            )}
          </FormItem>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>
          Please provide details of your Ultimate Parent Company or any
          associated companies if applicable.
        </label>
        <FormItem
          {...formItemLayout}
          label="22. Do you have an Ultimate Parent Company?"
          hasFeedback
        >
          {getFieldDecorator('parent', {
            rules: [
              {
                required: true,
                message: 'Please select an option!'
              }
            ]
          })(
            <Select
              placeholder="Select one"
              onChange={value => this.handleParentChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Ultimate Parent Company name"
          hasFeedback
          style={hasParent ? {} : { display: 'none' }}
        >
          {getFieldDecorator('parentName', {
            rules: [
              {
                required: hasParent,
                message: 'Please enter your ultimate parent company name!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Ultimate Parent Company address"
          hasFeedback
          style={hasParent ? {} : { display: 'none' }}
        >
          {getFieldDecorator('parentAddress', {
            rules: [
              {
                required: hasParent,
                message: 'Please enter your ultime parent company address!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Registration number of Ultimate Parent Company"
          hasFeedback
          style={hasParent ? {} : { display: 'none' }}
        >
          {getFieldDecorator('parentRegNum', {
            rules: [
              {
                required: hasParent,
                message:
                  'Please enter your ultimate parent companys registration number!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="23. Are you a Manufacturer, Distributor or Stockist?"
          hasFeedback
        >
          {getFieldDecorator('parent', {
            rules: [
              {
                required: true,
                message: 'Please select an option!'
              }
            ]
          })(
            <Select
              placeholder="Select one"
              onChange={value => this.handleParentChange(value)}
            >
              {groupTypeOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Are you an exclusive distributor?"
          hasFeedback
        >
          {getFieldDecorator('parent', {
            rules: [
              {
                required: true,
                message: 'Please select an option!'
              }
            ]
          })(
            <Select
              placeholder="Select one"
              onChange={value => this.handleParentChange(value)}
            >
              {booleanOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Please list names of authorized distribution rights /EOM/"
          extra="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb."
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileRight',
            getValueFromEvent: this.normFile,
            rules: [
              {
                required: true,
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
        <FormItem
          {...formItemLayout}
          label=" "
          colon={false}
          extra="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb."
        >
          {getFieldDecorator('upload2', {
            valuePropName: 'fileRight',
            getValueFromEvent: this.normFile
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
          label=" "
          colon={false}
          extra="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
               PDF files. Files that have the ability to contain macros or other
               types of active code are not acceptable. Maximum file size is
               30mb."
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile
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
          label="Primary manufacturer name"
          hasFeedback
        >
          {getFieldDecorator('primaryManName', {
            rules: [
              {
                required: true,
                message: 'Please enter your primary manufacturer name!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Country of primary manufacture"
          hasFeedback
        >
          {getFieldDecorator('countryPrimary', {
            rules: [
              {
                required: true,
                message: 'Please select an option!'
              }
            ]
          })(<Select placeholder="Select one">{countryOptions}</Select>)}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add shareholder
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const GroupForm = Form.create()(DynamicFieldSet);

export default withRouter(GroupForm);
