import React from 'react';
import PropTypes from 'prop-types';
import { Input, Table, Select, message } from 'antd';
import { BaseForm, Uploader } from 'modules/common/components';
import { booleanData } from 'modules/common/constants';
import MainInfo from './forms/MainInfo';

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

    if (data.requestedDocuments) {
      data.requestedDocuments.forEach(doc => {
        const key = Math.random();
        const product = { key, document: doc };

        products.push(product);

        perProductStates[`product__${key}`] = product;
      });
    }

    this.state = {
      products,
      ...perProductStates,
      content: data.content && data.content,
      suppliers: data.suppliers
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailContentChange = this.onEmailContentChange.bind(this);
    this.onAddSuppliers = this.onAddSuppliers.bind(this);
    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.addProductRow = this.addProductRow.bind(this);
    this.renderProductColumn = this.renderProductColumn.bind(this);
    this.sendTender = this.sendTender.bind(this);
    this.removeSupplier = this.removeSupplier.bind(this);
  }

  collectInputs() {
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

    const supplierIds = [];

    this.state.suppliers.forEach(i => {
      supplierIds.push(i._id);
    });

    return {
      content: this.state.content,
      supplierIds: supplierIds || [],
      requestedProducts: products
    };
  }

  sendTender(inputs) {
    if (inputs.requestedProducts.length > 0) {
      this.save(inputs);
    } else {
      message.error('Please input atleast one row');
    }
  }

  onEmailContentChange(content) {
    this.setState({ content });
  }

  onAddSuppliers(values) {
    const suppliers = [...this.state.suppliers];
    const supplierIds = suppliers.map(s => s._id);

    values.forEach(value => {
      // Only add new suppliers
      if (!supplierIds.includes(value._id)) {
        suppliers.push(value);
      }
    });

    this.setState({ suppliers });
  }

  addProductRow() {
    const { products } = this.state;

    products.push({ key: Math.random() });

    this.setState({ products });
  }

  onProductInputChange(e, name, recordKey) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    let value = e.target ? e.target.value : e;

    if (name === 'isSubmitted') value = value === 'true';

    product[name] = value;

    this.state[stateKey] = product;
  }

  renderProductColumn(props) {
    const { name, title, type, isSupplier } = props;
    const render = (text, record) => {
      const inputProps = {
        defaultValue: record[name],
        disabled: isSupplier,
        type: type,
        onChange: e => this.onProductInputChange(e, name, record.key)
      };

      let control = <Input {...inputProps} />;

      if (type === 'uploader') {
        control = (
          <Uploader
            initialFile={record[name]}
            disabled={isSupplier}
            onReceiveFile={args =>
              this.onProductInputChange(args, name, record.key)
            }
          />
        );
      }

      if (type === 'select') {
        control = (
          <Select
            disabled={isSupplier}
            onSelect={e => this.onProductInputChange(e, name, record.key)}
          >
            {this.renderOptions(booleanData)}
          </Select>
        );
      }

      return control;
    };

    return (
      <Column
        title={title}
        key={name}
        dataIndex={name}
        render={render}
        width={250}
      />
    );
  }

  removeSupplier(supplierId) {
    let { suppliers } = this.state;

    const updatedSuppliers = [];
    suppliers.forEach(supplier => {
      if (supplier._id !== supplierId) updatedSuppliers.push(supplier);
    });

    this.setState({ suppliers: updatedSuppliers });
  }

  renderMainInfo(template) {
    const { suppliers, content } = this.state;

    return (
      <div>
        <MainInfo
          suppliers={suppliers}
          data={this.props.data}
          content={content || template}
          renderField={this.renderField.bind(this)}
          renderOptions={this.renderOptions.bind(this)}
          onAddSuppliers={this.onAddSuppliers}
          onEmailContentChange={this.onEmailContentChange}
          onReceiveFile={(...args) => this.fileUpload(...args)}
          removeSupplier={this.removeSupplier}
        />
      </div>
    );
  }
}

TenderForm.propTypes = {
  data: PropTypes.object
};

export default TenderForm;
