import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, DatePicker, Divider, Modal, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { EditorCK } from 'modules/common/components';
import { dateTimeFormat } from 'modules/common/constants';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

const rules = [
  {
    required: true,
    message: 'This field is required!',
  },
];

class Qualified extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.reviewReport = this.reviewReport.bind(this);
    this.reviewImprovementPlan = this.reviewImprovementPlan.bind(this);
  }

  handleForm(callback) {
    const { form } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        callback(values);
      }
    });
  }

  handleOk() {
    const { sendReport, hideModal } = this.props;

    return this.handleForm(values => {
      sendReport(values);
      hideModal();
    });
  }

  reviewReport() {
    const { review } = this.props;

    return this.handleForm(values => {
      review('auditReport', values);
    });
  }

  reviewImprovementPlan() {
    const { review } = this.props;

    return this.handleForm(values => {
      review('auditImprovementPlan', values);
    });
  }

  handleEditorChange(e) {
    this.editorContent = e.editor.getData();
  }

  renderReassesmentDate() {
    const { form, isQualified } = this.props;
    const { getFieldDecorator } = form;

    if (isQualified) {
      return null;
    }

    return (
      <FormItem label="Re-Assesment date">
        {getFieldDecorator('reassessmentDate', { rules })(<DatePicker format={dateTimeFormat} />)}
      </FormItem>
    );
  }

  renderReviewImprovementPlan() {
    const { isQualified } = this.props;

    if (isQualified) {
      return null;
    }

    return (
      <Button key="review-improvement-report" onClick={this.reviewImprovementPlan}>
        Review improvement plan
      </Button>
    );
  }

  render() {
    const { supplierInfo, isQualified, hideModal } = this.props;
    const { basicInfo, contactInfo } = supplierInfo;

    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Auditor result"
        visible={true}
        onCancel={hideModal}
        width="80%"
        style={{ top: 32 }}
        bodyStyle={{ maxHeight: '80vh', overflow: 'scroll' }}
        footer={[
          <Button key="back" type="danger" onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="review-report" onClick={this.reviewReport}>
            Review report
          </Button>,
          this.renderReviewImprovementPlan(),
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Send report
          </Button>,
        ]}
      >
        <Form>
          <p>
            Supplier name: <strong>{basicInfo.enName}</strong>
          </p>

          <p>
            Key contact person: <strong>{contactInfo.name}</strong>
          </p>

          <p>
            Audit result:{' '}
            <strong>{isQualified ? 'Qualified' : 'Not qualified with improvement plan'}</strong>
          </p>

          <Divider />

          <FormItem label="Report language">
            {getFieldDecorator('reportLanguage', { rules, initialValue: 'mn' })(
              <Select>
                <Select.Option value="mn">Mongolia</Select.Option>
                <Select.Option value="en">English</Select.Option>
              </Select>
            )}
          </FormItem>

          <FormItem label="Qualification/audit date">
            {getFieldDecorator('auditDate', { rules })(<DatePicker format={dateTimeFormat} />)}
          </FormItem>

          {this.renderReassesmentDate()}

          <FormItem label="Report Number">
            {getFieldDecorator('reportNo', { rules })(<Input type="number" />)}
          </FormItem>

          <FormItem label="Auditor name">
            {getFieldDecorator('auditor', { rules })(<TextArea />)}
          </FormItem>

          <div className="ant-form-item-label">
            <label className="ant-form-item-required">Audit result summary & observations</label>
          </div>

          <EditorCK content="" onChange={this.handleEditorChange} />
        </Form>
      </Modal>
    );
  }
}

Qualified.propTypes = {
  form: PropTypes.object,
  supplierInfo: PropTypes.object,
  hideModal: PropTypes.func,
};

const ReportsForm = Form.create()(Qualified);

export default withRouter(ReportsForm);
