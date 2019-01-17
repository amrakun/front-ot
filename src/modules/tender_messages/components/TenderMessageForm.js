import React, { Fragment } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Tooltip,
  Tag,
  Row,
  Select,
  Divider,
  message
} from 'antd';
import PropTypes from 'prop-types';
import SupplierSearcher from 'modules/companies/containers/Searcher';
import { merge, Map } from 'immutable';

class MessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      suppliers: Map(),
      tenderId: '5c383932e3e2774d65b3e060'
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
      const recipientSupplierIds = Array.from(this.state.suppliers.keys());
      const { tenderId } = this.state;

      const doc = {
        tenderId,
        recipientSupplierIds,
        ...values
      };
      if (onSubmit) onSubmit(doc);
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
    const uniqueNewSuppliers = moreSuppliers
      .filter(v => !suppliers.has(v._id))
      .map(v => [v._id, v]);
    const suppliersUpdated = merge(suppliers, uniqueNewSuppliers);
    this.setState({ suppliers: suppliersUpdated });
  }

  removeSupplier(supplierId) {
    const { suppliers } = this.state;
    const updatedSuppliers = suppliers.remove(supplierId);
    this.setState({ suppliers: updatedSuppliers });
  }
  hasErrors(fieldsError) {
    return (
      this.state.suppliers.isEmpty() ||
      Object.keys(fieldsError).some(field => fieldsError[field])
    );
  }
  render() {
    const { suppliers } = this.state;
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
      <Fragment>
        <Row>
          {this.renderSupplierTags()}
          <SupplierSearcher onSelect={this.onAddSuppliers} />
        </Row>

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
            })(<Input.TextArea type="body" placeholder="body" />)}
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
      </Fragment>
    );
  }
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func
};

const WrappedMessageForm = Form.create({ name: 'horizontal_login' })(
  MessageForm
);
export default WrappedMessageForm;
