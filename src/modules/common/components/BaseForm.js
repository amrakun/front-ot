import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, Button } from 'antd';
import Field from './Field';

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);

    // field names
    this.fieldDefs = [];
  }

  getChildContext() {
    return {
      form: this.props.form
    };
  }

  filterOption(input, option) {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }

  save(extra = {}, lastTab = false) {
    this.props.form.validateFieldsAndScroll(err => {
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

      if (!err) {
        if (this.props.nextTab && !lastTab) this.props.nextTab();

        return this.props.save(doc);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  saveDirect(doc, lastTab = false) {
    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        if (this.props.nextTab && !lastTab) this.props.nextTab();

        return this.props.save(doc);
      }
    });
  }

  getFieldValue(name, dataType) {
    const { getFieldValue } = this.props.form;

    let value = getFieldValue(name);

    if (dataType === 'boolean') {
      value = value === 'true';
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
    if (dataType === 'file') {
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
      if (!this[fileKey]) {
        this[fileKey] = initialValue || data[name];
      }

      definations.getFieldValue = this.getFieldValue;
    }

    definations.initialValue = initialValue || data[name];

    return <Field {...definations} />;
  }

  renderSubmit(
    text = 'Save & continue',
    onClick = this.handleSubmit,
    secondary
  ) {
    return (
      <Button
        style={{ float: 'right' }}
        type={secondary ? '' : 'primary'}
        htmlType="submit"
        onClick={onClick}
      >
        {text}
        {secondary || <Icon type="right" />}
      </Button>
    );
  }

  renderGoBack() {
    return (
      <Button onClick={this.props.previousTab}>
        <Icon type="left" />Back
      </Button>
    );
  }
}

BaseForm.childContextTypes = {
  form: PropTypes.object
};

BaseForm.propTypes = {
  form: PropTypes.object,
  data: PropTypes.any,
  save: PropTypes.func,
  nextTab: PropTypes.func,
  previousTab: PropTypes.func
};
