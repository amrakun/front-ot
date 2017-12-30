import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Popconfirm } from 'antd';
import { tenderColumns, supplierTenderColumns, labels } from '../../constants';

const Tenders = props => {
  const {
    type,
    data,
    pagination,
    loading,
    onChange,
    supplier,
    notInterested
  } = props;

  const createBuyerLinks = _id => {
    return (
      <div>
        <Link to={`/tender/${_id}`}>View</Link>
        <span className="ant-divider" />
        <Link to={`/tender/edit/${_id}`}>Edit</Link>
      </div>
    );
  };

  const createSupplierLinks = _id => {
    return (
      <div style={{ width: '160px' }}>
        <Link to={`/tender/submit/${_id}`}>More</Link>
        <span className="ant-divider" />
        <Popconfirm
          title="Are you sure you are not interested？"
          placement="bottomRight"
          okText="Yes"
          cancelText="No"
          onConfirm={() => notInterested(_id)}
        >
          <a>Not interested</a>
        </Popconfirm>
      </div>
    );
  };

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
        rowClassName={record => {
          if (record.isAwarded) return 'highlight';
        }}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={(pagination, filters, sorter) =>
          onChange(pagination, filters, sorter)
        }
      />
    </Card>
  );
};

Tenders.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  supplier: PropTypes.bool,
  notInterested: PropTypes.func
};

export default withRouter(Tenders);
