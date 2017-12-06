import React from 'react';
import PropTypes from 'prop-types';
import { Select, AutoComplete, Form, Button } from 'antd';

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);

    // field names
    this.fieldDefs = [];
  }

  save() {
    const { getFieldValue } = this.props.form;
    const doc = {};

    this.fieldDefs.forEach(({ name, dataType }) => {
      doc[name] = getFieldValue(name);

      if (dataType === 'boolean') {
        doc[name] = doc[name] === 'true' ? true : false;
      }

      if (dataType === 'number') {
        doc[name] = Number(doc[name]);
      }
    });

    return this.props.save(doc);
  }

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

  renderAutoCompleteOptions(options) {
    return options.map(website => (
      <AutoComplete.Option key={website}>{website}</AutoComplete.Option>
    ));
  }

  renderOptions(options) {
    return options.map((option, i) => (
      <Select.Option key={i} value={option.value}>
        {option.text}
      </Select.Option>
    ));
  }

  renderField(definations) {
    const {
      label,
      description = '',
      name,
      control,
      optional,
      validation,
      isVisible = true,
      hasFeedback = true,
      dataType = 'string',
      layout
    } = definations;

    const controlType = control.type.name;

    // collect field definations to use in save
    this.fieldDefs.push({ name, dataType });

    const { data, form } = this.props;
    const { getFieldDecorator } = form;

    let initialValue =
      data && typeof data[name] !== 'undefined' ? data[name] : '';

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

  renderSubmit() {
    return (
      <Form.Item {...this.tailFormItemLayout()}>
        <Button type="primary" htmlType="submit" onClick={this.save}>
          Save & continue
        </Button>
      </Form.Item>
    );
  }
}

BaseForm.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object,
  save: PropTypes.func
};
