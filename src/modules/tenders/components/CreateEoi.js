import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Icon } from 'antd';
import { eoiEmailTemplate } from '../constants';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';

const initialProducts = [
  { key: 1, document: 'Scope specific experience' },
  { key: 2, document: 'Customer reference /atleast 2/' },
  { key: 3, document: 'Special licences if applicable (copy)' }
];
const initialPerProducts = {
  product__1: { document: 'Scope specific experience' },
  product__2: { document: 'Customer reference /atleast 2/' },
  product__3: { document: 'Special licences if applicable (copy)' }
};

class CreateEoi extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let inputs = this.collectInputs();
    const requestedDocuments = inputs.requestedProducts.map(
      doc => doc.document
    );
    delete inputs.requestedProducts;
    inputs.type = 'eoi';
    inputs.requestedDocuments = requestedDocuments;

    this.save(inputs);
  }

  componentDidMount() {
    if (!this.state.content) {
      this.setState({
        content: eoiEmailTemplate,
        products: initialProducts,
        ...initialPerProducts
      });
    }
  }

  render() {
    const { products } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMainInfo(eoiEmailTemplate)}

        <Card title="Form" className="margin">
          <EoiForm
            products={products}
            renderProductColumn={this.renderProductColumn}
            isSupplier={false}
          />

          <Button
            className="dashed-button-big"
            size="large"
            onClick={this.addProductRow}
          >
            <Icon type="plus" /> Add row
          </Button>
        </Card>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="margin"
        >
          Save
        </Button>
      </Form>
    );
  }
}

CreateEoi.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(CreateEoi);

export default withRouter(form);
