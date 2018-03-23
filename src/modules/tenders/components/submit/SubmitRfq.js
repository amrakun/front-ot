import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'antd';
import TenderForm from '../TenderForm';
import RfqTable from '../RfqTable';
import MainInfo from './MainInfo';
import { xlsxHandler } from 'modules/common/utils';

class SubmitTender extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.collectInputs = this.collectInputs.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  collectInputs() {
    const products = [];

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];
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

    this.props.save({ respondedProducts: this.collectInputs() }, true);
  }

  saveDraft() {
    this.save({ respondedProducts: this.collectInputs() });
  }

  handleFile(e) {
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

        data.forEach(product => {
          const key = Math.random();

          const extendedProduct = {
            key,
            ...product
          };

          products.push(extendedProduct);

          perProductStates[`product__${key}`] = extendedProduct;
        });

        this.setState({ products, ...perProductStates });
      }
    });
  }

  render() {
    const { products } = this.state;
    const { __ } = this.context;
    const { data, generateTemplate } = this.props;

    const formProps = {
      generateTemplate,
      products: products,
      renderProductColumn: this.renderProductColumn,
      handleFile: this.handleFile
    };

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <MainInfo {...data} />

        <Card title="Form" className="margin">
          <RfqTable {...formProps} />
          <br />

          {!data.isSent && (
            <div className="margin">
              <Button style={{ marginRight: '16px' }} onClick={this.saveDraft}>
                {__('Save as draft')}
              </Button>
              <Button type="primary" htmlType="submit">
                {__('Save & submit')}
              </Button>
            </div>
          )}
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
