import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Input, Card } from 'antd';
import { BaseForm, Field, Uploader } from 'modules/common/components';
import { uploadDisclaimer } from 'modules/common/constants';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  shareholder: {
    id: 'shareholder',
    defaultMessage: 'Shareholder'
  }
});

class ShareHolders extends BaseForm {
  constructor(props) {
    super(props);

    const shareholderInfo = this.props.data || {};
    const shareholders = shareholderInfo.shareholders || [];

    let percentages = {};

    shareholders.forEach((shareholder, i) => {
      if (shareholder) percentages[`percentage${i}`] = shareholder.percentage;
    });

    this.state = { ...percentages };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
    this.renderShareholder = this.renderShareholder.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const items = [0, 1, 2, 3, 4];

    const shareholders = [];

    items.forEach(i => {
      const name = this.getFieldValue(`name${i}`);
      const jobTitle = this.getFieldValue(`jobTitle${i}`);
      const percentage = this.getFieldValue(`percentage${i}`);

      if (name && jobTitle && percentage) {
        shareholders.push({ name, jobTitle, percentage });
      }
    });

    this.save({ shareholders });
  }

  handleShareChange(e, name) {
    const value = e.target.value;

    this.setState({ [name]: value ? parseInt(value, 10) : 0 });
  }

  renderShareholder(k, optional) {
    const shareholderInfo = this.props.data || {};
    const shareholders = shareholderInfo.shareholders || [];
    const { formatMessage } = this.context;
    const shareholder = shareholders[k] || {};

    let totalShare = 0;
    Object.keys(this.state).forEach(key => {
      totalShare += this.state[key];
    });

    return (
      <Card title={formatMessage(messages.shareholder) + ` ${k + 1}`}>
        <Field
          label="Name"
          name={`name${k}`}
          suffix={k}
          control={<Input />}
          initialValue={shareholder.name}
          optional={optional}
        />

        <Field
          label="Job title"
          name={`jobTitle${k}`}
          suffix={k}
          control={<Input />}
          initialValue={shareholder.jobTitle}
          optional={optional}
        />

        <Field
          label="Share percentage %"
          name={`percentage${k}`}
          suffix={k}
          initialValue={shareholder.percentage}
          control={
            <Input
              type="number"
              onChange={e => this.handleShareChange(e, `percentage${k}`)}
            />
          }
          optional={optional}
          validateStatus={totalShare > 100 ? 'error' : undefined}
          help={
            totalShare > 100
              ? 'Total share should be lower than 100%'
              : undefined
          }
        />
      </Card>
    );
  }

  render() {
    return (
      <Form>
        <Card>
          {this.renderField({
            label: '20. Please provide key shareholders information',
            name: 'attachments',
            description: uploadDisclaimer,
            optional: true,
            dataType: 'file-multiple',
            control: <Uploader multiple={true} />
          })}
        </Card>

        {this.renderShareholder(0, false)}
        {this.renderShareholder(1, true)}
        {this.renderShareholder(2, true)}
        {this.renderShareholder(3, true)}
        {this.renderShareholder(4, true)}

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

ShareHolders.contextTypes = {
  formatMessage: PropTypes.func
};

const ShareHoldersForm = Form.create()(ShareHolders);

export default withRouter(ShareHoldersForm);
