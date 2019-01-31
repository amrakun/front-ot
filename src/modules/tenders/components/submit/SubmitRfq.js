import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Card, Tabs } from 'antd';
import { Uploader, BaseForm } from 'modules/common/components';
import Actions from './Actions';
import RfqTable from './RfqTable';
import MainInfo from './MainInfo';
import { TenderMessagesSingle } from 'modules/tender_messages/containers/';

const { TabPane } = Tabs;

class SubmitTender extends BaseForm {
  constructor(props, context) {
    super(props, context);

    const response = props.response || {};

    this.state = {
      respondedProducts: response.respondedProducts || [],
      respondedFiles: response.respondedFiles || [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onServiceFileUpload = this.onServiceFileUpload.bind(this);
    this.onChangeProducts = this.onChangeProducts.bind(this);
  }

  onChangeProducts(respondedProducts) {
    this.setState({ respondedProducts });
  }

  getRespondedProducts() {
    const { requestedProducts } = this.props.data;

    return this.state.respondedProducts.map((product, index) => {
      const requestedProduct = requestedProducts[index];

      if (!requestedProduct) {
        return {};
      }

      const totalPrice = requestedProduct.quantity * product.unitPrice;

      delete product.key;
      delete product.__typename;
      delete product.purchaseRequestNumber;
      delete product.shortText;
      delete product.quantity;
      delete product.uom;
      delete product.manufacturer;
      delete product.manufacturerPartNumber;

      return {
        ...product,
        totalPrice,
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { save } = this.props;
    const { respondedFiles } = this.state;

    const respondedProducts = this.getRespondedProducts();

    save({ respondedProducts, respondedFiles, isNotInterested: false }, true);
  }

  onServiceFileUpload(files) {
    this.setState({ respondedFiles: files });
  }

  isComplete(product) {
    return product.leadTime && product.shippingTerms && product.unitPrice;
  }

  onErrorChange(hasError) {
    this.setState({ hasError });
  }

  render() {
    const { data, generateTemplate, response, queryParams } = this.props;
    const { type, rfqType, requestedProducts } = data;
    const { __ } = this.context;

    let title = 'Form';

    let form = (
      <RfqTable
        requestedProducts={requestedProducts}
        respondedProducts={response ? response.respondedProducts : []}
        generateTemplate={generateTemplate}
        onChange={this.onChangeProducts}
        onErrorChange={this.onErrorChange.bind(this)}
      />
    );

    if (type === 'trfq' || (type === 'rfq' && rfqType === 'service')) {
      const response = this.props.response || {};
      const serviceFiles = response.respondedFiles || [];

      title = 'Schedule of service/ financial proposal';

      form = (
        <Uploader multiple onChange={this.onServiceFileUpload} defaultFileList={serviceFiles} />
      );
    }

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Main" key="1">
          <Form layout="inline">
            <MainInfo {...data} />

            <Card title={title} className="margin">
              {form}
              <br />

              <Actions
                __={__}
                tender={data}
                response={response}
                onNotInterested={() => this.save({ isNotInterested: true })}
                onSaveDraft={() =>
                  this.save({
                    respondedProducts: this.getRespondedProducts(),
                    respondedFiles: this.state.respondedFiles,
                    isNotInterested: false,
                  })
                }
                onSubmit={this.handleSubmit}
              />
            </Card>
          </Form>
        </TabPane>
        <TabPane tab="Message" key="2">
          <TenderMessagesSingle tenderDetail={data} isSupplier queryParams={queryParams} />
        </TabPane>
      </Tabs>
    );
  }
}

SubmitTender.propTypes = {
  data: PropTypes.object,
};

SubmitTender.contextTypes = {
  __: PropTypes.func,
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
