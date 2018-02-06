import React from 'react';
import { Select, Input, Card } from 'antd';
import { labels, descriptions, booleanData } from '../constants';
import { BaseForm, Uploader } from 'modules/common/components';

const TextArea = Input.TextArea;

class PreqForm extends BaseForm {
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
      control: <Uploader />
    });
  }

  renderTextArea(name, isVisible) {
    return this.renderField({
      name: name,
      label: labels[name],
      isVisible: isVisible,
      controlType: 'textarea',
      optional: !isVisible,
      control: <TextArea />
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
        <Select onChange={value => this.onConditionalChange(value, name)}>
          {booleanOptions}
        </Select>
      )
    });
  }
}

export default PreqForm;
