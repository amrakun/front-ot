import React from 'react'
import {withRouter} from 'react-router'
import { Form, Input, Icon, Button, Upload } from 'antd';

const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  componentDidMount() {
    this.add()
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 8 },
        lg: { span: 8, offset: 8 }
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            {...formItemLayout}
            label={`Shareholder ${k}`}
          >
            {k > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Name'
            required={false}

          >
            {getFieldDecorator(`shareholder_name_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Job title'
            required={false}
          >
            {getFieldDecorator(`shareholder_title_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Share percentage'
            required={false}
          >
            {getFieldDecorator(`shareholder_share_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
            )}
          </FormItem>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
         {...formItemLayout}
         label="20. Please provide key shareholders information"
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
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add shareholder
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Save & continue</Button>
        </FormItem>
      </Form>
    );
  }
}

const ShareholderForm = Form.create()(DynamicFieldSet);

export default withRouter(ShareholderForm);
