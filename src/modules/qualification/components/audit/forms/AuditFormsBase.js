import React from 'react';
import { Input, Select, Popover, Icon, Divider } from 'antd';
import { BaseForm } from 'modules/common/components';
import { booleanData } from 'modules/common/constants';
import { labels } from './constants';

const TextArea = Input.TextArea;

class AuditFormsBase extends BaseForm {
  constructor(props) {
    super(props);

    const { response } = props;

    this.renderMethod = response ? this.renderForBuyer : this.renderForSupplier;
    this.collectMethod = response
      ? this.collectForBuyer
      : this.collectForSupplier;

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
    this.saveDirect(this.collectMethod(), lastTab);
  }

  collectForSupplier() {
    const doc = {};

    this.fieldNames.forEach(fieldName => {
      doc[fieldName] = {
        supplierAnswer: this.getFieldValue(`${fieldName}Answer`),
        supplierComment: this.getFieldValue(`${fieldName}Comment`)
      };
    });

    return doc;
  }

  collectForBuyer() {
    const doc = {};

    this.fieldNames.forEach(fieldName => {
      doc[fieldName] = {
        auditorScore: this.getFieldValue(`${fieldName}Score`),
        auditorComment: this.getFieldValue(`${fieldName}Comment`),
        auditorRecommendation: this.getFieldValue(`${fieldName}Recommendation`)
      };
    });

    return doc;
  }

  renderQuestion(name, type) {
    return this.renderMethod(name, type);
  }

  renderForSupplier(name, type) {
    this.fieldNames.includes(name) || this.fieldNames.push(name);

    const data = this.props.data || {};
    const answer = data[name] || {};

    return (
      <div className="audit-question">
        {this.renderField({
          label: this.renderTooltipLabel(name),
          name: `${name}Answer`,
          initialValue: answer.supplierAnswer,
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
          name: `${name}Comment`,
          hasFeedback: false,
          initialValue: answer.supplierComment,
          optional: true,
          control: <TextArea placeholder="Comment" />
        })}
      </div>
    );
  }

  renderForBuyer(name, type) {
    this.fieldNames.includes(name) || this.fieldNames.push(name);

    const response = this.props.response || {};
    const responseData = response[name] || {};
    const {
      supplierAnswer,
      supplierComment,
      auditorRecommendation,
      auditorScore,
      auditorComment
    } = responseData;
    const multipleOptions = labels[name].options;

    return (
      <div className="audit-question">
        <div className="ant-form-item-label">
          <label>{this.renderTooltipLabel(name)}</label>
        </div>

        <div className="ant-list-item-meta-title">
          {typeof supplierAnswer === 'boolean'
            ? supplierAnswer ? 'Yes' : 'No'
            : multipleOptions[supplierAnswer].text}
        </div>

        <div
          className="ant-list-item-meta-description"
          style={{ marginBottom: '8px' }}
        >
          {supplierComment}
        </div>

        {this.renderField({
          name: `${name}Score`,
          initialValue: multipleOptions
            ? multipleOptions[auditorScore].text
            : auditorScore,
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
          name: `${name}Comment`,
          hasFeedback: false,
          initialValue: auditorComment,
          optional: true,
          control: <TextArea placeholder="Comment" />
        })}

        {this.renderField({
          name: `${name}Recommendation`,
          hasFeedback: false,
          initialValue: auditorRecommendation,
          optional: true,
          control: (
            <TextArea
              placeholder="Recommendation"
              style={{ marginTop: '5px' }}
            />
          )
        })}
        <Divider />
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
