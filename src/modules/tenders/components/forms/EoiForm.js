import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Icon } from 'antd';
import { eoiEmailTemplate } from '../../constants';
import TenderForm from '../TenderForm';
import EoiTable from '../EoiTable';

const initialProducts = [
  { key: 1, document: 'Scope specific experience' },
  { key: 2, document: 'Customer reference /atleast 2/' },
  { key: 10, document: 'Special licenes if applicable (copy)' },
  { key: 3, document: 'State registration certificate (copy)' },
  { key: 4, document: 'HSE policy & procedures (copy)' },
  { key: 5, document: 'Business code of conduct (copy)' },
  { key: 6, document: 'Brief introduction of company' },
  { key: 7, document: 'Ownership/shareholder information' },
  { key: 8, document: 'Executive team structure/introduction' },
  { key: 9, document: 'Organization structure & total manpower' }
];
const initialPerProducts = {
  product__1: { document: 'Scope specific experience' },
  product__2: { document: 'Customer reference /atleast 2/' },
  product__3: { document: 'Special licences if applicable (copy)' }
};

class EoiForm extends TenderForm {
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
          <EoiTable
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
          Send
        </Button>
      </Form>
    );
  }
}

EoiForm.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(EoiForm);

export default withRouter(form);
