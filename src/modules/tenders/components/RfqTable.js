import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Alert, Col, Row } from 'antd';
import { rfqProductsColumns, rfqDisclaimer } from '../constants';

const RfqTable = props => {
  const rpc = rfqProductsColumns;
  const { products, renderProductColumn, isSupplier = true } = props;

  return (
    <div>
      <Row>
        <Col xl={12} lg={18}>
          <Alert
            message={rfqDisclaimer.title}
            description={rfqDisclaimer.description.map((i, index) => (
              <p key={index}>{i}</p>
            ))}
            type="info"
          />
        </Col>
      </Row>
      <div className="table-operations margin">
        <Button disabled>
          Download template
          <Icon type="download" />
        </Button>
        <Button disabled>
          Import materials
          <Icon type="file-excel" />
        </Button>
      </div>
      <Table
        className="form-table"
        dataSource={products}
        pagination={false}
        size="middle"
        scroll={{ x: 3000 }}
      >
        {renderProductColumn({ name: 'code', title: rpc.code, isSupplier })}
        {renderProductColumn({
          name: 'purchaseRequestNumber',
          title: rpc.purchaseRequestNumber,
          type: 'number',
          isSupplier
        })}
        {renderProductColumn({
          name: 'shortText',
          title: rpc.shortText,
          isSupplier
        })}
        {renderProductColumn({
          name: 'quantity',
          title: rpc.quantity,
          type: 'number',
          isSupplier
        })}
        {renderProductColumn({ name: 'uom', title: rpc.uom, isSupplier })}
        {renderProductColumn({
          name: 'manufacturer',
          title: rpc.manufacturer,
          isSupplier
        })}
        {renderProductColumn({
          name: 'manufacturerPartNumber',
          title: rpc.manufacturerPart,
          type: 'number',
          isSupplier
        })}
        {renderProductColumn({
          name: 'suggestedManufacturer',
          title: rpc.suggestedManufacturer,
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'suggestedManufacturerPartNumber',
          title: rpc.suggestedManufacturerPart,
          type: 'number',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'unitPrice',
          title: rpc.unitPrice,
          type: 'number',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'totalPrice',
          title: rpc.totalPrice,
          type: 'number',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'leadTime',
          title: rpc.leadTime,
          type: 'number',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'shippingTerms',
          title: rpc.shippingTerms,
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'comment',
          title: rpc.comment,
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'file',
          title: rpc.picture,
          type: 'uploader',
          isSupplier: !isSupplier
        })}
      </Table>
    </div>
  );
};

RfqTable.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool
};

export default RfqTable;
