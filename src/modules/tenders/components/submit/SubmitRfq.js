import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, message } from 'antd';
import { Uploader } from 'modules/common/components';
import { xlsxHandler } from 'modules/common/utils';
import TenderForm from '../TenderForm';
import RfqTable from '../RfqTable';
import MainInfo from './MainInfo';

class SubmitTender extends TenderForm {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.collectInputs = this.collectInputs.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onServiceFileUpload = this.onServiceFileUpload.bind(this);

    const response = props.response || {};

    this.state.respondedServiceFiles = response.respondedServiceFiles;
  }

  collectInputs() {
    const products = [];

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];

        if (!this.isComplete(product)) return false;

        const totalPrice = product.quantity * product.unitPrice;
        delete product.key;
        delete product.__typename;
        delete product.purchaseRequestNumber;
        delete product.shortText;
        delete product.quantity;
        delete product.uom;
        delete product.manufacturer;
        delete product.manufacturerPartNumber;

        products.push({
          ...product,
          totalPrice
        });
      }
    });

    return products;
  }

  handleSubmit(e) {
    e.preventDefault();

    const { data, save } = this.props;
    const { type } = data || {};
    const { respondedServiceFiles } = this.state;
    const respondedProducts = this.collectInputs();

    if (type === 'rfq' && respondedProducts.length === 0) {
      return message.error(this.context.__('Your form is incomplete'));
    }

    if (
      type === 'trfq' &&
      (!respondedServiceFiles || respondedServiceFiles.length === 0)
    ) {
      return message.error(this.context.__('Your form is incomplete'));
    }

    save({ respondedProducts, respondedServiceFiles }, true);
  }

  onServiceFileUpload(files) {
    this.setState({ respondedServiceFiles: files });
  }

  saveDraft() {
    this.save({
      respondedProducts: this.collectInputs(),
      respondedServiceFiles: this.state.respondedServiceFiles
    });
  }

  handleFile(e) {
    const { __ } = this.context;

    xlsxHandler({
      e,
      success: data => {
        Object.keys(this.state).forEach(key => {
          if (key.startsWith('product__')) {
            delete this.state[key];
          }
        });

        const products = [];
        const perProductStates = {};
        let allComplete = true;

        data.forEach(product => {
          if (!this.isComplete(product)) allComplete = false;

          const key = Math.random();

          const extendedProduct = {
            key,
            ...product
          };

          products.push(extendedProduct);

          perProductStates[`product__${key}`] = extendedProduct;
        });

        if (!allComplete) {
          message.warning(__('Your excel import is incomplete'));
        }

        this.setState({ products, ...perProductStates });
      }
    });
  }

  isComplete(product) {
    return product.leadTime && product.shippingTerms && product.unitPrice;
  }

  renderAction() {
    const { __ } = this.context;

    return (
      <div className="margin">
        <Button style={{ marginRight: '16px' }} onClick={this.saveDraft}>
          {__('Save as draft')}
        </Button>
        <Button type="primary" htmlType="submit">
          {__('Save & submit')}
        </Button>
      </div>
    );
  }

  render() {
    const { products } = this.state;
    const { data, generateTemplate } = this.props;

    let title = 'Form';
    let form = (
      <RfqTable
        generateTemplate={generateTemplate}
        products={products}
        renderProductColumn={this.renderProductColumn}
        handleFile={this.handleFile}
      />
    );

    if (data.type === 'trfq') {
      const response = this.props.response || {};
      const serviceFiles = response.respondedServiceFiles || [];

      title = 'Schedule of service/ financial proposal';

      form = (
        <Uploader
          multiple
          onChange={this.onServiceFileUpload}
          defaultFileList={serviceFiles}
        />
      );
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <MainInfo {...data} />

        <Card title={title} className="margin">
          {form}
          <br />

          {!data.isSent && this.renderAction()}
        </Card>
      </Form>
    );
  }
}

SubmitTender.propTypes = {
  data: PropTypes.object
};

SubmitTender.contextTypes = {
  __: PropTypes.func
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
