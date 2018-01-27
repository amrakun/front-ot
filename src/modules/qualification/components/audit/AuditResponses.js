/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, DatePicker } from 'antd';
import { NumberCard } from 'modules/common/components';
import { dateFormat, colors } from 'modules/common/constants';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Search } from 'modules/common/components';
import queryString from 'query-string';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.columns = this.columns.bind(this);
  }

  handleDateRangeChange(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);
    query.from = value[0]._d;
    query.to = value[1]._d;
    history.push({
      search: queryString.stringify(query)
    });
  }

  columns() {
    return [
      { title: 'Status by date', dataIndex: 'status' },
      { title: 'Status by action', dataIndex: 'statusByAction' },
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Publish date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Close date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Applied information',
        render: record =>
          record.supplier ? (
            <Link
              to={{
                pathname: '/audit/qualify',
                state: {
                  supplierId: record.supplier._id,
                  auditId: record.auditId
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
    const { pagination, loading, onChange } = this.props;
    const data = this.props.data || [];
    const requested = data.supplierIds ? data.supplierIds.length : 0;
    const submitted = data.responses ? data.responses.length : 0;
    const notResponded = requested - submitted;

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
              title="Invite suppliers"
              color={colors[3]}
              number={requested}
            />
          </Col>
          <Col key={2} {...colSpan}>
            <NumberCard
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={notResponded}
            />
          </Col>
          <Col key={3} {...colSpan}>
            <NumberCard
              icon="like"
              title="Qualified"
              color={colors[2]}
              number={submitted}
            />
          </Col>
          <Col key={4} {...colSpan}>
            <NumberCard
              icon="mail"
              title="Sent improvement plan"
              color={colors[8]}
              number={submitted}
            />
          </Col>
        </Row>

        <Card title="Success audit responses">
          <div className="table-operations">
            <Search />
            <DatePicker.RangePicker onChange={this.handleDateRangeChange} />
          </div>
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 1400 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
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
  history: PropTypes.object
};

export default withRouter(AuditResponses);
