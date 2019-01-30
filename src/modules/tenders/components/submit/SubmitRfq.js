import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, Tabs } from 'antd';
import { Uploader, BaseForm } from 'modules/common/components';
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
    this.saveDraft = this.saveDraft.bind(this);
    this.onServiceFileUpload = this.onServiceFileUpload.bind(this);
    this.onChangeProducts = this.onChangeProducts.bind(this);
  }

  onChangeProducts(respondedProducts) {
    this.setState({ respondedProducts });
  }

  getRespondedProducts() {
    return this.state.respondedProducts.map(product => {
      const totalPrice = product.quantity * product.unitPrice;
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

    save({ respondedProducts, respondedFiles }, true);
  }

  onServiceFileUpload(files) {
    this.setState({ respondedFiles: files });
  }

  saveDraft() {
    this.save({
      respondedProducts: this.getRespondedProducts(),
      respondedFiles: this.state.respondedFiles,
    });
  }

  isComplete(product) {
    return product.leadTime && product.shippingTerms && product.unitPrice;
  }

  renderAction() {
    const { __ } = this.context;

    return (
      <div className="margin">
        <Button style={{ marginRight: '16px' }} htmlType="button" onClick={this.saveDraft}>
          {__('Save as draft')}
        </Button>
        <Button type="primary" htmlType="button" onClick={this.handleSubmit}>
          {__('Save & submit')}
        </Button>
      </div>
    );
  }

  render() {
    const { data, generateTemplate, response, queryParams } = this.props;
    const { type, rfqType, requestedProducts } = data;

    let title = 'Form';

    let form = (
      <RfqTable
        requestedProducts={requestedProducts}
        respondedProducts={response ? response.respondedProducts : []}
        generateTemplate={generateTemplate}
        onChange={this.onChangeProducts}
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

              {this.renderAction()}
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
