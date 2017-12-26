import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button } from 'antd';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';
import RfqForm from './forms/RfqForm';

const TabPane = Tabs.TabPane;

class SubmitTender extends TenderForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { currentUser } = this.context;
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
        delete product.manufacturerPart;
        products.push(product);
      }
    });

    this.save({
      supplierId: currentUser._id,
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
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <TabPane tab="Main info" key="1">
              <div>
                <strong>Tender name: </strong>
                {data.tenderName}
              </div>
              <div>
                <strong>Tender number: </strong>
                {data.number}
              </div>
              <div>
                <strong>Start date: </strong>
                {data.publishDate}
              </div>
              <div>
                <strong>End date: </strong>
                {data.closeDate}
              </div>
              <div>
                <strong>Document: </strong>
                {data.file.url}
              </div>
              <br />
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </TabPane>

            <TabPane tab="Form" key="2">
              {data.type.eoi ? (
                <EoiForm {...formProps} />
              ) : (
                <RfqForm {...formProps} />
              )}
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

SubmitTender.propTypes = {
  data: PropTypes.object
};

SubmitTender.contextTypes = {
  currentUser: PropTypes.object
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
