import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, InputNumber, Form, Table, Button } from 'antd';
import { BaseForm, Uploader } from 'modules/common/components';
import { rfqColumns } from '../../constants';
import MainInfo from './MainInfo';

const TabPane = Tabs.TabPane;
const { Column } = Table;

class Publish extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;

    const products = [];
    const perProductStates = {};

    data.requestedProducts
      ? data.requestedProducts.forEach(product => {
          const key = Math.random();
          const extendedProduct = { key, ...product };

          products.push(extendedProduct);

          perProductStates[`product__${key}`] = extendedProduct;
        })
      : products.push({ key: Math.random() });

    this.state = { products, ...perProductStates, content: data.content };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailContentChange = this.onEmailContentChange.bind(this);
    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.addProductRow = this.addProductRow.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const products = [];

    // collect products table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('product__')) {
        const product = this.state[key];
        delete product.key;
        delete product.__typename;
        products.push(product);
      }
    });

    this.save({
      content: this.state.content,
      supplierIds: ['1', '2'],
      requestedProducts: products
    });
  }

  onEmailContentChange(content) {
    this.setState({ content });
  }

  addProductRow() {
    const { products } = this.state;

    products.push({ key: Math.random() });

    this.setState({ products });
  }

  onProductInputChange(e, name, recordKey) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    product[name] = e.target ? e.target.value : e;

    this.setState({ [stateKey]: product });
  }

  renderProductColumn(name, title, type) {
    const render = (text, record) => {
      const props = {
        defaultValue: record[name],
        onChange: e => this.onProductInputChange(e, name, record.key)
      };

      let control = <Input {...props} />;

      if (type === 'number') {
        props.htmlType = 'number';
        control = <InputNumber {...props} />;
      }

      if (type === 'uploader') {
        control = <Uploader />;
      }

      return control;
    };

    return <Column title={title} key={name} dataIndex={name} render={render} />;
  }

  render() {
    const { data } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Publish RFQ" key="1">
              <MainInfo
                data={data}
                renderField={this.renderField.bind(this)}
                renderOptions={this.renderOptions.bind(this)}
                onEmailContentChange={this.onEmailContentChange}
                onReceiveFile={(...args) => this.fileUpload(...args)}
              />
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <Table
                className="margin form-table"
                dataSource={this.state.products}
                pagination={false}
                size="middle"
                scroll={rfqColumns.length > 6 ? { x: 3000 } : {}}
              >
                {this.renderProductColumn('code', 'Product code')}
                {this.renderProductColumn('code1', 'Product code')}
                {this.renderProductColumn('code2', 'Product code')}
                {this.renderProductColumn('code3', 'Product code')}
                {this.renderProductColumn('code4', 'Product code')}
                {this.renderProductColumn('code5', 'Product code')}
                {this.renderProductColumn('code6', 'Product code')}
                {this.renderProductColumn('code7', 'Product code')}
                {this.renderProductColumn('code8', 'Product code')}
                {this.renderProductColumn('code9', 'Product code')}
                {this.renderProductColumn('code10', 'Product code')}
                {this.renderProductColumn('code11', 'Product code')}
                {this.renderProductColumn('code12', 'Product code')}
                {this.renderProductColumn('code13', 'Product code')}
                {this.renderProductColumn(
                  'purchaseRequestNumber',
                  'Purchase request number',
                  'number'
                )}
              </Table>
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

Publish.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
};

const PublishForm = Form.create()(Publish);

export default withRouter(PublishForm);
