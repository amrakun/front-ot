import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { eoiProductsColumns } from '../constants';
import { defineMessages } from 'react-intl';

const rpc = eoiProductsColumns;

class EoiTable extends Component {
  render() {
    const { products, renderProductColumn, isSupplier = true } = this.props;
    const { formatMessage } = this.context;

    const messages = defineMessages({
      eoiDocument: {
        id: 'eoiDocument',
        defaultMessage: rpc.document
      },
      eoiSubmitted: {
        id: 'eoiSubmitted',
        defaultMessage: rpc.isSubmitted
      },
      eoiUpload: {
        id: 'eoiUpload',
        defaultMessage: 'Upload'
      },
      eoiNotes: {
        id: 'eoiNotes',
        defaultMessage: rpc.notes
      }
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
          title: formatMessage(messages.eoiDocument),
          isSupplier
        })}
        {renderProductColumn({
          name: 'isSubmitted',
          title: formatMessage(messages.eoiSubmitted),
          type: 'checkbox',
          isSupplier: !isSupplier
        })}
        {renderProductColumn({
          name: 'file',
          title: formatMessage(messages.eoiUpload),
          type: 'uploader',
          isSupplier: !isSupplier,
          widt: '100px'
        })}
        {renderProductColumn({
          name: 'notes',
          title: formatMessage(messages.eoiNotes),
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
  formatMessage: PropTypes.func
};

export default EoiTable;
