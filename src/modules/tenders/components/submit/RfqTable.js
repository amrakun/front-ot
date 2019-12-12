import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Button, Icon, Alert, Col, Row, Input, message } from 'antd';
import validator from 'validator';
import { rfqProductsColumns as rpc, rfqDisclaimer } from '../../constants';
import { Uploader } from 'modules/common/components';
import { xlsxHandler } from 'modules/common/utils';
import { controlValueParser, collectProducts } from '../utils';

const { Column } = Table;
const { Option } = Select;

class RfqTable extends Component {
  constructor(props, context) {
    super(props, context);

    const { requestedProducts, respondedProducts } = props;

    const products = [];
    const perProductStates = {};

    // data initialization
    if (requestedProducts) {
      requestedProducts.forEach((product, i) => {
        const productResponse = respondedProducts.find(rp => rp.id === product.id) || {};
        const extendedProduct = { ...product, ...productResponse };

        products.push(extendedProduct);

        perProductStates[`product__${product.id}`] = extendedProduct;
      });
    }

    this.state = {
      products,
      ...perProductStates,
    };

    this.handleFile = this.handleFile.bind(this);
    this.onProductInputChange = this.onProductInputChange.bind(this);
    this.onProductFileChange = this.onProductFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    return this.props.onChange(collectProducts(this.state));
  }

  onProductFileChange(files, name, recordId) {
    const stateKey = `product__${recordId}`;
    const product = this.state[stateKey] || { id: recordId };

    product[name] = files ? files[0] : null;

    this.setState({ [stateKey]: product }, () => this.onChange());
  }

  async onProductInputChange(e, name, recordId, dataType) {
    const stateKey = `product__${recordId}`;

    const product = this.state[stateKey] || { id: recordId };

    product[name] = controlValueParser({ e, dataType });

    await this.setState({ [stateKey]: product }, () => this.onChange());
  }

  handleFile(e) {
    const { products } = this.state;
    const { requestedProducts } = this.props;

    xlsxHandler({
      e,
      parse: false,
      success: data => {
        const errors = [];
        const docs = [];

        for (const [index, row] of data.entries()) {
          if (index + 1 > requestedProducts.length) {
            continue;
          }

          const doc = {
            unitPrice: row[7],
            currency: row[8] || '',
            leadTime: row[9],
            shippingTerms: row[10] || '',
            alternative: row[11] || '',
            suggestedManufacturer: row[12] || '',
            suggestedManufacturerPartNumber: row[13] || '',
            comment: row[14] || '',
          };

          if (doc.unitPrice && !doc.alternative) {
            errors.push(`Input a value in a field "alternative" on line ${index + 2}`);
          }

          if (doc.unitPrice && !validator.isFloat((doc.unitPrice || '').toString())) {
            errors.push(`Invalid unit price on line ${index + 2}`);
          }

          if (!['', 'MNT', 'USD'].includes(doc.currency)) {
            errors.push(`Invalid currency on line ${index + 2}`);
          }

          if (doc.leadTime && !validator.isInt((doc.leadTime || '').toString())) {
            errors.push(`Invalid lead time on line ${index + 2}. Lead time must be integer number`);
          }

          if (
            ![
              '',
              'DDP - OT UB warehouse',
              'DDP - OT site',
              'FCA - Supplier Facility',
              'EXW',
            ].includes(doc.shippingTerms)
          ) {
            errors.push(`Invalid shipping terms on line ${index + 2}`);
          }

          if (!['', 'Yes', 'No'].includes(doc.alternative)) {
            errors.push(`Invalid alternative on line ${index + 2}`);
          }

          docs.push(doc);
        }

        if (errors.length > 0) {
          return message.error(errors[0]);
        }

        const perProductStates = {};

        for (const [index, doc] of docs.entries()) {
          const product = { ...products[index] };
          products[index] = { ...product, ...doc };
          perProductStates[`product__${product.key}`] = products[index];
        }

        this.setState({ products, ...perProductStates }, () => this.onChange());
      },
    });
  }

