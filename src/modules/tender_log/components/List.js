import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Date',
    dataIndex: 'createdAt',
    render: timestap => new Date(timestap).toLocaleString(),
    width: 150,
    key: 1,
  },
  {
    title: 'User',
    render: record => {
      const { user, isAuto } = record;
      if (isAuto) return 'oyusystem';
      else return user.username + '<' + user.email + '>';
    },
    key: 2,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 3,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 4,
  },
];

const List = props => (
  <>
    <h1>logs</h1>
    <pre>{JSON.stringify(props, null, 4)}</pre>
    <Table
      columns={columns}
      rowKey={({ _id }) => _id}
      dataSource={props.data.tenderLog}
      pagination={true}
    />
  </>
);

export default List;
