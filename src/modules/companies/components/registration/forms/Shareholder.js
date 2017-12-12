import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, InputNumber } from 'antd';
import { BaseForm, Field, Uploader } from 'modules/common/components';

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

    return (
      <div>
        <Form.Item label={<strong>Shareholder {k}</strong>} colon={false} />

        <Field
          label="Name"
          name={`name${k}`}
          control={<Input />}
          initialValue={shareholder.name}
          optional={optional}
        />

        <Field
          label="Job title"
          name={`jobTitle${k}`}
          control={<Input />}
          initialValue={shareholder.jobTitle}
          optional={optional}
        />

        <Field
          label="Share percentage %"
          name={`percentage${k}`}
          initialValue={shareholder.percentage}
          control={<InputNumber htmlType="number" />}
          optional={optional}
        />
      </div>
    );
  }

  render() {
    return (
      <Form>
        {this.renderField({
          label: '20. Please provide key shareholders information',
          name: 'attachments',
          description: `You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files,
              or simple Adobe PDF files. Files that have the ability to contain
              macros or other types of active code are not acceptable.
            Maximum file size is 30mb.`,
          optional: true,
          dataType: 'file',
          control: (
            <Uploader
              initialFiles={this.props.data.attachments}
              multiple={true}
              onReceiveFile={(...args) => this.attachmentsUpload(...args)}
            />
          )
        })}

        {this.renderShareholder('1', false)}
        {this.renderShareholder('2', true)}
        {this.renderShareholder('3', true)}
        {this.renderShareholder('4', true)}
        {this.renderShareholder('5', true)}

        {this.renderSubmit()}
      </Form>
    );
  }
}

const ShareHoldersForm = Form.create()(ShareHolders);

export default withRouter(ShareHoldersForm);
