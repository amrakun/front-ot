import React, { Fragment } from 'react';
import { Form, Input, Button, Tooltip, Tag, Row, Divider, message } from 'antd';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import SupplierSearcher from 'modules/companies/components/Searcher';

class MessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      suppliers: Map()
    };

    this.onAddSuppliers = this.onAddSuppliers.bind(this);
    this.removeSupplier = this.removeSupplier.bind(this);

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
      const { currentUser } = this.context;

      if (!onSubmit) return;

      const tenderId = this.props.tenderDetail._id;

      const doc = {
        tenderId,
        ...values
      };

      if (currentUser.isSupplier) {
        doc.senderSupplierId = currentUser.companyId;
      } else {
        doc.recipientSupplierIds = Array.from(this.state.suppliers.keys());
      }

      onSubmit(doc);
    });
  }

  renderSupplierTags() {
    const { suppliers } = this.state;
    return (
      <Fragment>
        <b>To:</b> <Divider type="vertical" />
        {suppliers.valueSeq().map(supplier => (
          <Tooltip key={supplier._id} title={supplier.email}>
            <Tag
              key={supplier._id}
              closable={true}
              afterClose={() => this.removeSupplier(supplier._id)}
            >
              {supplier.basicInfo.enName}
            </Tag>
          </Tooltip>
        ))}
      </Fragment>
    );
  }

  onAddSuppliers(moreSuppliers) {
    const { suppliers } = this.state;
    const uniqueNewSuppliers = Map(
      moreSuppliers.filter(v => !suppliers.has(v._id)).map(v => [v._id, v])
    );
    this.setState({ suppliers: suppliers.merge(uniqueNewSuppliers) });
  }

  removeSupplier(supplierId) {
    this.setState({ suppliers: this.state.suppliers.delete(supplierId) });
  }

  hasErrors(fieldsError) {
    return (
      (this.state.suppliers.isEmpty() &&
        !this.context.currentUser.isSupplier) ||
      Object.keys(fieldsError).some(field => fieldsError[field])
    );
  }

  renderBuyerFields() {
    const {
      currentUser: { isSupplier }
    } = this.context;

    if (!isSupplier) {
      return (
        <Row>
          {this.renderSupplierTags()}
          <SupplierSearcher
            onSelect={this.onAddSuppliers}
            suppliers={this.props.tenderDetail.suppliers}
          />
        </Row>
      );
    }
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
        {this.renderBuyerFields()}
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={subjectError ? 'error' : ''}
            help={subjectError || ''}
          >
            {getFieldDecorator('subject', {
              rules: [{ required: true, message: 'Please input your subject!' }]
            })(<Input placeholder="subject" />)}
          </Form.Item>
          <Form.Item
            validateStatus={bodyError ? 'error' : ''}
            help={bodyError || ''}
          >
            {getFieldDecorator('body', {
              rules: [
                { required: true, message: 'Please input of message body!' }
              ]
            })(<Input.TextArea autosize type="body" placeholder="body" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors.bind(this)(getFieldsError())}
            >
              Send
            </Button>
          </Form.Item>
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
