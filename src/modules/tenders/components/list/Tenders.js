import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import {
  editTenderPath,
  viewTenderPath,
  submitTenderPath
} from '../../../common/constants';
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
      <Link to={`${viewTenderPath}/${record.number}`}>View</Link> |
      <Link to={`${editTenderPath}/${record.number}`}>Edit</Link>
    </div>
  );
}

function createSupplierLinks(record) {
  return (
    <div style={{ width: '160px' }}>
      <Link to={`${submitTenderPath}/${record.number}`}>More</Link> |
      <Link to="/rfq-and-eoi">Not intereseted</Link>
    </div>
  );
}

function Tenders({ type, data, pagination, loading, onChange, supplier }) {
  let columns = tenderColumns;
  if (supplier) columns = supplierTenderColumns;

  columns[columns.length - 1].render = record =>
    supplier ? createSupplierLinks(record) : createBuyerLinks(record);

  return (
    <Card bordered={false} title={type}>
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
