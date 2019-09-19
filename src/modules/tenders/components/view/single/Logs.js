/* eslint-disable react/display-name */
import React from 'react';
import { Card, Table, Tag } from 'antd';
import PropTypes from 'prop-types';

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
    render: value => {
      let className = '';

      switch (value) {
        case 'award':
        case 'create':
        case 'publish':
          className = 'success';
          break;
        case 'edit':
        case 'extend':
        case 'reopen':
          className = 'warning';
          break;
        case 'cancel':
        case 'close':
        case 'remove':
          className = 'danger';
          break;
        default:
          break;
      }

      return <span className={`data-label ${className}`}>{value}</span>;
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 4,
    render: value => {
      return <Tag color="blue">{value}</Tag>;
    },
  },
];

const List = props => {
  const { logs, totalCount } = props;

  return (
    <Card>
      <Table columns={columns} rowKey={({ _id }) => _id} dataSource={logs} pagination={false} />
      <Paginator total={totalCount} paramPrefix="log" />
    </Card>
  );
};

List.propTypes = {
  logs: PropTypes.array,
  totalCount: PropTypes.number,
};

export default List;
