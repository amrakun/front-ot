/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Divider, Popconfirm } from 'antd';
import { dateFormat } from 'modules/common/constants';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Search } from 'modules/common/components';
import ModalForm from './ModalForm';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editModalVisible: false,
      selectedAudit: {}
    };

    this.columns = this.columns.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }

  edit(record) {
    this.setState({
      selectedAudit: record,
      editModalVisible: true
    });
  }

  remove(id) {
    this.props.removePhysicalAudit(id);
  }

  hideEditModal() {
    this.setState({ editModalVisible: false });
  }

  columns() {
    return [
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Qualification',
        render: record => (record.isQualified ? 'Yes' : 'No')
      },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Report',
        render: record =>
          record.reportFile ? (
            <a href={record.reportFile} target="_blank">
              View
            </a>
          ) : (
            '-'
          )
      },
      {
        title: 'Improvement plan',
        render: record =>
          record.improvementPlanFile ? (
            <a href={record.improvementPlanFile} target="_blank">
              View
            </a>
          ) : (
            '-'
          )
      },
      {
        title: 'Action',
        render: record => (
          <span>
            <a onClick={() => this.edit(record)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure remove this audit?"
              onConfirm={() => this.remove(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <a>Remove</a>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  render() {
    const { pagination, loading, onChange, editPhysicalAudit } = this.props;
    const data = this.props.data || [];
    const { editModalVisible, selectedAudit } = this.state;

    return (
      <Card title="Physical audit responses">
        <Search />
        <div style={{ height: '48px' }} />
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          scroll={{ x: 800 }}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />

        <ModalForm
          visible={editModalVisible}
          onSubmit={inputs =>
            editPhysicalAudit({
              supplierId: selectedAudit.supplier._id,
              _id: selectedAudit._id,
              ...inputs
            })
          }
          hideModal={this.hideEditModal}
          data={selectedAudit}
        />
      </Card>
    );
  }
}

AuditResponses.propTypes = {
  pagination: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  editPhysicalAudit: PropTypes.func,
  removePhysicalAudit: PropTypes.func
};

export default withRouter(AuditResponses);
