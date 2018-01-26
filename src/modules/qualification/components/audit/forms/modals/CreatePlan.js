import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, DatePicker, Divider } from 'antd';
import ModalWrapper from './ModalWrapper';
import PropTypes from 'prop-types';
import { dateFormat } from 'modules/common/constants';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

class CreatePlan extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    const { form, exportFile, hideModal } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        exportFile('auditImprovementPlan', values);
        hideModal();
      }
    });
  }

  render() {
    const { basicInfo, isQualified } = this.props;
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
            Audit result: <strong>{isQualified ? 'Yes' : 'No'}</strong>
          </p>

          <Divider />

          <FormItem label="Qualification/audit date">
            {getFieldDecorator('auditDate', { rules })(
              <DatePicker format={dateFormat} />
            )}
          </FormItem>

          <FormItem label="Re-assessment date">
            {getFieldDecorator('reassessmentDate', { rules })(
              <DatePicker format={dateFormat} />
            )}
          </FormItem>

          <FormItem label="Auditor name">
            {getFieldDecorator('auditorName', { rules })(<TextArea />)}
          </FormItem>
        </Form>
      </ModalWrapper>
    );
  }
}

CreatePlan.propTypes = {
  form: PropTypes.object,
  basicInfo: PropTypes.object,
  exportFile: PropTypes.func,
  hideModal: PropTypes.func,
  isQualified: PropTypes.bool
};

const ReportsForm = Form.create()(CreatePlan);

export default withRouter(ReportsForm);
