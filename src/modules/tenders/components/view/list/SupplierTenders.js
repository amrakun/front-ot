import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import Tenders from './Tenders';

class SupplierTenders extends Tenders {
  columns() {
    const { __ } = this.context;
    const renderIcon = this.renderIcon;

    return [
      {
        title: __('Status'),
        filters: [
          {
            text: (
              <span>
                {renderIcon('open')} {__('Open')}
              </span>
            ),
            value: 'open',
          },
          {
            text: (
              <span>
                {renderIcon('closed')} {__('Closed')}
              </span>
            ),
            value: 'closed',
          },
          {
            text: (
              <span>
                {renderIcon('participated')} {__('Participated')}
              </span>
            ),
            value: 'participated',
          },
          {
            text: (
              <span>
                {renderIcon('notInterested')} {__('Not interested')}
              </span>
            ),
            value: 'notInterested',
          },
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        fixed: 'left',
        width: 75,
        render: record => {
          const { isParticipated, isSent, isNotInterested } = record;

          let status;

          if (isParticipated) status = 'participated';
          if (isNotInterested) status = 'notInterested';
          if (!isSent) status = 'draft';

          return (
            <Tooltip title={<span className="capitalize">{__(status)}</span>}>
              {this.renderIcon(status, {
                fontSize: '20px',
                lineHeight: '12px',
              })}
            </Tooltip>
          );
        },
      },
      {
        title: __('Tender status'),
        fixed: 'left',
        width: 90,
        render: (text, record) => {
          let { status } = record;

          if (status === 'awarded') {
            status = 'closed';
          }

          return (
            <Tooltip title={<span className="capitalize">{__(status)}</span>}>
              {this.renderIcon(status, {
                fontSize: '20px',
                lineHeight: '12px',
              })}
            </Tooltip>
          );
        },
      },
      ...this.commonColumns(),
      {
        title: __('File'),
        render: (text, record) => (record.file ? this.renderFileDownload(record.file.url) : '-'),
      },
      {
        title: __('Action'),
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record),
      },
    ];
  }

  renderBoolean(text, record) {
    if (record.sentRegretLetter) return 'Yes';
    else return '-';
  }

  renderDate(date) {
    return moment(date).format(dateTimeFormat);
  }

  renderFileDownload(url) {
    const { __ } = this.context;

    return (
      <a href={url} target="__blank">
        {__('View')}
      </a>
    );
  }

  renderOpenLink(record) {
    const { _id } = record;
    const { __ } = this.context;

    return <Link to={`/tender/submit/${_id}`}>{__('Open')}</Link>;
  }

  renderOperation(record) {
    const { currentUser } = this.props;
    const { __ } = this.context;

    if (currentUser) {
      return <div style={{ width: '160px' }}>{this.renderOpenLink(record)}</div>;
    }

    return (
      <div style={{ width: '160px' }}>
        <Link to={`/sign-in?required`}>{__('More')}</Link>
      </div>
    );
  }

  render() {
    return this.renderTenders({ columns: this.columns(), isSupplier: true });
  }
}

SupplierTenders.propTypes = {
  currentUser: PropTypes.object,
};

SupplierTenders.contextTypes = {
  __: PropTypes.func,
};

export default withRouter(SupplierTenders);
