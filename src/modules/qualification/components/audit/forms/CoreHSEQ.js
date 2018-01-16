import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Select } from 'antd';
import { BaseForm } from 'modules/common/components';
import { booleanData } from 'modules/common/constants';
import { labels } from './constants';

const TextArea = Input.TextArea;

class SupplierProfile extends BaseForm {
  constructor(props) {
    super(props);

    this.booleanOptions = this.renderOptions(booleanData);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion(name) {
    return (
      <div className="audit-question">
        {this.renderField({
          label: labels[name],
          name: `${name}Answer`,
          hasFeedback: false,
          control: <Select placeholder="Yes/No">{this.booleanOptions}</Select>
        })}
        {this.renderField({
          name: `${name}Comment`,
          hasFeedback: false,
          optional: true,
          control: <TextArea placeholder="Comment" />
        })}
      </div>
    );
  }

  render() {
    const render = this.renderQuestion;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Core HSEQ">
          {render('auditHseq1')}
          {render('auditHseq2')}
        </Card>
        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const SupplierProfileForm = Form.create()(SupplierProfile);

export default withRouter(SupplierProfileForm);
