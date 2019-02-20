import React from 'react';
import { Table } from 'antd';
import { Paginator } from 'modules/common/components';

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

const List = props => {
  const { logs, totalCount } = props;

  return (
    <>
      <Table
        columns={columns}
        rowKey={({ _id }) => _id}
        dataSource={logs}
        pagination={false}
      />
      <Paginator total={totalCount} paramPrefix="log" />
    </>
  );
};

export default List;
