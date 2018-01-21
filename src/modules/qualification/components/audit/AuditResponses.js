import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class AuditResponses extends React.Component {
  columns() {
    return [
      { title: 'Type', dataIndex: 'type' },
      {
        title: 'Publish date',
        render: record => moment(record.date).format(dateFormat),
        key: 'date'
      },
      {
        title: 'Expiration date',
        render: record => moment(record.date).format(dateFormat),
        key: 'expirationDate'
      },
      {
        title: 'Invited suppliers',
        render: record =>
          record.supplierIds ? record.supplierIds.length : '-',
        key: 'suppliers'
      },
      {
        title: 'Participated suppliers',
        render: record => (record.responses ? record.responses.length : '-'),
        key: 'responses'
      },
      {
        title: 'Qualified suppliers',
        render: () => '0',
        key: 'qualified'
      },
      {
        title: 'Sent improvement plan',
        render: () => '0',
        key: 'improvementPlanSent'
      },
      {
        title: 'Sent auditer report',
        render: () => '0',
        key: 'auditerReportSent'
      },
      {
        title: 'More',
        render: record => (
          <Link to={`/audit/response/${record._id}`}>View</Link>
        ),
        key: 'action'
      }
    ];
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    return (
      <Card title="Qualification responses">
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
      </Card>
    );
  }
}

AuditResponses.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default withRouter(AuditResponses);
