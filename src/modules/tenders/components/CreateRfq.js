import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, Icon } from 'antd';
import { rfqEmailTemplate } from '../constants';
import TenderForm from './forms/TenderForm';
import RfqForm from './forms/RfqForm';

const initialProducts = [{ key: Math.random() }];

class CreateRfq extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.save(inputs);
  }

  render() {
    const { products } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMainInfo(rfqEmailTemplate)}

        <Card title="Form" className="margin">
          <RfqForm
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

CreateRfq.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(CreateRfq);

export default withRouter(form);
