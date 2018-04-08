import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Card, Alert } from 'antd';
import { labels, descriptions, booleanData } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';
import { statusTabs } from 'modules/qualification/consts';

const TextArea = Input.TextArea;

class PreqForm extends BaseForm {
  constructor(props) {
    super(props);

    this.common = {
      disabled: props.disabled
    };
  }

  renderStatus(name) {
    const { __ } = this.context;
    const { prequalifiedStatus } = this.props;
    const qualified = prequalifiedStatus[name];

    return (
      <Alert
        message={__(
          `${statusTabs[name]} is ${qualified ? 'qualified' : 'not qualified'}`
        )}
        type={qualified ? 'success' : 'error'}
        style={{ marginBottom: '16px' }}
        showIcon
      />
    );
  }

  renderConditionalField(name, isTextarea) {
    const isVisible = this.state[name];

    return (
      <Card>
        {this.renderBoolean(name)}
        {isTextarea
          ? this.renderTextArea(`${name}Description`, isVisible)
          : this.renderUpload(`${name}File`, isVisible)}
      </Card>
    );
  }

  renderUpload(name, isVisible = true) {
    return this.renderField({
      label: labels.documentLabel,
      name: name,
      isVisible: isVisible,
      optional: !isVisible,
      dataType: 'file',
      control: <Uploader {...this.common} />
    });
  }

  renderTextArea(name, isVisible) {
    return this.renderField({
      name: name,
      label: labels[name],
      isVisible: isVisible,
      controlType: 'textarea',
      optional: !isVisible,
      control: <TextArea {...this.common} />
    });
  }

  renderBoolean(name) {
    const booleanOptions = this.renderOptions(booleanData);

    return this.renderField({
      name: name,
      label: labels[name],
      dataType: 'boolean',
      description: descriptions[name] && descriptions[name],
      control: (
        <Select
          {...this.common}
          onChange={value => this.onConditionalChange(value, name)}
        >
          {booleanOptions}
        </Select>
      )
    });
  }
}

PreqForm.contextTypes = {
  __: PropTypes.func
};

export default PreqForm;