  renderCell(props) {
    const { name, title, type, width = 140, options } = props;
    const disabled = !type;

    const render = (text, record) => {
      let value = record[name];

      const inputProps = {
        value,
        disabled,
        type,
        onChange: e => this.onProductInputChange(e, name, record.id),
      };

      let control = <Input {...inputProps} />;

      if (type === 'select') {
        control = (
          <Select value={value} onChange={e => this.onProductInputChange(e, name, record.id)}>
            {options()}
          </Select>
        );
      }

      if (type === 'uploader') {
        control = (
          <Uploader
            defaultFileList={[record[name]]}
            disabled={disabled}
            onChange={files => this.onProductFileChange(files, name, record.id)}
          />
        );
      }

      return control;
    };

    return <Column title={title} key={name} dataIndex={name} render={render} width={width} />;
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
            y: '65vh',
          }}
        >
          {this.renderCell({
            name: 'code',
            title: __(rpc.code),
          })}
          {this.renderCell({
            name: 'purchaseRequestNumber',
            title: __(rpc.purchaseRequestNumber),
          })}
          {this.renderCell({
            name: 'shortText',
            title: __(rpc.shortText),
          })}
          {this.renderCell({
            name: 'quantity',
            title: __(rpc.quantity),
          })}
          {this.renderCell({
            name: 'uom',
            title: __(rpc.uom),
          })}
          {this.renderCell({
            name: 'manufacturer',
            title: __(rpc.manufacturer),
          })}
          {this.renderCell({
            name: 'manufacturerPartNumber',
            title: __(rpc.manufacturerPart),
          })}
          {this.renderCell({
            name: 'unitPrice',
            title: __(rpc.unitPrice),
            type: 'number',
          })}
          <Column
            title={__(rpc.totalPrice)}
            key={'totalPrice'}
            width={140}
            render={(text, record) => {
              if (!record.unitPrice || !record.quantity) {
                return <Input disabled value="" />;
              }

              return (
                <Input disabled value={(record.unitPrice * record.quantity).toLocaleString()} />
              );
            }}
          />
          {this.renderCell({
            name: 'currency',
            title: __(rpc.currency),
            type: 'select',
            options: () => {
              return [
                <Option key="0" value="-" />,
                <Option key="1" value="MNT">
                  MNT
                </Option>,
                <Option key="2" value="USD">
                  USD
                </Option>,
              ];
            },
          })}
          {this.renderCell({
            name: 'leadTime',
            title: __(rpc.leadTime),
            type: 'number',
          })}
          {this.renderCell({
            name: 'shippingTerms',
            title: __(rpc.shippingTerms),
            type: 'select',
            options: () => {
              return [
                <Option key="0" value="-" />,
                <Option key="1" value="DDP - OT UB warehouse">
                  DDP - OT UB warehouse
                </Option>,
                <Option key="2" value="DDP - OT site">
                  DDP - OT site
                </Option>,
                <Option key="3" value="FCA - Supplier Facility">
                  FCA - Supplier Facility
                </Option>,
                <Option key="4" value="EXW">
                  EXW
                </Option>,
              ];
            },
          })}
          {this.renderCell({
            name: 'alternative',
            title: __(rpc.alternative),
            type: 'select',
            options: () => {
              return [
                <Option key="0" value="-" />,
                <Option key="1" value="Yes">
                  Yes
                </Option>,
                <Option key="2" value="No">
                  No
                </Option>,
              ];
            },
          })}
          {this.renderCell({
            name: 'suggestedManufacturer',
            title: __(rpc.suggestedManufacturer),
            type: 'string',
          })}
          {this.renderCell({
            name: 'suggestedManufacturerPartNumber',
            title: __(rpc.suggestedManufacturerPart),
            type: 'string',
          })}
          {this.renderCell({
            name: 'comment',
            title: __(rpc.comment),
            type: 'string',
          })}
          {this.renderCell({
            name: 'file',
            title: __(rpc.picture),
            type: 'uploader',
            width: 200,
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
  generateTemplate: PropTypes.func,
};

RfqTable.contextTypes = {
  __: PropTypes.func,
};

export default RfqTable;
