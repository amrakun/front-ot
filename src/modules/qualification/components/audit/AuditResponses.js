/* eslint-disable react/display-name */

import { withApollo } from 'react-apollo';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import { Button, Select, Table, Card, Row, Modal, Icon } from 'antd';
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

    if (record.audit.status !== 'closed') {
      return (
        <Button size="small" style={{ marginRight: '10px' }} onClick={onView}>
          View
        </Button>
      );
    }

    if (record.status === 'invited') {
      return null;
    }

    return (
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
          Qualify
        </Link>
      </Button>
    );
  }

  renderReportButton(record) {
    if (!record.reportFile) {
      return null;
    }

    return (
      <a href={readFileUrl(record.reportFile)} style={{ marginRight: '10px' }} target="__blank">
        Download report
      </a>
    );
  }

  renderImprovementPlanButton(record) {
    if (!record.improvementPlanFile) {
      return null;
    }

    return (
      <a href={readFileUrl(record.improvementPlanFile)} target="__blank">
        Download improvement plan
      </a>
    );
  }

  columns() {
    return [
      {
        key: 1,
        title: '#',
        render: (_record, _j, i) => i + 1,
      },
      {
        key: 2,
        title: 'Qualification status',
        render: record => record.supplier.qualificationStatusDisplay,
      },
      {
        key: 9,
        title: 'Audit status',
        render: record => {
          const s = statusIcons[record.audit.status];
          return (
            <Icon type={s.type} style={{ color: s.color, fontSize: '20px', lineHeight: '12px' }} />
          );
        },
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
        key: 10,
        title: 'Response status',
        render: record => {
          if (['onTime', 'late'].includes(record.status)) {
            return record.status;
          }

          return null;
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
        key: 6,
        title: 'Invited date',
        render: record => moment(record.audit.publishDate).format(dateTimeFormat),
      },
      {
        key: 7,
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateTimeFormat),
      },
      {
        key: 8,
        title: 'Action',
        render: record => {
          return (
            <>
              {this.renderQualifyButton(record)}
              {this.renderReportButton(record)}
              {this.renderImprovementPlanButton(record)}
            </>
          );
        },
      },
    ];
  }

  render() {
    const { loading } = this.props;
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
          </Row>

          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data}
            loading={loading}
            scroll={{ x: 1400 }}
            rowClassName={record => {
              if (record.isQualified) return 'highlight';
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
