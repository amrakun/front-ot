import React from 'react';
import { Input, Select, Popover, Icon } from 'antd';
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
    this.collectAndSave = this.collectAndSave.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.collectAndSave();
  }

  collectAndSave(lastTab = false) {
    const doc = {};

    this.fieldNames.forEach(fieldName => {
      doc[fieldName] = {
        supplierAnswer: this.getFieldValue(`${fieldName}SupplierAnswer`),
        supplierComment: this.getFieldValue(`${fieldName}SupplierComment`)
      };
    });

    this.saveDirect(doc, lastTab);
  }

  renderQuestion(name, type) {
    this.fieldNames.includes(name) || this.fieldNames.push(name);

    let initialSupplierAnswer = null;
    let initialSupplierComment = null;

    return (
      <div className="audit-question">
        {this.renderField({
          label: this.renderTooltipLabel(name),
          name: `${name}SupplierAnswer`,
          initialValue: initialSupplierAnswer,
          optional: true,
          hasFeedback: false,
          dataType: type !== 'multiple' && 'boolean',
          control: (
            <Select>
              {type !== 'multiple'
                ? this.booleanOptions
                : this.renderOptions(labels[name].options)}
            </Select>
          )
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

  renderTooltipLabel(name, title) {
    return (
      <span>
        {labels[name].title}
        <Popover content={labels[name].desc} title={title}>
          &nbsp;<Icon type="question-circle-o" />
        </Popover>
      </span>
    );
  }
}

export default AuditFormsBase;
