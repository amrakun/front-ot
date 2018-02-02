import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, DatePicker, Divider } from 'antd';
import ModalWrapper from './ModalWrapper';
import PropTypes from 'prop-types';
import { Editor } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

class CreateReport extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleOk() {
    const { form, exportFiles, hideModal } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        exportFiles('auditReport', values);
        hideModal();
      }
    });
  }

  handleEditorChange(content) {
    this.editorContent = content;
  }

  render() {
    const { basicInfo, contactInfo, isQualified } = this.props;
    const { getFieldDecorator } = this.props.form;
    const rules = [
      {
        required: true,
        message: 'This field is required!'
      }
    ];

    return (
      <ModalWrapper {...this.props} handleOk={this.handleOk}>
        <Form>
          <p>
            Supplier name: <strong>{basicInfo.enName}</strong>
          </p>

          <p>
            Key contact person: <strong>{contactInfo.name}</strong>
          </p>

          <p>
            Audit result: <strong>{isQualified ? 'Yes' : 'No'}</strong>
          </p>
          <Divider />
          <FormItem label="Qualification/audit date">
            {getFieldDecorator('auditDate', { rules })(
              <DatePicker format={dateFormat} />
            )}
          </FormItem>

          <FormItem label="Report Number">
            {getFieldDecorator('reportNo', { rules })(<Input type="number" />)}
          </FormItem>

          <FormItem label="Auditor name">
            {getFieldDecorator('auditor', { rules })(<TextArea />)}
          </FormItem>

          <div className="ant-form-item-label">
            <label className="ant-form-item-required">
              Audit result summary & observations
            </label>
          </div>
          <Editor content="" onEmailContentChange={this.handleEditorChange} />
        </Form>
      </ModalWrapper>
    );
  }
}

CreateReport.propTypes = {
  form: PropTypes.object,
  basicInfo: PropTypes.object,
  exportFiles: PropTypes.func,
  contactInfo: PropTypes.object,
  isQualified: PropTypes.bool,
  hideModal: PropTypes.func
};

const ReportsForm = Form.create()(CreateReport);

export default withRouter(ReportsForm);
