/* eslint-disable react/display-name */

import { withApollo } from 'react-apollo';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import { Button, Select, Table, Card, Row, Modal, Icon, Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search } from 'modules/common/components';
import { dateTimeFormat, statusIcons } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import router from 'modules/common/router';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.columns = this.columns.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = { modal: { visible: false } };
  }

  onSelectChange(name, value) {
    router.setParams(this.props.history, { [name]: value });
  }

  hideModal() {
    this.setState({ modal: { visible: false } });
  }

  renderModal() {
    const { modal } = this.state;

    if (!modal.visible) {
      return null;
    }

    return (
      <Modal title={modal.title} onOk={this.hideModal} onCancel={this.hideModal} visible={true}>
        <div dangerouslySetInnerHTML={{ __html: modal.content }} />
      </Modal>
    );
  }

  renderQualifyButton(record) {
    const onView = () => {
      this.setState({
        modal: { visible: true, title: 'Email content', content: record.audit.content },
      });
    };

    if (record.status === 'invited') {
      return (
        <Button size="small" style={{ marginRight: '10px' }} onClick={onView}>
          View
        </Button>
      );
    }

    return (
      <>
        {record.auditStatus === 'closed' ? (
          <Button type="link" size="small" style={{ marginRight: '10px' }}>
            <Link
              to={{
                pathname: '/audit/qualify',
                state: {
                  supplierId: record.supplier._id,
                  auditId: record.audit._id,
                },
              }}
            >
              Edit
            </Link>
          </Button>
        ) : null}

        <Button size="small" style={{ marginRight: '10px' }} onClick={onView}>
          View
        </Button>
      </>
    );
  }

  renderReportButton(record) {
    if (!record.reportFile) {
      return '-';
    }

    return (
      <a
        href={readFileUrl(`${record.reportFile}`)}
        style={{ marginRight: '10px' }}
        target="__blank"
      >
        Download
      </a>
    );
  }

  renderImprovementPlanButton(record) {
    if (!record.improvementPlanFile) {
      return '-';
    }

    return (
      <a href={readFileUrl(record.improvementPlanFile)} target="__blank">
        Download
      </a>
    );
  }

  columns() {
    const data = this.props.data || [];

    return [
      {
        key: 1,
        title: '#',
        render: record => {
          return data.indexOf(record) + 1;
        },
      },
      {
        key: 9,
        title: 'Audit status',
        render: record => {
          const s = statusIcons[record.auditStatus];

          return (
            <Tooltip title={<span className="capitalize">{record.auditStatus}</span>}>
              <Icon
                type={s.type}
                style={{ color: s.color, fontSize: '20px', lineHeight: '12px' }}
              />
            </Tooltip>
          );
        },
      },
      {
        key: 4,
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName',
      },
      {
        key: 5,
        title: 'Vendor number',
        dataIndex: 'supplier.basicInfo.sapNumber',
      },
      {
        key: 20,
        title: 'Tier type',
        dataIndex: 'supplier.tierTypeDisplay',
      },
      {
        key: 2,
        title: 'Qualification status',
        render: record => record.qualificationStatusDisplay,
      },
      {
        key: 3,
        title: 'Supplier status',
        render: record => {
          if (record.status === 'invited') {
            return 'invited';
          }

          return 'submitted';
        },
      },
      {
        key: 6,
        title: 'Invited date',
        render: record => moment(record.audit.publishDate).format(dateTimeFormat),
      },
      {
        key: 7,
        title: 'Close date',
        render: record => moment(record.audit.closeDate).format(dateTimeFormat),
      },
      {
        key: 23,
        title: 'Editable date',
        render: record => moment(record.editableDate).format(dateTimeFormat),
      },
      {
        key: 13,
        title: 'Submission date',
        render: record => {
          if (!record.sentDate) {
            return '-';
          }

          return moment(record.sentDate).format(dateTimeFormat);
        },
      },
      {
        key: 10,
        title: 'Response status',
        render: record => {
          if (record.status === 'onTime') {
            return 'On Time';
          }

          if (record.status === 'late') {
            return 'Late';
          }

          return 'Not responded';
        },
      },
      {
        key: 8,
        title: 'Action',
        render: record => {
          return this.renderQualifyButton(record);
        },
      },
      {
        key: 11,
        title: 'Report',
        render: record => {
          return this.renderReportButton(record);
        },
      },
      {
        key: 12,
        title: 'Improvement plan',
        render: record => {
          return this.renderImprovementPlanButton(record);
        },
      },
      {
        key: 21,
        title: 'Cancel',
        render: record => {
          if (record.status !== 'canceled' && record.audit.status !== 'closed') {
            return (
              <Popconfirm
                title="Are you sure ?"
                onConfirm={this.props.cancel.bind(this, record._id)}
              >
                <Button size="small" type="danger">
                  Cancel
                </Button>
              </Popconfirm>
            );
          }
        },
      },
      {
        key: 22,
        title: 'Notification',
        render: record => {
          if (record.notificationForBuyer) {
            return (
              <>
                <Button size="small" style={{ marginRight: '5px' }}>
                  {record.notificationForBuyer}
                </Button>

                <Button size="small" onClick={this.props.markAsRead.bind(this, record._id)}>
                  clear
                </Button>
              </>
            );
          }
        },
      },
    ];
  }

  render() {
    const { loading, exportExcel } = this.props;
    const data = this.props.data || [];

    const style = { width: 200, marginRight: '20px' };

    return (
      <div>
        <Card title="Desktop audit responses">
          <Row>
            <Select
              style={style}
              placeholder="Qualification status"
              allowClear
              onSelect={this.onSelectChange.bind(this, 'qualStatus')}
            >
              <Select.Option value="">all</Select.Option>
              <Select.Option value="draft">draft</Select.Option>
              <Select.Option value="open">open</Select.Option>
              <Select.Option value="closed">closed</Select.Option>
            </Select>

            <Select
              style={style}
              placeholder="Supplier status"
              allowClear
              onSelect={this.onSelectChange.bind(this, 'supplierStatus')}
            >
              <Select.Option value="">all</Select.Option>
              <Select.Option value="invited">invited</Select.Option>
              <Select.Option value="onTime">onTime</Select.Option>
              <Select.Option value="late">late</Select.Option>
            </Select>

            <div style={{ float: 'right' }}>
              <Search />
            </div>

            <Button onClick={exportExcel}>
              Export excel
              <Icon type="file-excel" />
            </Button>
          </Row>

          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data}
            loading={loading}
            pagination={{ pageSize: 15 }}
            scroll={{ x: 1400 }}
            rowClassName={record => {
              if (record.isQualified) return 'highlight';
              if (record.notificationForBuyer) return 'notification';
            }}
          />
        </Card>

        {this.renderModal()}
      </div>
    );
  }
}

AuditResponses.propTypes = {
  client: PropTypes.object,
  pagination: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  responsesQualifiedStatusQuery: PropTypes.object,
};

export default withRouter(withApollo(AuditResponses));
