import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Button, Modal, Tag } from 'antd';
import moment from 'moment';

import router from 'modules/common/router';
import { Paginator } from 'modules/common/components';
import { dateTimeFormat } from 'modules/common/constants';
import LogFilter from './LogFilter';
import LogModalContainer from '../containers/LogModalContainer';

export default class Logs extends React.Component {
  constructor(props) {
    super(props);

    const qp = props.qp || {
      start: '',
      end: '',
      userId: '',
      action: '',
      type: '',
    };

    this.filter = {
      start: qp.start,
      end: qp.end,
      userId: qp.userId,
      action: qp.action,
      type: qp.type,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.search = this.search.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false,
      logId: '',
    };
  }

  onFilterChange({ value, name }) {
    this.filter[name] = value;
  }

  search() {
    const { history, refetch } = this.props;

    router.setParams(history, this.filter);

    refetch();
  }

  toggleModal(logId) {
    this.setState({
      showModal: !this.state.showModal,
      logId,
    });
  }

  render() {
    const { logs, totalCount, users } = this.props;

    const tableHeader = [
      {
        title: 'Date',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: value => {
          return moment(value).format(dateTimeFormat);
        },
      },
      {
        title: 'Created by',
        key: 'unicode',
        dataIndex: 'unicode',
      },
      {
        title: 'Module',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        render: value => {
          let colorClass = '';

          switch (value) {
            case 'create':
              colorClass = 'success';
              break;
            case 'update':
              colorClass = 'warning';
              break;
            case 'delete':
              colorClass = 'danger';
              break;
            default:
              break;
          }

          return <span className={`data-label ${colorClass}`}>{value}</span>;
        },
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        render: value => {
          return <Tag color="blue">{value}</Tag>;
        },
      },
      {
        title: 'View changes',
        render: log => {
          return <Button icon="eye" type="default" onClick={() => this.toggleModal(log._id)} />;
        },
      },
    ];

    const logData = logs.find(l => l._id === this.state.logId);

    return (
      <Card title="User action logs">
        <Modal
          title="View changes"
          visible={this.state.showModal}
          footer={null}
          onCancel={this.toggleModal}
          width={window.innerWidth * 0.85}
        >
          {<LogModalContainer log={logData} />}
        </Modal>
        <LogFilter
          filter={this.filter}
          onFilterChange={this.onFilterChange}
          users={users}
          search={this.search}
        />
        <Table columns={tableHeader} rowKey={log => log._id} dataSource={logs} pagination={false} />
        <Paginator total={totalCount} />
      </Card>
    );
  }
}

Logs.propTypes = {
  logs: PropTypes.array,
  totalCount: PropTypes.number,
  qp: PropTypes.object,
  users: PropTypes.array,
  history: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};
