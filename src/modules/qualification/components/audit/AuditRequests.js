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
        title: __('Audit status'),
        key: 1,
        render: record => {
          return record.status === 'open' ? __('open') : __('closed');
        },
      },
      {
        title: __('Status'),
        key: 10,
        render: record => {
          const response = record.supplierResponse;

          if (!response || response.status === 'invited') {
            return 'invited';
          }

          return 'submitted';
        },
      },
      {
        title: __('Publish date'),
        key: 2,
        render: record => moment(record.publishDate).format(dateTimeFormat),
      },
      {
        title: __('Expiration date'),
        key: 3,
        render: record => moment(record.closeDate).format(dateTimeFormat),
      },
      {
        title: __('Auditor report'),
        key: 4,
        render: record => (record.status === 'open' ? '-' : <a href="#view">{__('View')}</a>),
      },
      {
        title: __('Auditor improvement plan'),
        key: 5,
        render: record => (record.status === 'open' ? '-' : <a href="#view">{__('View')}</a>),
      },
      {
        title: __('More'),
        key: 6,
        render: record => {
          const response = record.supplierResponse;

          if (!response || response.isEditable !== false) {
            return <Link to={`audit/submit/${record._id}`}>{__('View')}</Link>;
          }

          return '-';
        },
      },
    ];
  }

  render() {
    const { data, loading } = this.props;
    const { __ } = this.context;

    return (
      <Card title={__('Qualification/audit requests')} extra={<HelpModal videoId="audit" />}>
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          rowClassName={record => {
            const supplierResponse = record.supplierResponse || {};

            if (supplierResponse.isQualified) return 'highlight';
          }}
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
  onChange: PropTypes.func,
};

AuditRequests.contextTypes = {
  __: PropTypes.func,
};

export default withRouter(AuditRequests);
