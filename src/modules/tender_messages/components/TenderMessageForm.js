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
  Divider
} from 'antd';
import SupplierSearcher from 'modules/companies/containers/Searcher';
import { merge, Map } from 'immutable';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  renderSupplierTags() {
    const { suppliers } = this.state;
    return (
      <Fragment>
        <b>To:</b>
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

  render() {
    const { suppliers } = this.state;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched('userName') && getFieldError('userName');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Fragment>
        <Row>
          {this.renderSupplierTags()}
          <SupplierSearcher onSelect={this.onAddSuppliers} />
        </Row>

        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const WrappedMessageForm = Form.create({ name: 'horizontal_login' })(
  MessageForm
);
export default WrappedMessageForm;
