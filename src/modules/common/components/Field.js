import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

export default class Field extends React.Component {
  /*
   * For example: Select is accepting only string value, So we are
   * converting boolean, number to string
   */

  cleanInitialValue() {
    const { control, initialValue, dataType } = this.props;
    const controlProps = control.props;

    if (initialValue === undefined || initialValue === null) return undefined;

    if (dataType === 'file' || dataType === 'file-multiple') {
      if (!Array.isArray(initialValue))
        return [{ uid: 1, name: initialValue.name, url: initialValue.url }];
      else return initialValue;
    }

    if (
      controlProps.prefixCls !== 'ant-select' ||
      controlProps.dropdownClassName === 'ant-select-tree-dropdown' ||
      dataType === 'file'
    ) {
      return initialValue;
    }

    if (controlProps.mode === 'multiple') {
      //multiple select
      return initialValue || [];
    }

    if (typeof initialValue !== 'undefined' && initialValue !== null) {
      return initialValue.toString();
    }

    return '';
  }

  validate(rules, value, callback) {
    console.log(value);
    callback('zail');
  }

  render() {
    const {
      description = '',
      name,
      control,
      optional,
      validation,
      isVisible = true,
      hasFeedback = true,
      layout,
      rules = [],
      dataType,
      validateStatus,
      help,
      validator
    } = this.props;
    let { label } = this.props;

    const { form, __ } = this.context;
    const { getFieldDecorator } = form;

    if (!optional) {
      rules.push({
        required: true,
        message: __('This field is required!')
      });
    }

    if (validation === 'email') {
      rules.push({
        type: 'email',
        message: __('The input is not valid E-mail!')
      });
    }

    // rules.push({
    //   validator: e => console.log(e)
    // })

    if (validator) {
      rules.push({ validator });
    }

    let args = {
      initialValue: this.cleanInitialValue(),
      rules
    };

    if (control.props.prefixCls === 'ant-checkbox')
      args.valuePropName = 'checked';

    if (dataType === 'file' || dataType === 'file-multiple') {
      args.valuePropName = 'defaultFileList';
    }

    if (label && typeof label !== 'object') {
      label = __(label);
    }

    const _description = description ? __(description) : description;

    return (
      <Form.Item
        {...layout}
        label={label}
        colon={false}
        extra={_description}
        style={isVisible ? {} : { display: 'none' }}
        hasFeedback={hasFeedback}
        validateStatus={validateStatus}
        help={help}
      >
        {getFieldDecorator(name, args)(control)}
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
  rules: PropTypes.array,
  getFieldValue: PropTypes.func,
  dataType: PropTypes.string,
  validateStatus: PropTypes.string,
  help: PropTypes.string,
  validator: PropTypes.func
};

Field.contextTypes = {
  form: PropTypes.object,
  __: PropTypes.func
};
