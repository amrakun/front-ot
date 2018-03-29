/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, DatePicker } from 'antd';
import { NumberCard, TextCard } from 'modules/common/components';
import { dateFormat, colors } from 'modules/common/constants';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Search } from 'modules/common/components';
import queryString from 'query-string';
import { Paginator } from 'modules/common/components';
import { StatsTable } from 'modules/common/components';
import { auditTabs } from 'modules/qualification/consts';
import { MassEmail } from 'modules/companies/containers';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      selectedSuppliers: []
    };

    this.columns = this.columns.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  handleDateRangeChange(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);
    query.from = value[0] ? value[0]._d : null;
    query.to = value[1] ? value[1]._d : null;
    history.push({
      search: queryString.stringify(query)
    });
  }

  onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({
      selectedRowKeys,
      selectedSuppliers: selectedRows.map(row => row.supplier)
    });
  }

  columns() {
    return [
      { title: 'Status by date', dataIndex: 'status' },
      { title: 'Status by action', dataIndex: 'audit.status' },
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Publish date',
        render: record => moment(record.audit.publishDate).format(dateFormat)
      },
      {
        title: 'Close date',
        render: record => moment(record.audit.closeDate).format(dateFormat)
      },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Provided information',
        render: record =>
          record.supplier ? (
            <Link
              to={{
                pathname: '/audit/qualify',
                state: {
                  supplierId: record.supplier._id,
                  auditId: record.audit._id
                }
              }}
            >
              View
            </Link>
          ) : (
            '-'
          )
      },
      {
        title: 'Last auditor report',
        render: record =>
          record.reportFile ? (
            <a href={record.reportFile} target="_blank">
              {moment(record.reportSentDate).format(dateFormat)}
            </a>
          ) : (
            '-'
          )
      },
      {
        title: 'Last auditor improvement plan',
        render: record =>
          record.improvementPlanFile ? (
            <a href={record.improvementPlanFile} target="_blank">
              {moment(record.improvementPlanSentDate).format(dateFormat)}
            </a>
          ) : (
            '-'
          )
      }
    ];
  }

  render() {
    const { loading, onChange } = this.props;
    const counts = this.props.counts || {};
    const data = this.props.data || [];

    const statsQuery = this.props.responsesQualifiedStatusQuery || {};
    const auditStats = statsQuery.auditResponsesQualifiedStatus || {};

    const { selectedRowKeys, selectedSuppliers } = this.state;

    const colSpan = {
      xl: 6,
      lg: 12,
      sm: 24
    };

    return (
      <div>
        <Row gutter={24}>
          <Col key={0} {...colSpan}>
            <NumberCard
              icon="message"
              title="Invited suppliers"
              color={colors[3]}
              number={counts.invited || 0}
            />
          </Col>
          <Col key={3} {...colSpan}>
            <TextCard
              icon="like"
              title={`Qualified - ${counts.qualified || 0}`}
              color={colors[2]}
              size="big"
              text={<StatsTable stats={auditStats} tabs={auditTabs} />}
            />
          </Col>
          <Col key={2} {...colSpan}>
            <NumberCard
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={counts.notResponded || 0}
            />
          </Col>
          <Col key={4} {...colSpan}>
            <NumberCard
              icon="mail"
              title="Sent improvement plan"
              color={colors[8]}
              number={counts.sentImprovementPlan || 0}
            />
          </Col>
        </Row>

        <Card title="Desktop audit responses">
          <div className="table-operations">
            <Search />

            <MassEmail suppliers={selectedSuppliers} />

            <DatePicker.RangePicker
              onChange={this.handleDateRangeChange}
              allowClear
            />
          </div>
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data}
            pagination={false}
            loading={loading}
            scroll={{ x: 1400 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
            rowSelection={{
              selectedRowKeys,
              onChange: this.onSelectChange
            }}
          />
          <Paginator total={10} />
        </Card>
      </div>
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
  counts: PropTypes.object,
  responsesQualifiedStatusQuery: PropTypes.object
};

export default withRouter(AuditResponses);
