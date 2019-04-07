import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, message, Select } from 'antd';
import RfqTable from './RfqTable';
import MainInfo from './MainInfo';
import SubmitButton from './SubmitButton';
import { BaseForm } from 'modules/common/components';
import { clearContent } from '../utils';

const { Option } = Select;
class RfqForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.rfqTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMainInfo = this.onChangeMainInfo.bind(this);
    this.onChangeRequestedProducts = this.onChangeRequestedProducts.bind(this);
    this.onRfqTypeChange = this.onRfqTypeChange.bind(this);

    const { data } = props;

    this.state = {
      rfqType: data.rfqType || 'goods',
      requestedProducts: data.requestedProducts || [],
      suppliers: data.suppliers || [],
      attachments: data.attachments || [],
      content: data.content || '',
    };
  }

  onChangeMainInfo(mainInfoState) {
    this.setState(mainInfoState);
  }

  onChangeRequestedProducts(requestedProducts) {
    this.setState({ requestedProducts });
  }

  onRfqTypeChange(rfqType) {
    this.setState({ rfqType });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { type } = this.props;
    const { content, attachments, suppliers, rfqType } = this.state;

    if (!clearContent(content)) {
      return message.error('Content is required');
    }

    const requestedProducts = (this.state.requestedProducts || []).map(product => {
      delete product.key;
      delete product.__typename;

      return product;
    });

    const doc = {
      type,
      requestedProducts,
      content,
      attachments,
      supplierIds: suppliers.map(s => s._id),
    };

    if (type === 'rfq') {
      doc.rfqType = rfqType;

      if (rfqType === 'goods' && doc.requestedProducts.length === 0) {
        return message.error('Please input atleast one row');
      }
    }

    // check row values ========
    let hasProductsError = false;

    for (const product of requestedProducts) {
      if (!product.shortText || !product.quantity || !product.uom) {
        hasProductsError = true;
      }
    }

    if (hasProductsError) {
      return message.error('Please complete table rows');
    }

    this.save(doc);
  }

  renderProductsTable() {
    const { type, data } = this.props;
    const { rfqType } = this.state;

    if (type === 'trfq') {
      return null;
    }

    if (rfqType === 'service') {
      return null;
    }

    return (
      <RfqTable
        requestedProducts={data.requestedProducts || []}
        onChange={this.onChangeRequestedProducts}
      />
    );
  }

  renderExtraContent() {
    const { type, data } = this.props;
    const { rfqType } = this.state;

    if (type === 'trfq') {
      return null;
    }

    if (data && data._id) {
      return null;
    }

    return (
      <Form.Item label="Type">
        <Select value={rfqType} onChange={this.onRfqTypeChange}>
          <Option value="goods">Goods</Option>
          <Option value="service">Service</Option>
        </Select>
      </Form.Item>
    );
  }

  render() {
    // data is editing tender object
    const { data, isSubmitted } = this.props;
    const { __ } = this.context;

    return (
      <Form>
        <div>
          <MainInfo
            data={data}
            renderExtraContent={this.renderExtraContent.bind(this)}
            renderField={this.renderField.bind(this)}
            renderOptions={this.renderOptions.bind(this)}
            onChange={this.onChangeMainInfo}
            showSuppliers={true}
          />
        </div>

        {this.renderProductsTable()}

        <SubmitButton isSubmitted={isSubmitted} onConfirm={this.handleSubmit} __={__} />
      </Form>
    );
  }
}

RfqForm.propTypes = {
  data: PropTypes.object,
  isSubmitted: PropTypes.bool,
};

RfqForm.contextTypes = {
  systemConfig: PropTypes.object,
  __: PropTypes.func,
};

const form = Form.create()(RfqForm);

export default withRouter(form);
