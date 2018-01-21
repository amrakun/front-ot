/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col } from 'antd';
import { NumberCard } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { dateFormat } from 'modules/common/constants';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

class AuditDetail extends React.Component {
  constructor(props) {
    super(props);

    this.columns = this.columns.bind(this);
  }

  columns() {
    const { match } = this.props;

    return [
      { title: 'Status by date', dataIndex: 'status' },
      { title: 'Status by action', dataIndex: 'statusByAction' },
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'More',
        render: record => (
          <Link
            to={{
              pathname: '/audit/qualify',
              state: {
                supplierId: record.supplier._id,
                auditId: match.params.id
              }
            }}
          >
            View
          </Link>
        )
      },
      {
        title: 'Last auditer report',
        render: () => <a>View</a>
      },
      {
        title: 'Last auditer improvement plan',
        render: () => <a>View</a>
      },
      { title: 'Contact person', dataIndex: 'supplier.contactInfo.name' },
      { title: 'Email address', dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone number', dataIndex: 'supplier.contactInfo.phone' }
    ];
  }

  render() {
    const { pagination, loading, onChange } = this.props;

    const data = this.props.data || {};
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

AuditDetail.propTypes = {
  pagination: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  match: PropTypes.object
};

export default withRouter(AuditDetail);
