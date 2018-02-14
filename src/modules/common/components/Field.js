import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { defineMessages } from 'react-intl';

const requireMessages = defineMessages({
  field: {
    id: 'fieldRequire',
    defaultMessage: 'This field is required!'
  },
  email: {
    id: 'emailRequire',
    defaultMessage: 'The input is not valid E-mail!'
  }
});

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

  setName(prefix, suffix, name) {
    if (prefix) {
      return name.replace(prefix, 'common');
    }
    if (suffix || suffix === 0) {
      return name.replace(suffix, 'Common');
    }
    return name;
  }

  getTranslation(
    prefix,
    suffix,
    name,
    label,
    description,
    attachmentType,
    dataType,
    controlType,
    messageId
  ) {
    const { formatMessage } = this.context;
    let commonName = this.setName(prefix, suffix, name);

    if (attachmentType) {
      commonName += attachmentType;
    }

    if (commonName.includes('File') && dataType === 'file') {
      commonName = 'file';
    }

    if (controlType === 'textarea') {
      commonName = 'textarea';
      label = label || 'Provide details';
    }

    commonName = messageId || commonName;

    const messages = defineMessages({
      label: {
        id: commonName,
        defaultMessage: label
      },
      extra: {
        id: commonName + 'Desc',
        defaultMessage: description
      }
    });

    const val = label ? formatMessage(messages.label) : '';
    const extra = description ? formatMessage(messages.extra) : description;

    return { val, extra };
  }

  render() {
    const {
      label,
      description = '',
      name,
      prefix,
      control,
      optional,
      validation,
      isVisible = true,
      hasFeedback = true,
      layout,
      suffix,
      attachmentType,
      rules = [],
      dataType,
      controlType,
      validateStatus,
      help,
      validator,
      messageId
    } = this.props;

    const { form, formatMessage } = this.context;
    const { getFieldDecorator } = form;
    const { field, email } = requireMessages;

    if (!optional) {
      rules.push({
        required: true,
        message: formatMessage(field)
      });
    }

    if (validation === 'email') {
      rules.push({
        type: 'email',
        message: formatMessage(email)
      });
    }

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

    const { val, extra } = this.getTranslation(
      prefix,
      suffix,
      name,
      label,
      description,
      attachmentType,
      dataType,
      controlType,
      messageId
    );

    return (
      <Form.Item
        {...layout}
        label={val}
        extra={extra}
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
  formatMessage: PropTypes.func
};
