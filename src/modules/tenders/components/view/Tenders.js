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
import { tenderColumns, supplierTenderColumns, labels } from '../../constants';

const propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  supplier: PropTypes.bool
};

function createBuyerLinks(_id) {
  return (
    <div>
      <Link to={`${viewTender.path}/${_id}`}>View</Link>
      <span className="ant-divider" />
      <Link to={`${editTender.path}/${_id}`}>Edit</Link>
    </div>
  );
}

function createSupplierLinks(_id) {
  return (
    <div style={{ width: '160px' }}>
      <Link to={`${submitTender.path}/${_id}`}>More</Link>
      <span className="ant-divider" />
      <Link to={supDash.path}>Not intereseted</Link>
    </div>
  );
}

function Tenders({ type, data, pagination, loading, onChange, supplier }) {
  let columns = tenderColumns;
  if (supplier) columns = supplierTenderColumns;

  columns[columns.length - 1].render = record =>
    supplier ? createSupplierLinks(record._id) : createBuyerLinks(record._id);

  return (
    <Card
      bordered={false}
      style={{ marginBottom: '16px' }}
      title={labels[type]}
    >
      <Table
        columns={columns}
        rowKey={record => record._id}
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
