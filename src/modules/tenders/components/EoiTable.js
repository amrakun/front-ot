import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { eoiProductsColumns } from '../constants';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const EoiTable = props => {
  const rpc = eoiProductsColumns;
  const { products, renderProductColumn, isSupplier = true } = props;
  const { formatMessage } = props.intl;
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
};

EoiTable.propTypes = {
  products: PropTypes.array,
  renderProductColumn: PropTypes.func,
  isSupplier: PropTypes.bool,
  intl: intlShape.isRequired
};

export default injectIntl(EoiTable);
