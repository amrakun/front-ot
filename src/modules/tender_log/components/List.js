import React from 'react';
import { Row, Button, Table, Icon, Card, Modal, Divider } from 'antd';

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
    dataIndex: 'user',
    render: user => (user ? user.username + '<' + user.email + '>' : null),
    key: 2,
  },
  {
    title: 'Is auto?',
    dataIndex: 'isAuto',
    render: isAuto => (isAuto ? <Icon type="check" /> : null),
    key: 3,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 4,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 5,
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
