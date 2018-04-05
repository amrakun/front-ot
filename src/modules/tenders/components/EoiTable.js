import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { eoiProductsColumns } from '../constants';

const rpc = eoiProductsColumns;

class EoiTable extends Component {
  render() {
    const { __ } = this.context;
    const { renderProductColumn, isSupplier = true } = this.props;

    let { products } = this.props;

    products = products.map(product => {
      product.document = __(product.document);
      return product;
    });

    return (
      <Table
        className="margin form-table"
        dataSource={products}
        pagination={false}
        size="middle"
        scroll={{ x: 600, y: '65vh' }}
      >
        {renderProductColumn({
          name: 'document',
          title: __(rpc.document),
          isSupplier
        })}
        {renderProductColumn({
          name: 'isSubmitted',
          title: __(rpc.isSubmitted),
          type: 'checkbox',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'file',
          title: __('Upload'),
          type: 'uploader',
          isSupplier: !isSupplier,
          widt: '100px'
        })}
        {renderProductColumn({
          name: 'notes',
          title: __(rpc.notes),
          isSupplier: !isSupplier
        })}
      </Table>
    );
  }
}

EoiTable.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool
};

EoiTable.contextTypes = {
  __: PropTypes.func
};

export default EoiTable;
