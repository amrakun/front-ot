import React from 'react'
import {withRouter} from 'react-router'
import { Form, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
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
      offset: 5,
    },
  },
};

class PrequalificationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Product code"
          hasFeedback
        >
          {getFieldDecorator('products', {
            rules: [
              { required: true, message: 'Please select an option!' },
            ],
          })(
            <Select
              mode="multiple"
              placeholder="Please select products"
            >
              {children}
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

const FinancialForm = Form.create()(PrequalificationForm);

export default withRouter(FinancialForm);
