import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const regexNotEnglish = /[^a-zA-Z 0-9$&+,:;=?@#|'<>.^*()%!-]+?/;
const regexNotCyrillic = /[^\u0400-\u04FF 0-9$&+,:;=?@#|'<>.^*()%!-]+?/;

export default class Field extends React.Component {
  /*
   * For example: Select is accepting only string value, So we are
   * converting boolean, number to string
   */

  constructor(props, context) {
    super(props, context);
    const {
      description = '',
      control,
      optional,
      labelIgnoreIndex,
      labelIndex,
      validation,
      rules = [],
      dataType,
      validator,
      canBeCryllic = true
    } = props;

    const { __, locale, currentUser } = context;

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

    if (currentUser && control.props.prefixCls === 'ant-input') {
      if (canBeCryllic && locale === 'mn') {
        rules.push({ validator: this.validateCryllic });
      }

      if (!canBeCryllic) {
        rules.push({ validator: this.validateEnglish });
      }
    }

    if (validator) {
      rules.push({ validator });
    }

    // define args
    this.args = {
      initialValue: this.cleanInitialValue(),
      rules
    };

    if (control.props.prefixCls === 'ant-checkbox')
      this.args.valuePropName = 'checked';

    if (dataType === 'file' || dataType === 'file-multiple') {
      this.args.valuePropName = 'defaultFileList';
    }

    // define label
    let { label } = props;

    if (label && typeof label !== 'object') {
      if (labelIgnoreIndex) {
        label = label.replace(/[0-9]/g, '');
        label = __(label) + ' ' + labelIndex;
      } else {
        label = __(label);
      }
    }

    this.label = label;

    this.description = description ? __(description) : description;
  }

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

  validateCryllic(rules, value, callback) {
    if (!value) {
      return callback();
    }
    if (regexNotCyrillic.test(value)) {
      callback('Зөвхөн кирилл үсгээр бичнэ үү');
    } else {
      callback();
    }
  }

  validateEnglish(rules, value, callback) {
    if (!value) {
      return callback();
    }
    if (regexNotEnglish.test(value)) {
      callback('Зөвхөн англиар бичнэ үү');
    } else {
      callback();
    }
  }

  render() {
    const {
      layout,
      isVisible = true,
      hasFeedback = true,
      validateStatus,
      help,
      name,
      control
    } = this.props;

    const { form } = this.context;
    const { getFieldDecorator } = form;

    return (
      <Form.Item
        {...layout}
        label={this.label}
        colon={false}
        extra={this.description}
        style={isVisible ? {} : { display: 'none' }}
        hasFeedback={hasFeedback}
        validateStatus={validateStatus}
        help={help}
      >
        {getFieldDecorator(name, this.args)(control)}
      </Form.Item>
    );
  }
}

Field.propTypes = {
  label: PropTypes.any,
  labelIgnoreIndex: PropTypes.bool,
  labelIndex: PropTypes.string,
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
  validator: PropTypes.func,
  canBeCryllic: PropTypes.bool
};

Field.contextTypes = {
  form: PropTypes.object,
  __: PropTypes.func,
  currentUser: PropTypes.object,
  locale: PropTypes.string
};
