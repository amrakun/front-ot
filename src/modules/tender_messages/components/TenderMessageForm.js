import React from 'react';
import { Form, Input, Tag, Button, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { Uploader } from 'modules/common/components';
import { EditorCK } from 'modules/common/components/';
import SupplierSearcher from 'modules/companies/containers/Searcher';

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
      eoiTargets: undefined,
      fileName: undefined,
      fileURL: undefined,
      editorHTMLContent: '',
      eoiSelectedSuppliers: [],
      recipientSupplierIds,
    };

    this.onEmailContentChange = e => this.setState({ editorHTMLContent: e.editor.getData() });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEoiTargetsChange = this.onEoiTargetsChange.bind(this);
    this.selectedSupplierIdChange = this.selectedSupplierIdChange.bind(this);
    this.onSelectEoiSuppliers = this.onSelectEoiSuppliers.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error('Form error', err);
      }

      const { onSubmit, replyTo, tenderDetail } = this.props;

      if (!onSubmit) {
        return;
      }

      const { currentUser } = this.context;
      const { fileName, fileURL, recipientSupplierIds, editorHTMLContent, eoiTargets } = this.state;

      if (!editorHTMLContent) {
        return message.error('Please fill content');
      }

      const doc = {
        tenderId: tenderDetail._id,
        ...values,
        recipientSupplierIds,
        eoiTargets,
        body: editorHTMLContent,
      };

      if (currentUser.isSupplier) {
        doc.senderSupplierId = currentUser.companyId;
      } else if (tenderDetail.type === 'eoi' && !eoiTargets) {
        return message.error('Please choose suppliers');
      }

      if (replyTo) {
        doc.replyToId = replyTo._id;
      }

      if (fileName && fileURL) {
        doc.attachment = {
          name: fileName,
          url: fileURL,
        };
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

  // for rfqs
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

  onEoiTargetsChange(value) {
    this.setState({ eoiTargets: value, recipientSupplierIds: [] });
  }

  onSelectEoiSuppliers(suppliers) {
    this.setState({
      eoiSelectedSuppliers: suppliers,
      recipientSupplierIds: suppliers.map(sup => sup._id),
    });
  }

  removeEoiSelectedSupplier(supplierId) {
    const { eoiSelectedSuppliers } = this.state;

    const updatedEoiSelectedSuppliers = [];
    const updatedRecipientSupplierIds = [];

    eoiSelectedSuppliers.forEach(supplier => {
      if (supplier._id !== supplierId) {
        updatedEoiSelectedSuppliers.push(supplier);
        updatedRecipientSupplierIds.push(supplierId);
      }
    });

    this.setState({
      eoiSelectedSuppliers: updatedEoiSelectedSuppliers,
      recipientSupplierIds: updatedRecipientSupplierIds,
    });
  }

  renderBuyerFields() {
    const { currentUser } = this.context;

    if (currentUser.isSupplier) return null;

    const { tenderDetail } = this.props;
    const { eoiTargets, eoiSelectedSuppliers } = this.state;

    if (tenderDetail.type === 'eoi') {
      return (
        <>
          <Item label="Suppliers">
            <Select onChange={this.onEoiTargetsChange} value={eoiTargets} placeholder="suppliers">
              <Select.Option value="toAll">To all</Select.Option>
              <Select.Option value="toParticipated">To participated suppliers</Select.Option>
              <Select.Option value="toSelected">To selected suppliers</Select.Option>
            </Select>
          </Item>

          {eoiTargets === 'toSelected' && (
            <>
              <SupplierSearcher title="Choose suppliers" onSelect={this.onSelectEoiSuppliers} />

              <div style={{ margin: '20px 0px' }}>
                {eoiSelectedSuppliers.map(supplier => {
                  const basicInfo = supplier.basicInfo || {};

                  return (
                    <Tag
                      key={supplier._id}
                      closable={true}
                      afterClose={() => this.removeEoiSelectedSupplier(supplier._id)}
                    >
                      {basicInfo.enName}
                    </Tag>
                  );
                })}
              </div>
            </>
          )}
        </>
      );
    }

    return (
      <Item label="Suppliers">
        <Select
          onChange={this.selectedSupplierIdChange}
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
