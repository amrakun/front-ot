import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, Card, message } from 'antd';
import { Uploader, BaseForm } from 'modules/common/components';
import RfqTable from './RfqTable';
import MainInfo from './MainInfo';

class SubmitTender extends BaseForm {
  constructor(props, context) {
    super(props, context);

    const response = props.response || {};

    this.state = {
      respondedProducts: response.respondedProducts || [],
      respondedFiles: response.respondedFiles || []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.onServiceFileUpload = this.onServiceFileUpload.bind(this);
    this.onChangeProducts = this.onChangeProducts.bind(this);
  }

  onChangeProducts(respondedProducts) {
    this.setState({ respondedProducts });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { data, save } = this.props;
    const { type, rfqType } = data || {};
    const { respondedFiles } = this.state;

    const respondedProducts = this.state.respondedProducts.map(product => {
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
        totalPrice
      };
    });

    if (
      type === 'rfq' &&
      rfqType === 'goods' &&
      respondedProducts.length === 0
    ) {
      return message.error(this.context.__('Your form is incomplete'));
    }

    if (type === 'trfq' && (!respondedFiles || respondedFiles.length === 0)) {
      return message.error(this.context.__('Your form is incomplete'));
    }

    if (
      type === 'rfq' &&
      rfqType === 'service' &&
      (!respondedFiles || respondedFiles.length === 0)
    ) {
      return message.error(this.context.__('Your form is incomplete'));
    }

    save({ respondedProducts, respondedFiles }, true);
  }

  onServiceFileUpload(files) {
    this.setState({ respondedFiles: files });
  }

  saveDraft() {
    this.save({
      respondedProducts: this.state.respondedProducts,
      respondedFiles: this.state.respondedFiles
    });
  }

  isComplete(product) {
    return product.leadTime && product.shippingTerms && product.unitPrice;
  }

  renderAction() {
    const { __ } = this.context;

    return (
      <div className="margin">
        <Button style={{ marginRight: '16px' }} onClick={this.saveDraft}>
          {__('Save as draft')}
        </Button>
        <Button type="primary" htmlType="submit">
          {__('Save & submit')}
        </Button>
      </div>
    );
  }

  render() {
    const { data, generateTemplate, response } = this.props;
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
        <Uploader
          multiple
          onChange={this.onServiceFileUpload}
          defaultFileList={serviceFiles}
        />
      );
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <MainInfo {...data} />

        <Card title={title} className="margin">
          {form}
          <br />

          {!data.isSent && this.renderAction()}
        </Card>
      </Form>
    );
  }
}

SubmitTender.propTypes = {
  data: PropTypes.object
};

SubmitTender.contextTypes = {
  __: PropTypes.func
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
