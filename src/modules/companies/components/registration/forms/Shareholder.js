import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, InputNumber, Upload, Button } from 'antd';
import BaseForm from 'modules/common/components/BaseForm';
import Field from 'modules/common/components/Field';

class ShareHolders extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const doc = {
      attachments: [],
      shareholders: []
    };

    const items = [1, 2, 3, 4, 5];

    items.forEach(i => {
      const name = this.getFieldValue(`name${i}`);
      const jobTitle = this.getFieldValue(`jobTitle${i}`);
      const percentage = this.getFieldValue(`percentage${i}`);

      if (name && jobTitle && percentage) {
        doc.shareholders.push({ name, jobTitle, percentage });
      }
    });

    this.props.save(doc);
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
        <Field
          label="20. Please provide key shareholders information"
          name="attachments"
          description="You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files,
            or simple Adobe PDF files. Files that have the ability to contain
            macros or other types of active code are not acceptable.
            Maximum file size is 30mb."
          optional={true}
          control={
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          }
        />

        {this.renderShareholder('1', false)}
        {this.renderShareholder('2', true)}
        {this.renderShareholder('3', true)}
        {this.renderShareholder('4', true)}
        {this.renderShareholder('5', true)}

        {this.renderSubmit('Save', this.handleSubmit)}
      </Form>
    );
  }
}

const ShareHoldersForm = Form.create()(ShareHolders);

export default withRouter(ShareHoldersForm);
