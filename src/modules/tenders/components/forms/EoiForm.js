import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button, Icon } from 'antd';
import TenderForm from '../TenderForm';
import EoiTable from '../EoiTable';
import MainInfo from './MainInfo';
import { initialProducts, initialPerProducts } from '../../constants';

class EoiForm extends TenderForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.eoiTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMainInfo = this.onChangeMainInfo.bind(this);

    const { data } = props;

    this.state.suppliers = data.suppliers || [];
    this.state.attachments = data.attachments || [];
    this.state.content = data.content || '';
  }

  onChangeMainInfo(mainInfoState) {
    this.setState(mainInfoState);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content, attachments, suppliers } = this.state;

    this.save({
      type: 'eoi',
      content,
      attachments,
      supplierIds: suppliers.map(s => s._id),
      requestedDocuments: this.getProducts().map(doc => doc.document)
    });
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
    const { data } = this.props;
    const { products } = this.state;

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
