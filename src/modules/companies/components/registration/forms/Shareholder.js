import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card } from 'antd';
import { BaseForm, Field, Uploader } from 'modules/common/components';
import { Title } from 'modules/common/components/translations';
import { uploadDisclaimer } from 'modules/common/constants';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  ...Title
});

class ShareHolders extends BaseForm {
  handleSubmit(e) {
    e.preventDefault();

    const items = [1, 2, 3, 4, 5];

    const shareholders = [];

    items.forEach(i => {
      const name = this.getFieldValue(`name${i}`);
      const jobTitle = this.getFieldValue(`jobTitle${i}`);
      const percentage = this.getFieldValue(`percentage${i}`);

      if (name && jobTitle && percentage) {
        shareholders.push({ name, jobTitle, percentage });
      }
    });

    this.save({
      shareholders
    });
  }

  renderShareholder(k, optional) {
    const shareholderInfo = this.props.data || {};
    const shareholders = shareholderInfo.shareholders || [];
    const shareholder = shareholders[k - 1] || {};
    const { formatMessage } = this.props.intl;

    return (
      <Card title={formatMessage(messages.shareholder) + ` ${k}`}>
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
          control={<Input type="number" />}
          optional={optional}
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

        {this.renderShareholder('1', false)}
        {this.renderShareholder('2', true)}
        {this.renderShareholder('3', true)}
        {this.renderShareholder('4', true)}
        {this.renderShareholder('5', true)}

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

ShareHolders.propTypes = {
  intl: intlShape.isRequired
};

const ShareHoldersForm = Form.create()(ShareHolders);

export default injectIntl(withRouter(ShareHoldersForm));
