import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { Uploader } from 'modules/common/components';
import { Editor } from 'modules/common/components/';

const { Item } = Form;

class MessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fileName: undefined,
      fileURL: undefined,
      editorHTMLContent: '',
    };

    this.onEmailContentChange = editorHTMLContent => this.setState({ editorHTMLContent });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderBuyerFields = this.renderBuyerFields.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('Form error', err);
        return;
      }

      const { onSubmit, replyTo } = this.props;

      if (!onSubmit) {
        return;
      }

      const { currentUser } = this.context;

      const tenderId = this.props.tenderDetail._id;

      const doc = {
        tenderId,
        ...values,
        body: this.state.editorHTMLContent,
      };

      if (replyTo) {
        doc.replyToId = replyTo._id;
      }

      const { fileName, fileURL } = this.state;

      if (fileName && fileURL) {
        doc.attachment = {
          name: fileName,
          url: fileURL,
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
      fileURL: files[0].url,
    });
  }

  renderBuyerFields() {
    const { getFieldDecorator } = this.props.form;
    const { currentUser } = this.context;
    const { replyTo } = this.props;

    let initialValue = undefined;
    if (replyTo && !currentUser.isSupplier) {
      initialValue = [replyTo.senderSupplier._id];
    }

    if (currentUser.isSupplier) return null;

    return (
      <Item label="Suppliers">
        {getFieldDecorator('recipientSupplierIds', {
          initialValue,
          rules: [],
        })(
          <Select
            mode="multiple"
            placeholder="supplier"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const subjectError = isFieldTouched('subject') && getFieldError('subject');

    return (
      <>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {this.renderBuyerFields()}
          <Item
            label="Subject"
            validateStatus={subjectError ? 'error' : ''}
            help={subjectError || ''}
          >
            {getFieldDecorator('subject', {
              rules: [{ required: true, message: 'Please input your subject!' }],
            })(<Input placeholder="subject" />)}
          </Item>
          <Item label="Attachment">
            <Uploader onChange={this.onFileChange.bind(this)} />
          </Item>
          <Item label="Message">
            <Editor
              content={this.state.editorHTMLContent}
              onEmailContentChange={this.onEmailContentChange}
            />
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
  tenderDetail: PropTypes.object,
  replyTo: PropTypes.object,
};

MessageForm.contextTypes = {
  currentUser: PropTypes.object,
};

const WrappedMessageForm = Form.create({ name: 'horizontal_login' })(MessageForm);
export default WrappedMessageForm;
