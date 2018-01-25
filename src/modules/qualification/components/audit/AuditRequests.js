import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';

class AuditRequests extends React.Component {
  columns() {
    return [
      {
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Publish date',
        render: record => moment(record.publishDate).format(dateTimeFormat)
      },
      {
        title: 'Expiration date',
        render: record => moment(record.closeDate).format(dateTimeFormat)
      },
      {
        title: 'Auditor report',
        render: record => (record.status === 'open' ? '-' : <a>View</a>)
      },
      {
        title: 'Auditor improvement plan',
        render: record => (record.status === 'open' ? '-' : <a>View</a>)
      },
      {
        title: 'More',
        render: record => <Link to={`audit/submit/${record._id}`}>View</Link>
      }
    ];
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    return (
      <Card title="Qualification/audit requests">
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

AuditRequests.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default withRouter(AuditRequests);
