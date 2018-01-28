import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'antd';
import TenderForm from '../TenderForm';
import RfqTable from '../RfqTable';
import MainInfo from './MainInfo';

class SubmitTender extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.collectInputs = this.collectInputs.bind(this);
  }

  collectInputs() {
    const products = [];

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];
        delete product.key;
        delete product.__typename;
        delete product.purchaseRequestNumber;
        delete product.shortText;
        delete product.quantity;
        delete product.uom;
        delete product.manufacturer;
        delete product.manufacturerPartNumber;
        products.push(product);
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

  render() {
    const { products } = this.state;
    const { data } = this.props;

    const formProps = {
      products: products,
      renderProductColumn: this.renderProductColumn
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
                Save as draft
              </Button>
              <Button type="primary" htmlType="submit">
                Save & submit
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

const form = Form.create()(SubmitTender);

export default withRouter(form);
