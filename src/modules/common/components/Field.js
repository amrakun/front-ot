import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

export default class Field extends React.Component {
  formItemLayout() {
    return {
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
  }

  tailFormItemLayout() {
    return {
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
  }

  render() {
    const {
      label,
      description = '',
      name,
      control,
      optional,
      validation,
      isVisible = true,
      hasFeedback = true,
      layout
    } = this.props;

    const { form } = this.context;

    let { initialValue } = this.props;

    const controlType = control.type.name;

    const { getFieldDecorator } = form;

    if (controlType === 'Select') {
      initialValue = initialValue.toString();
    }

    let rules = [];

    if (!optional) {
      rules.push({
        required: true,
        message: 'This field is required!'
      });
    }

    if (validation === 'email') {
      rules.push({
        type: 'email',
        message: 'The input is not valid E-mail!'
      });
    }

    return (
      <Form.Item
        {...this.formItemLayout()}
        {...layout}
        label={label}
        extra={description}
        style={isVisible ? {} : { display: 'none' }}
        hasFeedback={hasFeedback}
      >
        {getFieldDecorator(name, { initialValue, rules })(control)}
      </Form.Item>
    );
  }
}

Field.propTypes = {
  label: PropTypes.any,
  description: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.node,
  optional: PropTypes.bool,
  validation: PropTypes.string,
  isVisible: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  initialValue: PropTypes.any,
  layout: PropTypes.object
};

Field.contextTypes = {
  form: PropTypes.object
};
