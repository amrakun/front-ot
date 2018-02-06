import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { defineMessages } from 'react-intl';

class Field extends React.Component {
  /*
   * For example: Select is accepting only string value, So we are
   * converting boolean, number to string
   */

  normFile(e, multiple) {
    if (e && e.fileList.length > 0) {
      if (multiple)
        return e.fileList.map(f => ({ name: f.name, url: f.response }));
      else return [{ name: e.file.name, url: e.file.response }];
    }
  }

  cleanInitialValue() {
    const { control, initialValue, dataType } = this.props;
    const controlProps = control.props;

    if (initialValue === null || initialValue === undefined) return null;

    if (dataType === 'file' || dataType === 'file-multiple') {
      //file upload
      if (Array.isArray(initialValue)) {
        return initialValue.map((f, i) => ({
          uid: i,
          name: f.name,
          url: f.url
        }));
      }
      return [{ uid: 1, name: initialValue.name, url: initialValue.url }];
    }

    if (
      controlProps.prefixCls !== 'ant-select' ||
      controlProps.dropdownClassName === 'ant-select-tree-dropdown'
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
    controlType
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
      help
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

    let args = {
      initialValue: this.cleanInitialValue(),
      rules
    };

    if (control.props.prefixCls === 'ant-checkbox')
      args.valuePropName = 'checked';

    if (dataType === 'file' || dataType === 'file-multiple') {
      //file upload
      args.getValueFromEvent = e => this.normFile(e, dataType !== 'file');
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
      controlType
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
  help: PropTypes.string
};

Field.contextTypes = {
  form: PropTypes.object,
  formatMessage: PropTypes.func
};

export default Field;
