import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { editTenderPath } from '../../../common/constants';
import { tenderColumns } from '../../constants';

const propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

function createEditLink(record) {
  return <Link to={`${editTenderPath}/${record.number}`}>Edit</Link>;
}

function Tenders({ title, data, pagination, loading, onChange }) {
  tenderColumns[tenderColumns.length - 1].render = record =>
    createEditLink(record);

  return (
    <Card bordered={false} title={title}>
      <Table
        columns={tenderColumns}
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
