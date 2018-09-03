import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, Icon, message } from 'antd';
import TenderForm from '../TenderForm';
import RfqTable from '../RfqTable';
import { xlsxHandler } from 'modules/common/utils';

const initialProducts = [{ key: Math.random() }];

class RfqForm extends TenderForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.rfqTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    if (!this.state.content) {
      this.setState({
        content: this.emailTemplate,
        products: initialProducts
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { type } = this.props;
    const inputs = this.collectInputs();

    if (type === 'rfq' && inputs.requestedProducts.length === 0) {
      return message.error('Please input atleast one row');
    }

    inputs.type = type;

    this.save(inputs);
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
          const extendedProduct = { key, ...product };

          products.push(extendedProduct);

          perProductStates[`product__${key}`] = extendedProduct;
        });

        this.setState({ products, ...perProductStates });
      }
    });
  }

  renderProductsTable() {
    const { products } = this.state;
    const { type } = this.props;

    if (type === 'srfq') {
      return null;
    }

    return (
      <Card title="Form" className="margin">
        <RfqTable
          products={products}
          renderProductColumn={this.renderProductColumn}
          isSupplier={false}
          handleFile={this.handleFile}
          tenderCreation={this.props.tenderCreation}
        />

        <Button
          className="dashed-button-big"
          size="large"
          onClick={this.addProductRow}
        >
          <Icon type="plus" /> Add row
        </Button>
      </Card>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMainInfo(this.emailTemplate)}
        {this.renderProductsTable()}

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

RfqForm.propTypes = {
  data: PropTypes.object
};

RfqForm.contextTypes = {
  systemConfig: PropTypes.object,
  __: PropTypes.func
};

const form = Form.create()(RfqForm);

export default withRouter(form);
