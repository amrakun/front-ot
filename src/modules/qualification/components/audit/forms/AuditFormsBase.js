import React from 'react';
import { Input, Select, Popover, Icon, Divider, Alert } from 'antd';
import { BaseForm } from 'modules/common/components';
import { booleanData, booleanDataReverse } from 'modules/common/constants';
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
    this.booleanOptionsReverse = this.renderOptions(booleanDataReverse);
    this.fields = [];

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

    this.fields.forEach(field => {
      const name = field.name;

      let answer = this.getFieldValue(`${name}Answer`);
      if (field.type !== 'multiple') answer = answer === 'true';

      doc[name] = {
        supplierAnswer: answer,
        supplierComment: this.getFieldValue(`${name}Comment`)
      };
    });

    return doc;
  }

  collectForBuyer() {
    const doc = {};

    this.fields.forEach(field => {
      const name = field.name;

      let score = this.getFieldValue(`${name}Score`);
      if (field.type !== 'multiple') score = score === 'true';

      doc[name] = {
        auditorScore: score,
        auditorComment: this.getFieldValue(`${name}Comment`),
        auditorRecommendation: this.getFieldValue(`${name}Recommendation`)
      };
    });

    return doc;
  }

  renderQuestion(name, type) {
    return this.renderMethod(name, type);
  }

  renderForSupplier(name, type) {
    this.fields.includes(name) || this.fields.push({ name, type });

    const data = this.props.data || {};
    const answer = data[name] || {};
    const supplierAnswer = answer.supplierAnswer;
    const multipleOptions = labels[name].options;

    let initialAnswer = '';
    if (multipleOptions) {
      if (multipleOptions[supplierAnswer])
        initialAnswer = multipleOptions[supplierAnswer].text;
    } else {
      initialAnswer =
        supplierAnswer !== undefined ? supplierAnswer.toString() : '';
    }

    return (
      <div className="audit-question">
        {this.renderField({
          label: this.renderTooltipLabel(name),
          name: `${name}Answer`,
          initialValue: initialAnswer,
          hasFeedback: false,
          dataType: type !== 'multiple' ? 'boolean' : null,
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
          control: <TextArea placeholder="Comment" />
        })}
      </div>
    );
  }

  renderForBuyer(name, type) {
    this.fields.includes(name) || this.fields.push({ name, type });

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

    let initialScore = '';
    if (multipleOptions) {
      if (multipleOptions[auditorScore])
        initialScore = multipleOptions[auditorScore].text;
    } else {
      initialScore = auditorScore !== undefined ? auditorScore.toString() : '';
    }

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
          initialValue: initialScore,
          hasFeedback: false,
          dataType: type !== 'multiple' ? 'boolean' : null,
          control: (
            <Select>
              {type !== 'multiple'
                ? type === 'reversed'
                  ? this.booleanOptionsReverse
                  : this.booleanOptions
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

  renderIsQualifiedAlert() {
    const { supplierInfo, response, isQualified } = this.props;

    if (response) {
      return (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>
            {supplierInfo.basicInfo.enName}
          </h2>

          {isQualified ? (
            <Alert
              message="This supplier is qualified"
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message="This supplier is not qualified."
              type="warning"
              showIcon
            />
          )}

          <p style={{ height: '8px' }} />
        </div>
      );
    }
  }
}

export default AuditFormsBase;
