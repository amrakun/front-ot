import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { eoiProductsColumns } from '../constants';

const EoiTable = props => {
  const rpc = eoiProductsColumns;
  const { products, renderProductColumn, isSupplier = true } = props;

  return (
    <Table
      className="margin form-table"
      dataSource={products}
      pagination={false}
      size="middle"
    >
      {renderProductColumn({
        name: 'document',
        title: rpc.document,
        isSupplier
      })}
      {renderProductColumn({
        name: 'isSubmitted',
        title: rpc.isSubmitted,
        type: 'select',
        isSupplier: !isSupplier
      })}
      {renderProductColumn({
        name: 'notes',
        title: rpc.notes,
        isSupplier: !isSupplier
      })}
      {renderProductColumn({
        name: 'file',
        title: 'Upload',
        type: 'uploader',
        isSupplier: !isSupplier
      })}
    </Table>
  );
};

EoiTable.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool
};

export default EoiTable;
