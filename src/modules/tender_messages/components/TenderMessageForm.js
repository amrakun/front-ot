import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { Uploader } from 'modules/common/components';

const { Item } = Form;

class MessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fileName: undefined,
      fileURL: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('Form error', err);
        return;
      }
      const { onSubmit } = this.props;
      if (!onSubmit) return;

      const { currentUser } = this.context;

      const tenderId = this.props.tenderDetail._id;

      const doc = {
        tenderId,
        ...values
      };

      const { fileName, fileURL } = this.state;

      if (fileName && fileURL) {
        doc.attachment = {
          name: fileName,
          url: fileURL
        };
      }

      if (currentUser.isSupplier) {
        doc.senderSupplierId = currentUser.companyId;
      }
      onSubmit(doc);
    });
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  onFileChange(files) {
    this.setState({
      fileName: files[0].name,
      fileURL: files[0].url
    });
  }

  renderBuyerFields() {
    const { getFieldDecorator } = this.props.form;
    const { currentUser } = this.context;

    if (currentUser.isSupplier) return null;

    return (
      <Item>
        {getFieldDecorator('recipientSupplierIds', {
          rules: []
        })(
          <Select mode="multiple" placeholder="supplier">
            {this.props.tenderDetail.suppliers.map(supplier => (
              <Select.Option key={supplier._id} value={supplier._id}>
                {supplier.basicInfo.enName}
              </Select.Option>
            ))}
          </Select>
        )}
      </Item>
    );
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const subjectError = isFieldTouched('subject') && getFieldError('subject');
    const bodyError = isFieldTouched('body') && getFieldError('body');

    return (
      <>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {this.renderBuyerFields()}
          <Item
            validateStatus={subjectError ? 'error' : ''}
            help={subjectError || ''}
          >
            {getFieldDecorator('subject', {
              rules: [{ required: true, message: 'Please input your subject!' }]
            })(<Input placeholder="subject" />)}
          </Item>
          <Item
            validateStatus={bodyError ? 'error' : ''}
            help={bodyError || ''}
          >
            {getFieldDecorator('body', {
              rules: [
                { required: true, message: 'Please input of message body!' }
              ]
            })(<Input.TextArea autosize type="body" placeholder="body" />)}
          </Item>
          <Item>
            <Uploader onChange={this.onFileChange.bind(this)} />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors.bind(this)(getFieldsError())}
            >
              Send
            </Button>
          </Item>
        </Form>
      </>
    );
  }
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func,
  tenderDetail: PropTypes.object
};

MessageForm.contextTypes = {
  currentUser: PropTypes.object
};

const WrappedMessageForm = Form.create({ name: 'horizontal_login' })(
  MessageForm
);
export default WrappedMessageForm;
