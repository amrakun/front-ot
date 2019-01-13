import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Table, Input } from 'antd';
import { rfqProductsColumns as rpc } from '../../constants';
import { generateTemplateUrl } from 'modules/common/utils';
import {
  controlValueParser,
  tableFileHandler,
  collectProducts
} from '../utils';

const { Column } = Table;

class RfqTable extends Component {
  constructor(props, context) {
    super(props, context);

    const { requestedProducts } = props;

    const products = [];
    const perProductStates = {};

    requestedProducts.forEach(product => {
      const key = Math.random();
      const extendedProduct = { key, ...product };

      products.push(extendedProduct);

      perProductStates[`product__${key}`] = extendedProduct;
    });

    this.state = {
      products,
      ...perProductStates
    };

    if (this.state.products.length === 0) {
      this.state.products = [{ key: Math.random() }];
    }

    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.addProductRow = this.addProductRow.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  addProductRow() {
    const { products } = this.state;

    products.push({ key: Math.random() });

    this.setState({ products });
  }

  handleFile(e) {
    tableFileHandler({
      e,
      state: this.state,
      callback: stateDoc => {
        this.setState(stateDoc, this.onChange);
      }
    });
  }

  onChange() {
    return this.props.onChange(collectProducts(this.state));
  }

  onProductInputChange(e, name, recordKey, dataType) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    product[name] = controlValueParser({ e, dataType });

    this.setState({ [stateKey]: product }, () => this.onChange());
  }

  renderCell(options) {
    const { name, title, type, dataType, width = 140 } = options;

    const render = (text, record) => {
      let defaultValue = record[name];

      const inputProps = {
        defaultValue,
        type: type,
        onChange: e => this.onProductInputChange(e, name, record.key, dataType)
      };

      if (dataType === 'eightDigit') {
        inputProps.placeholder = 'Must be less than 8 digits';
        inputProps.maxLength = '8';
      }

      return <Input {...inputProps} />;
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

  renderTable() {
    const { __ } = this.context;
    const { products } = this.state;

    return (
      <Table
        className="form-table"
        dataSource={products}
        pagination={false}
        size="middle"
        scroll={{
          x: 1000,
          y: '65vh'
        }}
      >
        {this.renderCell({
          name: 'code',
          title: __(rpc.code),
          dataType: 'eightDigit'
        })}
        {this.renderCell({
          name: 'purchaseRequestNumber',
          title: __(rpc.purchaseRequestNumber),
          type: 'number',
          dataType: 'eightDigit'
        })}
        {this.renderCell({
          name: 'shortText',
          title: __(rpc.shortText)
        })}
        {this.renderCell({
          name: 'quantity',
          title: __(rpc.quantity),
          type: 'float',
          dataType: 'float'
        })}
        {this.renderCell({
          name: 'uom',
          title: __(rpc.uom)
        })}
        {this.renderCell({
          name: 'manufacturer',
          title: __(rpc.manufacturer)
        })}
        {this.renderCell({
          name: 'manufacturerPartNumber',
          title: __(rpc.manufacturerPart),
          type: 'number',
          dataType: 'eightDigit'
        })}
      </Table>
    );
  }

  render() {
    const { __ } = this.context;
    const requestUrl = generateTemplateUrl('rfq_requested_products');

    return (
      <Card title="Form" className="margin">
        <div>
          <div className="table-operations margin">
            <Button onClick={() => window.open(requestUrl)}>
              {__('Download template')}
              <Icon type="download" />
            </Button>

            <div className="upload-btn-wrapper">
              <Button>
                {__('Import excel file')} <Icon type="file-excel" />
              </Button>
              <input
                type="file"
                className="ant-btn"
                onChange={this.handleFile}
                value={this.state.file}
              />
            </div>
          </div>
          {this.renderTable()}
        </div>

        <Button
          className="dashed-button-big"
          size="large"
          onClick={this.addProductRow}
        >
          <Icon type="plus" /> Add row
        </Button>
      </Card>
    );
  }
}

RfqTable.propTypes = {
  requestedProducts: PropTypes.array,
  onChange: PropTypes.func
};

RfqTable.contextTypes = {
  __: PropTypes.func
};

export default RfqTable;
