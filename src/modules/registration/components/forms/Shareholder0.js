import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Upload, InputNumber } from 'antd';

const FormItem = Form.Item;
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
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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

  componentDidMount() {
    this.add();
    this.props.form.setFieldsValue(this.props.data);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            {...formItemLayout}
            label={<strong>Shareholder {k}</strong>}
            colon={false}
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
            label="Name"
            required={false}
            hasFeedback
          >
            {getFieldDecorator(`name${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter a name.'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Job title"
            required={false}
            hasFeedback
          >
            {getFieldDecorator(`title${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter a title.'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Share percentage"
            required={false}
            hasFeedback
          >
            {getFieldDecorator(`share${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  message: 'Please enter share'
                }
              ]
            })(<InputNumber placeholder="%" />)}
          </FormItem>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="20. Please provide key shareholders information"
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
                required: true,
                message: 'Please upload your key shareholders information!'
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
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
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

const ShareholderForm = Form.create()(DynamicFieldSet);

export default withRouter(ShareholderForm);
