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
  }

  handleSubmit(e) {
    e.preventDefault();

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

    this.save({
      tenderId: this.props.data._id,
      respondedProducts: products
    });
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
          <Button type="primary" htmlType="submit" className="margin">
            Save & continue
          </Button>
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
