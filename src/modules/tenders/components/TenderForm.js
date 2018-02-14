import React from 'react';
import PropTypes from 'prop-types';
import { Input, Table, Checkbox } from 'antd';
import { BaseForm, Uploader, T } from 'modules/common/components';
import MainInfo from './forms/MainInfo';

const { Column } = Table;

class TenderForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;
    const response = props.response || {};

    const products = [];
    const perProductStates = {};

    //data iniltialization
    if (data.requestedProducts) {
      const respondedProducts = response.respondedProducts || [];

      data.requestedProducts.forEach((product, i) => {
        const productResponse = respondedProducts[i];
        const key = Math.random();
        const extendedProduct = { key, ...product, ...productResponse };

        products.push(extendedProduct);

        perProductStates[`product__${key}`] = extendedProduct;
      });
    }

    //data iniltialization
    if (data.requestedDocuments) {
      const respondedDocuments = response.respondedDocuments || [];

      data.requestedDocuments.forEach((doc, i) => {
        const productResponse = respondedDocuments[i] || {};
        const key = Math.random();

        const product = {
          key,
          document: doc,
          notes: productResponse.notes,
          file: productResponse.file,
          isSubmitted: productResponse.isSubmitted
        };

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

    product[name] = e.target ? e.target.value || e.target.checked : e;

    this.state[stateKey] = product;
  }

  onProductFileChange(files, name, recordKey) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    product[name] = files[0];

    this.state[stateKey] = product;
  }

  renderProductColumn(props) {
    const { name, title, type, isSupplier } = props;
    const { location } = this.props;

    const hidden = isSupplier && location.pathname.includes('eoi');

    if (hidden) return null;

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
            defaultFileList={[record[name]]}
            disabled={isSupplier}
            onChange={files =>
              this.onProductFileChange(files, name, record.key)
            }
          />
        );
      }
      if (type === 'checkbox') {
        control = (
          <Checkbox
            defaultChecked={record[name]}
            onChange={e => this.onProductInputChange(e, name, record.key)}
          >
            <T id="submitted">Submitted</T>
          </Checkbox>
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
        width={200}
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
