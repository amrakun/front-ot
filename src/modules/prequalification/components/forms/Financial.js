import React from 'react'
import {withRouter} from 'react-router'
import { Form, Select, Button, Row, Col, DatePicker, Input } from 'antd';
import { yearData } from '../../constants'

const FormItem = Form.Item;
const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
    const yearOptions = yearData.map((el, i) => <Option key={i}>{el}</Option>);

    return (
      <Form onSubmit={this.handleSubmit} className="preq-form">
        <FormItem
          label="Pre-tax profit"
          {...formItemLayout}
        >
          <Col span={12}>
            <FormItem>
              <Select>
                {yearOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
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
