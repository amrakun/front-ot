import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Table, Select } from 'antd';
import { BaseForm, Uploader } from 'modules/common/components';
import { booleanData } from 'modules/common/constants';
import MainInfo from './MainInfo';

const { Column } = Table;

class TenderForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;

    const products = [];
    const perProductStates = {};

    if (data.requestedProducts) {
      data.requestedProducts.forEach(product => {
        const key = Math.random();
        const extendedProduct = { key, ...product };

        products.push(extendedProduct);

        perProductStates[`product__${key}`] = extendedProduct;
      });
    }

    this.state = {
      products,
      ...perProductStates,
      content: data.content && data.content,
      supplierIds: data.supplierIds
    };

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
      supplierIds: this.state.supplierIds || [],
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

    this.state[stateKey] = product;
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
        control = (
          <Uploader
            initialFile={record[name]}
            onReceiveFile={args =>
              this.onProductInputChange(args, name, record.key)
            }
          />
        );
      }

      if (type === 'select') {
        control = (
          <Select
            onSelect={e => this.onProductInputChange(e, name, record.key)}
          >
            {this.renderOptions(booleanData)}
          </Select>
        );
      }

      return control;
    };

    return <Column title={title} key={name} dataIndex={name} render={render} />;
  }

  renderMainInfo(template) {
    const { supplierIds, content } = this.state;

    return (
      <MainInfo
        supplierIds={supplierIds}
        data={this.props.data}
        content={content || template}
        renderField={this.renderField.bind(this)}
        renderOptions={this.renderOptions.bind(this)}
        onEmailContentChange={this.onEmailContentChange}
        onReceiveFile={(...args) => this.fileUpload(...args)}
      />
    );
  }
}

TenderForm.propTypes = {
  data: PropTypes.object
};

export default TenderForm;
