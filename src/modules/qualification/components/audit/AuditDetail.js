/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col } from 'antd';
import { NumberCard } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Common } from 'modules/companies/components';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class AuditDetail extends Common {
  columns() {
    return this.getWrappedColumns([
      {
        title: 'Qualification/audit information',
        render: () => <a>View</a>
      },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Expiration date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Last auditer report',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditer improvement plan',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditer report',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditer report',
        render: () => <a>View</a>
      }
    ]);
  }

  render() {
    const { pagination, loading, onChange } = this.props;

    const data = this.props.data || {};
    const requested = data.supplierIds ? data.supplierIds.length : 0;
    const submitted = data.responses ? data.responses.length : 0;
    const notResponded = requested - submitted;

    return (
      <div>
        <Row gutter={24}>
          <Col key={0} lg={8} sm={12}>
            <NumberCard
              icon="message"
              title="Requested"
              color={colors[3]}
              number={requested}
            />
          </Col>
          <Col key={1} lg={8} sm={12}>
            <NumberCard
              icon="like"
              title="Submitted"
              color={colors[2]}
              number={submitted}
            />
          </Col>
          <Col key={2} lg={8} sm={12}>
            <NumberCard
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={notResponded}
            />
          </Col>
        </Row>

        <Card title="Success audit responses">
          <div className="table-operations" />
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data.responses}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 2000 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(AuditDetail);
