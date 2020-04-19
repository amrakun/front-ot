import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Icon } from 'antd';
import { dateTimeFormat, statusIcons } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
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
          const s = statusIcons[record.status];
          return (
            <Icon type={s.type} style={{ color: s.color, fontSize: '20px', lineHeight: '12px' }} />
          );
        },
      },
      {
        key: 11,
        title: 'Qualification status',
        render: record => {
          const response = record.supplierResponse;

          return response && response.supplier.qualificationStatusDisplay;
        },
      },
      {
        title: __('Submission status'),
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
        title: __('Close date'),
        key: 3,
        render: record => moment(record.closeDate).format(dateTimeFormat),
      },
      {
        title: __('Report'),
        key: 4,
        render: record => {
          const supplierResponse = record.supplierResponse || {};
          const { reportFile } = supplierResponse;

          return reportFile ? (
            <a target="__blank" href={readFileUrl(reportFile)}>
              {__('Download')}
            </a>
          ) : (
            '-'
          );
        },
      },
      {
        title: __('Improvement plan'),
        key: 5,
        render: record => {
          const supplierResponse = record.supplierResponse || {};
          const { improvementPlanFile } = supplierResponse;

          return improvementPlanFile ? (
            <a target="__blank" href={readFileUrl(improvementPlanFile)}>
              {__('Download')}
            </a>
          ) : (
            '-'
          );
        },
      },
      {
        title: __('Action'),
        key: 6,
        render: record => {
          return <Link to={`audit/submit/${record._id}`}>{__('View')}</Link>;
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
