import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { HelpModal } from 'modules/common/components';

class AuditRequests extends React.Component {
  columns() {
    const { __ } = this.context;

    return [
      {
        title: __('Status'),
        render: record => {
          return record.status === 'open' ? __('open') : __('closed');
        }
      },
      {
        title: __('Publish date'),
        render: record => moment(record.publishDate).format(dateTimeFormat)
      },
      {
        title: __('Expiration date'),
        render: record => moment(record.closeDate).format(dateTimeFormat)
      },
      {
        title: __('Auditor report'),
        render: record => (record.status === 'open' ? '-' : <a>{__('View')}</a>)
      },
      {
        title: __('Auditor improvement plan'),
        render: record => (record.status === 'open' ? '-' : <a>{__('View')}</a>)
      },
      {
        title: __('More'),
        render: record => {
          const isSent = record.supplierResponse
            ? record.supplierResponse.isSent
            : null;
          const status = record.status;

          if (!isSent && status === 'open')
            return <Link to={`audit/submit/${record._id}`}>{__('View')}</Link>;
          else if (isSent !== null && isSent) return __('Already sent');

          return '-';
        }
      }
    ];
  }

  render() {
    const { data, loading } = this.props;
    const { __ } = this.context;

    return (
      <Card
        title={__('Qualification/audit requests')}
        extra={<HelpModal videoId="desktopAudit" />}
      >
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          loading={loading}
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

AuditRequests.contextTypes = {
  __: PropTypes.func
};

export default withRouter(AuditRequests);
