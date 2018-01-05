import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Popconfirm, Input, DatePicker } from 'antd';
import { tenderColumns, supplierTenderColumns, labels } from '../../constants';
import { dateTimeFormat } from 'modules/common/constants';

const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

const Tenders = props => {
  const {
    type,
    data,
    pagination,
    loading,
    onChange,
    currentUser,
    notInterested
  } = props;

  const renderOperation = _id => {
    if (currentUser) {
      if (currentUser.isSupplier) {
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
      } else {
        return (
          <div>
            <Link to={`/tender/${_id}`}>View</Link>
            <span className="ant-divider" />
            <Link to={`/tender/edit/${_id}`}>Edit</Link>
          </div>
        );
      }
    } else {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/sign-in?required`}>More</Link>
        </div>
      );
    }
  };

  let columns = supplierTenderColumns;
  if (currentUser && !currentUser.isSupplier) columns = tenderColumns;

  columns[columns.length - 1].render = record => renderOperation(record._id);

  return (
    <Card style={{ marginBottom: '16px' }} title={labels[type]}>
      <div className="table-operations">
        <Search
          placeholder="Name or number"
          style={{ width: 200, float: 'left' }}
          onSearch={value => this.handleSearch(value)}
        />

        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format={dateTimeFormat}
          placeholder={['From', 'To']}
        />
      </div>
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
  currentUser: PropTypes.object,
  notInterested: PropTypes.func
};

export default withRouter(Tenders);
