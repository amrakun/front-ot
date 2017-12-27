import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { rfqProductsColumns } from '../../constants';

const RfqForm = props => {
  const rpc = rfqProductsColumns;
  const { products, renderProductColumn, isSupplier = true } = props;

  return (
    <Table
      className="margin form-table"
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
      {/* {renderProductColumn('shippingTerms', rpc.shippingTerms)} */}
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
  );
};

RfqForm.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool
};

export default RfqForm;
