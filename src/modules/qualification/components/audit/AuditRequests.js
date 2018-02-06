import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  qualificationTitle: {
    id: 'qualificationTitle',
    defaultMessage: 'Qualification/audit requests'
  },
  status: {
    id: 'status',
    defaultMessage: 'Status'
  },
  publishDate: {
    id: 'publishDate',
    defaultMessage: 'Publish date'
  },
  expirationDate: {
    id: 'expirationDate',
    defaultMessage: 'Expiration date'
  },
  auditorReport: {
    id: 'auditorReport',
    defaultMessage: 'Auditor report'
  },
  auditorImprovement: {
    id: 'auditorImprovement',
    defaultMessage: 'Auditor improvement plan'
  },
  more: {
    id: 'more',
    defaultMessage: 'More'
  }
});

class AuditRequests extends React.Component {
  columns() {
    const { formatMessage } = this.props.intl;
    return [
      {
        title: formatMessage(messages.status),
        dataIndex: 'status'
      },
      {
        title: formatMessage(messages.publishDate),
        render: record => moment(record.publishDate).format(dateTimeFormat)
      },
      {
        title: formatMessage(messages.expirationDate),
        render: record => moment(record.closeDate).format(dateTimeFormat)
      },
      {
        title: formatMessage(messages.auditorReport),
        render: record =>
          record.status === 'open' ? '-' : <a>{formatMessage(messages.view)}</a>
      },
      {
        title: formatMessage(messages.auditorImprovement),
        render: record =>
          record.status === 'open' ? '-' : <a>{formatMessage(messages.view)}</a>
      },
      {
        title: formatMessage(messages.more),
        render: record => {
          const isSent = record.supplierResponse
            ? record.supplierResponse.isSent
            : null;
          const status = record.status;

          if (!isSent && status === 'open')
            return <Link to={`audit/submit/${record._id}`}>View</Link>;
          else if (isSent !== null && isSent) return 'Already sent';

          return '-';
        }
      }
    ];
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Card title={formatMessage(messages.qualificationTitle)}>
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
  onChange: PropTypes.func,
  intl: intlShape.isRequired
};

export default injectIntl(withRouter(AuditRequests));
