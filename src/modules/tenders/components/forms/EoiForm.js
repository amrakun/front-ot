import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { eoiProductsColumns } from '../../constants';

const EoiForm = props => {
  const rpc = eoiProductsColumns;
  const { products, renderProductColumn, isSupplier = true } = props;

  return (
    <Table
      className="margin form-table"
      dataSource={products}
      pagination={false}
      size="middle"
    >
      {renderProductColumn({ name: 'document', title: rpc.document })}
      {renderProductColumn({
        name: 'isSubmitted',
        title: rpc.isSubmitted,
        type: 'select',
        isSupplier
      })}
      {renderProductColumn({
        name: 'documentFileName',
        title: rpc.documentFileName,
        isSupplier
      })}
      {renderProductColumn({ name: 'notes', title: rpc.notes, isSupplier })}
    </Table>
  );
};

EoiForm.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool
};

export default EoiForm;
