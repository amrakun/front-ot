import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Button } from 'antd';
import { booleanData } from '../constants';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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
      offset: 12
    },
    lg: {
      span: 14,
      offset: 10
    }
  }
};
const booleanOptions = booleanData.map((el, i) => (
  <Option key={i}>{el}</Option>
));

class PrequalificationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  renderBooleanItem(id, label, extra) {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={label} hasFeedback extra={extra}>
        {getFieldDecorator(`${id}`, {
          rules: [
            {
              required: true,
              message: 'Please select one'
            }
          ]
        })(<Select placeholder="Select one">{booleanOptions}</Select>)}
      </FormItem>
    );
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.data);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderBooleanItem(
          'system',
          'Does the organisation have a Health Safety & Environment management system?',
          ''
        )}
        {this.renderBooleanItem(
          'identified',
          'Are HSE resources, roles, responsibilities and authority levels clearly identified and defined within your Organisation?',
          'Staff includes all employees and sub-contractors.'
        )}
        {this.renderBooleanItem(
          'training',
          'Does your company have a documented process to ensure all staff receive health and safety training and induction?',
          ''
        )}
        {this.renderBooleanItem(
          'PPE',
          'Are all employees under your control required to utilise appropriate Personal Protective Equipment (PPE) at all times?',
          ''
        )}
        {this.renderBooleanItem(
          'riskAssess',
          'Does the company have a documented process or guidelines for risk assessment (including CRM)?',
          ''
        )}
        {this.renderBooleanItem(
          'incident',
          'Does the company have a documented process for incident investigation?',
          ''
        )}
        {this.renderBooleanItem(
          'FFW',
          'Does your company have a documented Fitness for Work (FFW) policy?',
          'The Fitness for Work (FFW) policy should incorporate alcohol, fatigue and general fitness for work.'
        )}
        {this.renderBooleanItem(
          'comply',
          ' Is your company willing to comply with Oyu Tolgoi/RT HSE management system?',
          ''
        )}
        {/* TODO: multiple project-specific inputs */}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
