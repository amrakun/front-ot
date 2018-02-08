import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Alert, Col, Row } from 'antd';
import { rfqProductsColumns, rfqDisclaimer } from '../constants';
import { T } from 'modules/common/components';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const rpc = rfqProductsColumns;

class RfqTable extends Component {
  render() {
    const { formatMessage } = this.context;
    const {
      products,
      renderProductColumn,
      isSupplier = true,
      handleFile,
      generateTemplate
    } = this.props;

    const messages = defineMessages({
      rfqDisclaimerTitle: {
        id: 'rfqDisclaimerTitle',
        defaultMessage: rfqDisclaimer.title
      },
      rfqDisclaimer: {
        id: 'rfqDisclaimer',
        defaultMessage: rfqDisclaimer.description
      },
      rfqCode: {
        id: 'rfqCode',
        defaultMessage: rpc.code
      },
      rfqPurchaseRequestNumber: {
        id: 'rfqPurchaseRequestNumber',
        defaultMessage: rpc.purchaseRequestNumber
      },
      rfqShortText: {
        id: 'rfqShortText',
        defaultMessage: rpc.shortText
      },
      rfqQuantity: {
        id: 'rfqQuantity',
        defaultMessage: rpc.quantity
      },
      rfqUom: {
        id: 'rfqUom',
        defaultMessage: rpc.uom
      },
      rfqManufacturer: {
        id: 'rfqManufacturer',
        defaultMessage: rpc.manufacturer
      },
      rfqManufacturerPartNumber: {
        id: 'rfqManufacturerPartNumber',
        defaultMessage: rpc.manufacturerpart
      },
      rfqSuggestedManufacturer: {
        id: 'rfqSuggestedManufacturer',
        defaultMessage: rpc.suggestdManufacturer
      },
      rfqSuggestedManufacturerPartNumber: {
        id: 'rfqSuggestedManufacturerPartNumber',
        defaultMessage: rpc.suggestdManufacturerPart
      },
      rfqUnitPrice: {
        id: 'rfqUnitPrice',
        defaultMessage: rpc.unitPrice
      },
      rfqTotalPrice: {
        id: 'rfqTotalPrice',
        defaultMessage: rpc.totalPrice
      },
      rfqLeadTime: {
        id: 'rfqLeadTime',
        defaultMessage: rpc.leadTime
      },
      rfqShippingTerms: {
        id: 'rfqShippingTerms',
        defaultMessage: rpc.shippingTerms
      },
      rfqComment: {
        id: 'rfqComment',
        defaultMessage: rpc.comment
      },
      rfqFile: {
        id: 'rfqFile',
        defaultMessage: rpc.picture
      }
    });

    const { REACT_APP_API_URL } = process.env;
    const requestUrl = `${
      REACT_APP_API_URL
    }/static/templates/rfq_requested_products.xlsx`;

    return (
      <div>
        <Row>
          <Col xl={12} lg={18}>
            <Alert
              description={formatMessage(messages.rfqDisclaimer)}
              message={formatMessage(messages.rfqDisclaimerTitle)}
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
            <T id="rfqDownload">Download template</T>
            <Icon type="download" />
          </Button>

          <div className="upload-btn-wrapper">
            <Button>
              <T id="rfqImport">Import excel file</T> <Icon type="file-excel" />
            </Button>
            <input type="file" className="ant-btn" onChange={handleFile} />
          </div>
        </div>
        <Table
          className="form-table"
          dataSource={products}
          pagination={false}
          size="middle"
          scroll={{ x: 3200, y: '65vh' }}
        >
          {renderProductColumn({
            name: 'code',
            title: formatMessage(messages.rfqCode),
            isSupplier
          })}
          {renderProductColumn({
            name: 'purchaseRequestNumber',
            title: formatMessage(messages.rfqPurchaseRequestNumber),
            type: 'number',
            isSupplier
          })}
          {renderProductColumn({
            name: 'shortText',
            title: formatMessage(messages.rfqShortText),
            isSupplier
          })}
          {renderProductColumn({
            name: 'quantity',
            title: formatMessage(messages.rfqQuantity),
            type: 'number',
            isSupplier
          })}
          {renderProductColumn({
            name: 'uom',
            title: formatMessage(messages.rfqUom),
            isSupplier
          })}
          {renderProductColumn({
            name: 'manufacturer',
            title: formatMessage(messages.rfqManufacturer),
            isSupplier
          })}
          {renderProductColumn({
            name: 'manufacturerPartNumber',
            title: formatMessage(messages.rfqManufacturerPartNumber),
            type: 'number',
            isSupplier
          })}
          {renderProductColumn({
            name: 'suggestedManufacturer',
            title: formatMessage(messages.rfqSuggestedManufacturer),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'suggestedManufacturerPartNumber',
            title: formatMessage(messages.rfqSuggestedManufacturerPartNumber),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'unitPrice',
            title: formatMessage(messages.rfqUnitPrice),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'totalPrice',
            title: formatMessage(messages.rfqTotalPrice),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'leadTime',
            title: formatMessage(messages.rfqLeadTime),
            type: 'number',
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'shippingTerms',
            title: formatMessage(messages.rfqShippingTerms),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'comment',
            title: formatMessage(messages.rfqComment),
            isSupplier: !isSupplier
          })}
          {renderProductColumn({
            name: 'file',
            title: formatMessage(messages.rfqFile),
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
  generateTemplate: PropTypes.func
};

RfqTable.contextTypes = {
  formatMessage: PropTypes.func
};

export default RfqTable;
