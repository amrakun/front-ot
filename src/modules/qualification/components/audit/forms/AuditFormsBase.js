import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popover, Icon, Divider, Alert } from 'antd';
import { Uploader, BaseForm } from 'modules/common/components';
import { booleanData, booleanDataReverse } from 'modules/common/constants';
import { labels } from './constants';
import { auditTabs } from 'modules/qualification/consts';

const TextArea = Input.TextArea;

class AuditFormsBase extends BaseForm {
  constructor(props, context) {
    super(props, context);

    const { response } = props;

    this.renderMethod = response ? this.renderForBuyer : this.renderForSupplier;

    this.collectMethod = response ? this.collectForBuyer : this.collectForSupplier;

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
      const files = this.getFieldValue(`${name}File`) || [];

      let answer = this.getFieldValue(`${name}Answer`);

      if (field.type !== 'multiple') answer = answer === 'true';

      doc[name] = {
        supplierAnswer: answer,
        supplierComment: this.getFieldValue(`${name}Comment`),
        supplierFile: files.length > 0 ? files[0] : null,
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
        auditorRecommendation: this.getFieldValue(`${name}Recommendation`),
      };
    });

    return doc;
  }

  renderQuestion(name, type) {
    return this.renderMethod(name, type);
  }

  renderForSupplier(name, type) {
    this.fields.includes(name) || this.fields.push({ name, type });

    const { __ } = this.context;

    const data = this.props.data || {};
    const answer = data[name] || {};
    const supplierAnswer = answer.supplierAnswer;
    const multipleOptions = labels[name].options;

    let initialAnswer = '';

    if (multipleOptions && multipleOptions[supplierAnswer]) {
      initialAnswer = multipleOptions[supplierAnswer].value;
    } else {
      initialAnswer =
        supplierAnswer !== null && supplierAnswer !== undefined ? supplierAnswer.toString() : '';
    }

    // dynamically changing answer
    const stateAnswer = this.getFieldValue(`${name}Answer`) || initialAnswer;
    const isFileVisible = stateAnswer === 'true' || ['1', '2'].includes(stateAnswer);

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
              {type !== 'multiple' ? this.booleanOptions : this.renderOptions(labels[name].options)}
            </Select>
          ),
        })}

        {this.renderField({
          name: `${name}Comment`,
          hasFeedback: false,
          initialValue: answer.supplierComment,
          control: <TextArea placeholder={__('Comment')} />,
        })}

        {this.renderField({
          name: `${name}File`,
          hasFeedback: false,
          initialValue: answer.supplierFile,
          isVisible: isFileVisible,
          optional: !isFileVisible,
          dataType: 'file',
          control: <Uploader />,
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
      auditorComment,
    } = responseData;

    const multipleOptions = labels[name].options;

    let initialScore = '';

    if (multipleOptions && multipleOptions[auditorScore]) {
      initialScore = multipleOptions[auditorScore].value;
    } else {
      initialScore =
        auditorScore !== null && auditorScore !== undefined ? auditorScore.toString() : '';
    }

    return (
      <div className="audit-question">
        <div className="ant-form-item-label">
          <label>{this.renderTooltipLabel(name)}</label>
        </div>

        <div className="ant-list-item-meta-title">
          {typeof supplierAnswer === 'boolean'
            ? supplierAnswer
              ? 'Yes'
              : 'No'
            : multipleOptions[supplierAnswer].text}
        </div>

        <div className="ant-list-item-meta-description" style={{ marginBottom: '8px' }}>
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
          ),
        })}

        {this.renderField({
          name: `${name}Comment`,
          hasFeedback: false,
          initialValue: auditorComment,
          optional: true,
          control: <TextArea placeholder="Comment" />,
        })}

        {this.renderField({
          name: `${name}Recommendation`,
          hasFeedback: false,
          initialValue: auditorRecommendation,
          optional: true,
          control: <TextArea placeholder="Recommendation" style={{ marginTop: '5px' }} />,
        })}
        <Divider />
      </div>
    );
  }

  renderTooltipLabel(name, title) {
    const { __ } = this.context;

    let description = labels[name].desc;

    if (typeof description === 'function') {
      description = description(__);
    } else {
      description = __(description);
    }

    return (
      <span>
        {__(labels[name].title)}
        <Popover content={description} title={title}>
          &nbsp;
          <Icon type="question-circle-o" />
        </Popover>
      </span>
    );
  }

  renderIsQualifiedAlert(name) {
    const { __ } = this.context;
    const { supplierInfo, response, isQualified, qualifiedStatus } = this.props;

    if (response) {
      return (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>
            {supplierInfo.basicInfo.enName}
          </h2>

          {isQualified ? (
            <Alert message={__('This supplier is qualified')} type="success" showIcon />
          ) : (
            <Alert message={__('This supplier is not qualified.')} type="warning" showIcon />
          )}

          <p style={{ height: '8px' }} />
        </div>
      );
    }

    if (qualifiedStatus) {
      const qualified = qualifiedStatus[name];

      if (!name) {
        return null;
      }

      return (
        <Alert
          message={`${auditTabs[name]} is ${qualified ? 'qualified' : 'not qualified'}`}
          type={qualified ? 'success' : 'error'}
          style={{ marginBottom: '16px' }}
          showIcon
        />
      );
    }
  }
}

AuditFormsBase.contextTypes = {
  __: PropTypes.func,
};

export default AuditFormsBase;
