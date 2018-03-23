import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Alert, Col, Row } from 'antd';
import { rfqProductsColumns as rpc, rfqDisclaimer } from '../constants';

class RfqTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: ''
    };

    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    this.props.handleFile(e);

    this.setState({ file: '' });
  }

  render() {
    const { __ } = this.context;
    const {
      products,
      renderProductColumn,
      isSupplier = true,
      generateTemplate,
      tenderCreation
    } = this.props;

    const scroll = {
      x: tenderCreation ? 1000 : 3200,
      y: '65vh'
    };

    const { REACT_APP_API_URL } = process.env;
    const requestUrl = `${
      REACT_APP_API_URL
    }/static/templates/rfq_requested_products.xlsx`;

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
          <Button
            onClick={() =>
              isSupplier ? generateTemplate() : window.open(requestUrl)
            }
          >
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
        <Table
          className="form-table"
          dataSource={products}
          pagination={false}
          size="middle"
          scroll={scroll}
        >
          {renderProductColumn({
            name: 'code',
            title: __(rpc.code),
            isSupplier
          })}
          {renderProductColumn({
            name: 'purchaseRequestNumber',
            title: __(rpc.purchaseRequestNumber),
            type: 'number',
            isSupplier,
            dataType: 'eightDigit'
          })}
          {renderProductColumn({
            name: 'shortText',
            title: __(rpc.shortText),
            isSupplier
          })}
          {renderProductColumn({
            name: 'quantity',
            title: __(rpc.quantity),
            type: 'number',
            isSupplier,
            dataType: 'float'
          })}
          {renderProductColumn({
            name: 'uom',
            title: __(rpc.uom),
            isSupplier
          })}
          {renderProductColumn({
            name: 'manufacturer',
            title: __(rpc.manufacturer),
            isSupplier
          })}
          {renderProductColumn({
            name: 'manufacturerPartNumber',
            title: __(rpc.manufacturerPart),
            type: 'number',
            isSupplier,
            dataType: 'eightDigit'
          })}
          {renderProductColumn({
            name: 'suggestedManufacturer',
            title: __(rpc.suggestedManufacturer),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'suggestedManufacturerPartNumber',
            title: __(rpc.suggestedManufacturerPart),
            type: 'number',
            isSupplier: !isSupplier,
            dataType: 'eightDigit'
          })}
          {renderProductColumn({
            name: 'unitPrice',
            title: __(rpc.unitPrice),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'leadTime',
            title: __(rpc.leadTime),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'shippingTerms',
            title: __(rpc.shippingTerms),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'comment',
            title: __(rpc.comment),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'file',
            title: __(rpc.picture),
            type: 'uploader',
            isSupplier: !isSupplier
          })}
        </Table>
      </div>
    );
  }
}

RfqTable.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool,
  handleFile: PropTypes.func,
  generateTemplate: PropTypes.func,
  tenderCreation: PropTypes.bool
};

RfqTable.contextTypes = {
  __: PropTypes.func
};

export default RfqTable;
