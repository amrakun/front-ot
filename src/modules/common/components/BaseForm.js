import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, Button } from 'antd';
import Field from './Field';

export default class BaseForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.save = this.save.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDraft = this.handleDraft.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.resetLocalStorage = this.resetLocalStorage.bind(this);

    // field names
    this.fieldDefs = [];
  }

  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  filterOption(input, option) {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  resetLocalStorage() {
    const { localStorageKey } = this.props;

    // reset local storage
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  }

  save(extra = {}, lastTab = false) {
    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        const doc = { ...this.getFormValues(), ...(extra || {}) };

        this.resetLocalStorage();

        if (this.props.nextTab && !lastTab) this.props.nextTab();

        return this.props.save(doc);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  handleDraft(e) {
    e.preventDefault();

    const { localStorageKey, nextTab } = this.props;

    const formData = this.getFormValues();

    localStorage.setItem(localStorageKey, JSON.stringify(formData));

    if (nextTab) {
      nextTab();
    }
  }

  saveDirect(doc, lastTab = false) {
    const { form, nextTab, save } = this.props;

    form.validateFieldsAndScroll(err => {
      if (!err) {
        this.resetLocalStorage();

        if (nextTab && !lastTab) {
          nextTab();
        }

        return save(doc);
      }
    });
  }

  getFormValues() {
    const doc = {};

    this.fieldDefs.forEach(({ name, dataType }) => {
      doc[name] = this.getFieldValue(name, dataType);
    });

    return doc;
  }

  getFieldValue(name, dataType) {
    const { getFieldValue } = this.props.form;

    let value = getFieldValue(name) || this.getFieldValueFromLocal(name);

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

  getFieldValueFromLocal(name) {
    const { localStorageKey } = this.props;

    const localValue = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

    return localValue[name];
  }

  renderOptions(options, noTranslate) {
    const { __ } = this.context;

    return options.map((option, i) => (
      <Select.Option key={i} value={option.value}>
        {noTranslate ? option.text : __(option.text)}
      </Select.Option>
    ));
  }

  renderField(definations) {
    const { initialValue, name, dataType = 'string', isVisible } = definations;

    // collect field definations to use in save
    this.fieldDefs.push({ name, dataType });

    const data = this.props.data || {};

    definations.initialValue = this.getFieldValueFromLocal(name);

    if (typeof definations.initialValue === 'undefined') {
      definations.initialValue = initialValue || data[name];
    }

    return <Field key={`${name}-${isVisible}`} {...definations} />;
  }

  renderSubmit(text = 'Save & continue', onClick = this.handleSubmit) {
    const { __ } = this.context;
    const { isSubmitDisabled } = this.props;

    return (
      <>
        <Button
          style={{ float: 'right', marginLeft: '8px' }}
          type="primary"
          htmlType="submit"
          disabled={isSubmitDisabled}
          onClick={onClick}
        >
          {__(text)}
          <Icon type="right" />
        </Button>

        {this.renderDraft()}
      </>
    );
  }

  renderDraft(text = 'Save & draft', onClick = this.handleDraft) {
    if (!this.props.localStorageKey) {
      return null;
    }

    const { __ } = this.context;

    return (
      <Button style={{ float: 'right', marginLeft: '8px' }} onClick={onClick}>
        {__(text)}
      </Button>
    );
  }

  renderGoBack() {
    const { __ } = this.context;

    return (
      <Button onClick={this.props.previousTab}>
        <Icon type="left" />
        {__('Back')}
      </Button>
    );
  }
}

BaseForm.childContextTypes = {
  form: PropTypes.object,
};

BaseForm.propTypes = {
  isSubmitDisabled: PropTypes.bool,
  form: PropTypes.object,
  data: PropTypes.any,
  save: PropTypes.func,
  nextTab: PropTypes.func,
  previousTab: PropTypes.func,
};

BaseForm.contextTypes = {
  __: PropTypes.func,
};
