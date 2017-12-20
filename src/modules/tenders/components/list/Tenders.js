import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import {
  editTender,
  viewTender,
  submitTender,
  supDash
} from 'modules/common/paths';
import { tenderColumns, supplierTenderColumns } from '../../constants';

const propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  supplier: PropTypes.bool
};

function createBuyerLinks(record) {
  return (
    <div>
      <Link to={`${viewTender.path}/${record.number}`}>View</Link> |
      <Link to={`${editTender.path}/${record.number}`}>Edit</Link>
    </div>
  );
}

function createSupplierLinks(record) {
  return (
    <div style={{ width: '160px' }}>
      <Link to={`${submitTender.path}/${record.number}`}>More</Link> |
      <Link to={supDash.path}>Not intereseted</Link>
    </div>
  );
}

function Tenders({ type, data, pagination, loading, onChange, supplier }) {
  let columns = tenderColumns;
  if (supplier) columns = supplierTenderColumns;

  columns[columns.length - 1].render = record =>
    supplier ? createSupplierLinks(record) : createBuyerLinks(record);

  return (
    <Card bordered={false} style={{ marginBottom: '16px' }} title={type}>
      <Table
        columns={columns}
        rowKey={record => record.number}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={(pagination, filters, sorter) =>
          onChange(pagination, filters, sorter)
        }
      />
    </Card>
  );
}

Tenders.propTypes = propTypes;

export default withRouter(Tenders);
