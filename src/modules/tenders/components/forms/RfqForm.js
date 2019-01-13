import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Button, message } from 'antd';
import RfqTable from './RfqTable';
import MainInfo from './MainInfo';
import { BaseForm } from 'modules/common/components';

class RfqForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.rfqTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMainInfo = this.onChangeMainInfo.bind(this);
    this.onChangeRequestedProducts = this.onChangeRequestedProducts.bind(this);

    const { data } = props;

    this.state = {
      requestedProducts: data.requestedProducts || [],
      suppliers: data.suppliers || [],
      attachments: data.attachments || [],
      content: data.content || ''
    };
  }

  onChangeMainInfo(mainInfoState) {
    this.setState(mainInfoState);
  }

  onChangeRequestedProducts(requestedProducts) {
    this.setState({ requestedProducts });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { type } = this.props;
    const { requestedProducts, content, attachments, suppliers } = this.state;

    const doc = {
      type,
      requestedProducts,
      content,
      attachments,
      supplierIds: suppliers.map(s => s._id)
    };

    if (type === 'rfq' && doc.requestedProducts.length === 0) {
      return message.error('Please input atleast one row');
    }

    this.save(doc);
  }

  renderProductsTable() {
    const { type, data } = this.props;

    if (type === 'trfq') {
      return null;
    }

    return (
      <RfqTable
        requestedProducts={data.requestedProducts || []}
        onChange={this.onChangeRequestedProducts}
      />
    );
  }

  render() {
    // data is editing tender object
    const { data } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div>
          <MainInfo
            data={data}
            renderField={this.renderField.bind(this)}
            renderOptions={this.renderOptions.bind(this)}
            onChange={this.onChangeMainInfo}
          />
        </div>

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
