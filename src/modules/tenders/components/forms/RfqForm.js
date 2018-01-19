import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, Icon } from 'antd';
import { rfqEmailTemplate } from '../../constants';
import TenderForm from '../TenderForm';
import RfqTable from '../RfqTable';
import { xlsxHandler } from 'modules/common/utils';

const initialProducts = [{ key: Math.random() }];

class RfqForm extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    if (!this.state.content) {
      this.setState({
        content: rfqEmailTemplate,
        products: initialProducts
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let inputs = this.collectInputs();

    inputs.type = 'rfq';

    this.sendTender(inputs);
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

  render() {
    const { products } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMainInfo(rfqEmailTemplate)}

        <Card title="Form" className="margin">
          <RfqTable
            products={products}
            renderProductColumn={this.renderProductColumn}
            isSupplier={false}
            handleFile={this.handleFile}
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

RfqForm.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(RfqForm);

export default withRouter(form);
