/* eslint-disable react/display-name */

import { withApollo } from 'react-apollo';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import { Button, Select, Table, Card, Row } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import router from 'modules/common/router';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.columns = this.columns.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(name, value) {
    router.setParams(this.props.history, { [name]: value });
  }

  renderQualifyButton(record) {
    if (record.audit.status !== 'open') {
      return null;
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
        render: record => record.audit.status,
      },
      {
        key: 3,
        title: 'Supplier status',
        render: record => {
          if (!record.status) {
            return 'invited';
          }

          return record.status;
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
        render: record => moment(record.audit.publishDate).format(dateFormat),
      },
      {
        key: 7,
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat),
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
