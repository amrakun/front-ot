import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

export default class Field extends React.Component {
  /*
   * For example: Select is accepting only string value, So we are
   * converting boolean, number to string
   */
  cleanInitialValue() {
    const { control, initialValue } = this.props;

    const controlType = control.props.prefixCls;

    if (controlType !== 'ant-select') {
      return initialValue;
    }

    if (control.props.mode === 'multiple') {
      return initialValue || [];
    }

    if (typeof initialValue !== 'undefined' && initialValue !== null) {
      return initialValue.toString();
    }

    return '';
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
      layout,
      rules = []
    } = this.props;

    const { form } = this.context;
    const { getFieldDecorator } = form;

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
        {...layout}
        label={label}
        extra={description}
        style={isVisible ? {} : { display: 'none' }}
        hasFeedback={hasFeedback}
      >
        {getFieldDecorator(name, {
          initialValue: this.cleanInitialValue(),
          rules
        })(control)}
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
  layout: PropTypes.object,
  rules: PropTypes.array
};

Field.contextTypes = {
  form: PropTypes.object
};
