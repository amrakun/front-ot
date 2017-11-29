import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card } from 'antd';

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Open',
        value: 'open'
      },
      {
        text: 'Draft',
        value: 'draft'
      },
      {
        text: 'Closed',
        value: 'closed'
      }
    ]
  },
  {
    title: 'Tender #',
    dataIndex: 'tender_number',
    sorter: true
  },
  {
    title: 'Tender name',
    dataIndex: 'tender_name'
  },
  {
    title: 'Publish date',
    dataIndex: 'publish_date'
  },
  {
    title: 'Close date',
    dataIndex: 'close_date'
  },
  {
    title: 'Suppliers',
    dataIndex: 'suppliers'
  },
  {
    title: 'Sumbitted',
    dataIndex: 'submitted'
  },
  {
    title: 'Not interested',
    dataIndex: 'not_interested'
  },
  {
    title: 'Not responded',
    dataIndex: 'not_responded'
  },
  {
    title: 'Regret letter',
    dataIndex: 'regret_letter'
  },
  {
    title: 'Operation',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="">More</a>
  }
];

const propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

function RfqList({ data, pagination, loading, onChange }) {
  return (
    <Card title="Request for quotation (RFQ)">
      <Table
        columns={columns}
        rowKey={record => record.registered}
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

RfqList.propTypes = propTypes;

export default withRouter(RfqList);
