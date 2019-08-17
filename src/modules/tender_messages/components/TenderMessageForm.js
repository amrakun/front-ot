import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { Uploader } from 'modules/common/components';
import { EditorCK } from 'modules/common/components/';

const { Item } = Form;

class MessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { replyTo } = props;
    const { currentUser } = context;

    const recipientSupplierIds = (() => {
      if (replyTo && !currentUser.isSupplier) {
        return [replyTo.senderSupplier._id];
      } else {
        return [];
      }
    })();

    this.state = {
      fileName: undefined,
      fileURL: undefined,
      editorHTMLContent: '',
      recipientSupplierIds,
    };

    this.onEmailContentChange = e => this.setState({ editorHTMLContent: e.editor.getData() });
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
      const { recipientSupplierIds } = this.state;

      const tenderId = this.props.tenderDetail._id;

      const doc = {
        tenderId,
        ...values,
        recipientSupplierIds,
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

  selectedSupplierIdChange(values) {
    const valuesSet = new Set(values);
    const { suppliers, tenderDetail } = this.props;
    const { responses } = tenderDetail;
    const participatedResponses = responses.filter(response => response.isNotInterested !== true);

    if (valuesSet.has('select_all')) {
      this.setState({ recipientSupplierIds: suppliers.map(supplier => supplier._id) });
    } else if (valuesSet.has('select_participated')) {
      this.setState({
        recipientSupplierIds: participatedResponses.map(response => response.supplierId),
      });
    } else if (valuesSet.has('deselect_all')) {
      this.setState({ recipientSupplierIds: [] });
    } else {
      this.setState({ recipientSupplierIds: values });
    }
  }

  renderBuyerFields() {
    const { currentUser } = this.context;

    if (currentUser.isSupplier) return null;

    return (
      <Item label="Suppliers">
        <Select
          onChange={this.selectedSupplierIdChange.bind(this)}
          value={this.state.recipientSupplierIds}
          mode="multiple"
          placeholder="supplier"
          filterOption={(input, option) =>
            option.props.enName.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option
            key="select_participated"
            value="select_participated"
            enName="Select participated suppliers"
          >
            <b>Select participated suppliers</b>
          </Select.Option>

          <Select.Option key="select_all" value="select_all" enName="Select All">
            <b>Select All</b>
          </Select.Option>

          <Select.Option key="deselect_all" value="deselect_all" enName="Deselect All">
            <b>Deselect All</b>
          </Select.Option>

          {this.props.suppliers.map(supplier => {
            const basicInfo = supplier.basicInfo || {};

            return (
              <Select.Option
                key={supplier._id}
                value={supplier._id}
                enName={basicInfo.enName || ''}
              >
                {basicInfo.enName || ''}
              </Select.Option>
            );
          })}
        </Select>
      </Item>
    );
  }

  render() {
    const { form, replyTo, tenderDetail } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const subjectError = isFieldTouched('subject') && getFieldError('subject');

    const initialSubjectValue =
      (replyTo ? replyTo.subject : null) || `${tenderDetail.number} ${tenderDetail.name}`;

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
              initialValue: initialSubjectValue,
              rules: [{ required: true, message: 'Please input your subject!' }],
            })(<Input placeholder="subject" />)}
          </Item>
          <Item label="Attachment">
            <Uploader onChange={this.onFileChange.bind(this)} />
          </Item>
          <Item label="Message">
            <EditorCK content={this.state.editorHTMLContent} onChange={this.onEmailContentChange} />
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
