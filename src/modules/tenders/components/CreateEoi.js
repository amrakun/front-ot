import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button } from 'antd';
import { eoiEmailTemplate } from '../constants';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';

const TabPane = Tabs.TabPane;

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
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Main info" key="1">
              {this.renderMainInfo(eoiEmailTemplate)}
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <EoiForm
                products={products}
                renderProductColumn={this.renderProductColumn}
                isSupplier={false}
              />
              <br />
              <Button type="primary" htmlType="submit" className="margin">
                Save & continue
              </Button>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    );
  }
}

CreateEoi.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(CreateEoi);

export default withRouter(form);
