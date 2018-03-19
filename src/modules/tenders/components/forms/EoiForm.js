import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Icon } from 'antd';
import TenderForm from '../TenderForm';
import EoiTable from '../EoiTable';
import { initialProducts, initialPerProducts } from '../../constants';

class EoiForm extends TenderForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.eoiTemplate;

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
        content: this.emailTemplate,
        products: initialProducts,
        ...initialPerProducts
      });
    }
  }

  render() {
    const { products } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMainInfo(this.emailTemplate)}

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

EoiForm.contextTypes = {
  systemConfig: PropTypes.object,
  __: PropTypes.func
};

const form = Form.create()(EoiForm);

export default withRouter(form);
