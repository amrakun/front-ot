import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Alert, Col, Row, Input } from 'antd';
import { rfqProductsColumns as rpc, rfqDisclaimer } from '../../constants';
import { Uploader } from 'modules/common/components';
import {
  controlValueParser,
  tableFileHandler,
  collectProducts
} from '../utils';

const { Column } = Table;

class RfqTable extends Component {
  constructor(props, context) {
    super(props, context);

    const { requestedProducts, respondedProducts } = props;

    const products = [];
    const perProductStates = {};

    // data initialization
    if (requestedProducts) {
      requestedProducts.forEach((product, i) => {
        const productResponse = respondedProducts[i];
        const key = Math.random();
        const extendedProduct = { key, ...product, ...productResponse };

        products.push(extendedProduct);

        perProductStates[`product__${key}`] = extendedProduct;
      });
    }

    this.state = {
      products,
      ...perProductStates
    };

    this.handleFile = this.handleFile.bind(this);
    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.onProductFileChange = this.onProductFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    return this.props.onChange(collectProducts(this.state));
  }

  onProductFileChange(files, name, recordKey) {
    const stateKey = `product__${recordKey}`;
    const product = this.state[stateKey] || {};

    product[name] = files ? files[0] : null;

    this.setState({ [stateKey]: product }, () => this.onChange());
  }

  onProductInputChange(e, name, recordKey, dataType) {
    const stateKey = `product__${recordKey}`;

    const product = this.state[stateKey] || {};

    product[name] = controlValueParser({ e, dataType });

    this.setState({ [stateKey]: product }, () => this.onChange());
  }

  handleFile(e) {
    tableFileHandler({
      e,
      state: this.state,
      callback: stateDoc => {
        this.setState(stateDoc, () => this.onChange());
      }
    });
  }

  renderCell(options) {
    const { name, title, type, width = 140 } = options;
    const disabled = !type;

    const render = (text, record) => {
      let defaultValue = record[name];

      const inputProps = {
        defaultValue,
        disabled,
        type,
        onChange: e => this.onProductInputChange(e, name, record.key)
      };

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

  render() {
    const { __ } = this.context;
    const { generateTemplate } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Row>
          <Col xl={12} lg={18}>
            <Alert
              description={__(rfqDisclaimer.description)}
              message={__(rfqDisclaimer.title)}
              type="info"
            />
          </Col>
        </Row>
        <div className="table-operations margin">
          <Button onClick={() => generateTemplate()}>
            {__('Download template')}
            <Icon type="download" />
          </Button>

          <div className="upload-btn-wrapper">
            <Button>
              {__('Import excel file')} <Icon type="file-excel" />
            </Button>
            <input type="file" className="ant-btn" onChange={this.handleFile} />
          </div>
        </div>
        <Table
          className="form-table"
          dataSource={products}
          pagination={false}
          size="middle"
          scroll={{
            x: 2000,
            y: '65vh'
          }}
        >
          {this.renderCell({
            name: 'code',
            title: __(rpc.code)
          })}
          {this.renderCell({
            name: 'purchaseRequestNumber',
            title: __(rpc.purchaseRequestNumber)
          })}
          {this.renderCell({
            name: 'shortText',
            title: __(rpc.shortText)
          })}
          {this.renderCell({
            name: 'quantity',
            title: __(rpc.quantity)
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
            title: __(rpc.manufacturerPart)
          })}
          {this.renderCell({
            name: 'suggestedManufacturer',
            title: __(rpc.suggestedManufacturer),
            type: 'string'
          })}
          {this.renderCell({
            name: 'suggestedManufacturerPartNumber',
            title: __(rpc.suggestedManufacturerPart),
            type: 'string'
          })}
          {this.renderCell({
            name: 'unitPrice',
            title: __(rpc.unitPrice),
            type: 'number'
          })}
          <Column
            title={__(rpc.totalPrice)}
            key={'totalPrice'}
            render={(text, record) => {
              if (!record.unitPrice || !record.quantity) {
                return '-----';
              }

              return (record.unitPrice * record.quantity).toLocaleString();
            }}
          />
          {this.renderCell({
            name: 'currency',
            title: __(rpc.currency),
            type: 'string'
          })}
          {this.renderCell({
            name: 'leadTime',
            title: __(rpc.leadTime),
            type: 'number'
          })}
          {this.renderCell({
            name: 'shippingTerms',
            title: __(rpc.shippingTerms),
            type: 'string'
          })}
          {this.renderCell({
            name: 'alternative',
            title: __(rpc.alternative),
            type: 'string'
          })}
          {this.renderCell({
            name: 'comment',
            title: __(rpc.comment),
            type: 'string'
          })}
          {this.renderCell({
            name: 'file',
            title: __(rpc.picture),
            type: 'uploader',
            width: 200
          })}
        </Table>
      </div>
    );
  }
}

RfqTable.propTypes = {
  requestedProducts: PropTypes.array,
  respondedProducts: PropTypes.array,
  onChange: PropTypes.func,
  generateTemplate: PropTypes.func
};

RfqTable.contextTypes = {
  __: PropTypes.func
};

export default RfqTable;
