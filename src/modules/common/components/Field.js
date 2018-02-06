import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

export default class Field extends React.Component {
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
      rules = [],
      dataType,
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

    return (
      <Form.Item
        {...layout}
        label={label}
        extra={description}
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
  form: PropTypes.object
};
