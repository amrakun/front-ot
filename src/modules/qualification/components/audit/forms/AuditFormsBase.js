import React from 'react';
import { Input, Select } from 'antd';
import { BaseForm } from 'modules/common/components';
import { booleanData } from 'modules/common/constants';
import { labels } from './constants';

const TextArea = Input.TextArea;

class AuditFormsBase extends BaseForm {
  constructor(props) {
    super(props);

    this.booleanOptions = this.renderOptions(booleanData);
    this.fieldNames = [];

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const doc = {};

    this.fieldNames.map(fieldName => {
      doc[fieldName] = {
        supplierAnswer: this.getFieldValue(`${fieldName}SupplierAnswer`),
        supplierComment: this.getFieldValue(`${fieldName}SupplierComment`)
      };
    });

    this.saveDirect(doc);
  }

  renderQuestion(name) {
    this.fieldNames.includes(name) || this.fieldNames.push(name);

    let initialSupplierAnswer = null;
    let initialSupplierComment = null;

    return (
      <div className="audit-question">
        {this.renderField({
          label: labels[name],
          name: `${name}SupplierAnswer`,
          initialValue: initialSupplierAnswer,
          hasFeedback: false,
          dataType: 'boolean',
          control: <Select placeholder="Yes/No">{this.booleanOptions}</Select>
        })}

        {this.renderField({
          name: `${name}SupplierComment`,
          hasFeedback: false,
          initialValue: initialSupplierComment,
          optional: true,
          control: <TextArea placeholder="Comment" />
        })}
      </div>
    );
  }
}

export default AuditFormsBase;
