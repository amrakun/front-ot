import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, Button } from 'antd';
import Field from './Field';
import { T } from 'modules/common/components';

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
      if (!err) {
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

    if (dataType === 'file') {
      value ? (value = value[0]) : (value = null);
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
    const { initialValue, name, dataType = 'string' } = definations;

    // collect field definations to use in save
    this.fieldDefs.push({ name, dataType });

    const data = this.props.data || {};

    definations.initialValue = initialValue || data[name];

    return <Field {...definations} />;
  }

  renderSubmit(text = 'Save & continue', onClick = this.handleSubmit) {
    return (
      <Button
        style={{ float: 'right', marginLeft: '8px' }}
        type="primary"
        htmlType="submit"
        onClick={onClick}
      >
        <T id="saveContinue">{text}</T>
        <Icon type="right" />
      </Button>
    );
  }

  renderGoBack() {
    return (
      <Button onClick={this.props.previousTab}>
        <Icon type="left" />
        <T id="back">Back</T>
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
