import React from 'react';
import PropTypes from 'prop-types';
import { Select, AutoComplete, Form, Button } from 'antd';
import Field from './Field';

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // field names
    this.fieldDefs = [];
  }

  getChildContext() {
    return {
      form: this.props.form
    };
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

  save(extra = {}) {
    let doc = {};

    this.fieldDefs.forEach(({ name, dataType }) => {
      doc[name] = this.getFieldValue(name, dataType);
    });

    if (extra) {
      doc = {
        ...doc,
        ...extra
      };
    }

    return this.props.save(doc);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  getFieldValue(name, dataType) {
    const { getFieldValue } = this.props.form;

    let value = getFieldValue(name);

    if (dataType === 'boolean') {
      value = value === 'true' ? true : false;
    }

    if (dataType === 'number') {
      value = Number(value);
    }

    // we are saving file uploader's result to this class directly in
    // renderField
    if (dataType === 'file') {
      value = this[`file_${name}`];
    }

    return value;
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
    const { initialValue, name, control, dataType = 'string' } = definations;

    // collect field definations to use in save
    this.fieldDefs.push({ name, dataType });

    const { data } = this.props;

    // file upload field
    if (control.type.name === 'Uploader') {
      const fileKey = `file_${name}`;

      // receive files event ==============
      let handler = file => {
        let value = { name: file.name, url: file.response };

        if (file.status === 'removed') {
          value = null;
        }

        this[fileKey] = value;
      };

      // receive files with multiple option
      if (control.props.multiple) {
        handler = (file, files) => {
          this[fileKey] = files.map(f => ({ name: f.name, url: f.response }));
        };
      }

      // event binding
      this[`${name}Upload`] = handler.bind(this);

      // set initial value. for file fields we will get it's value from
      // class directly later in getFieldValue
      this[fileKey] = initialValue || data[name];
    }

    definations.initialValue = initialValue || data[name];

    return <Field {...definations} />;
  }

  renderSubmit(text = 'Save & continue', onClick = this.handleSubmit) {
    return (
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick}>
          {text}
        </Button>
      </Form.Item>
    );
  }
}

BaseForm.childContextTypes = {
  form: PropTypes.object
};

BaseForm.propTypes = {
  form: PropTypes.object,
  data: PropTypes.any,
  save: PropTypes.func
};
