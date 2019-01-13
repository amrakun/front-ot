import React from 'react';
import PropTypes from 'prop-types';
import { Input, Table, Checkbox } from 'antd';
import { BaseForm, Uploader, T } from 'modules/common/components';

const { Column } = Table;

class TenderForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

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
      ...perProductStates
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.addProductRow = this.addProductRow.bind(this);
    this.renderProductColumn = this.renderProductColumn.bind(this);
  }

  getProducts() {
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

    return products;
  }

  addProductRow() {
    const { products } = this.state;

    products.push({ key: Math.random() });

    this.setState({ products });
  }

  onProductInputChange(e, name, recordKey, dataType) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    let value;

    if (e.target) {
      if (e.target.value) {
        //input
        value = e.target.value;

        if (dataType === 'float') value = parseFloat(value);

        if (dataType === 'eightDigit' && value.length > 8)
          value = value.substring(0, 8);
      } else {
        //checkbox
        value = e.target.checked;
      }
    } else {
      //file
      value = e;
    }

    product[name] = value;

    this.state[stateKey] = product;
  }

  onProductFileChange(files, name, recordKey) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    product[name] = files ? files[0] : null;

    this.state[stateKey] = product;
  }

  renderProductColumn(props) {
    const { name, title, type, isSupplier, dataType, width = 140 } = props;
    const { __ } = this.context;

    const disabled = isSupplier;

    if (disabled && this.props.tenderCreation) return null;

    const render = (text, record) => {
      let defaultValue = record[name];

      if (name === 'document' && defaultValue) defaultValue = __(record[name]);

      const inputProps = {
        defaultValue,
        disabled,
        type: type,
        onChange: e => this.onProductInputChange(e, name, record.key, dataType)
      };

      if (dataType === 'eightDigit') {
        inputProps.placeholder = 'Must be less than 8 digits';
        inputProps.maxLength = '8';
      }

      let control = <Input {...inputProps} />;

      if (type === 'uploader') {
        control = (
          <Uploader
            defaultFileList={[record[name]]}
            disabled={disabled}
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
        width={width}
      />
    );
  }
}

TenderForm.propTypes = {
  data: PropTypes.object
};

export default TenderForm;
