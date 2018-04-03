import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Divider, Popconfirm } from 'antd';
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
            value: 'open'
          },
          {
            text: (
              <span>
                {renderIcon('closed')} {__('Closed')}
              </span>
            ),
            value: 'closed'
          },
          {
            text: (
              <span>
                {renderIcon('participated')} {__('Participated')}
              </span>
            ),
            value: 'participated'
          }
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        render: record => this.renderTooltippedIcon(record)
      },
      ...this.commonColumns(),
      {
        title: __('File'),
        render: (text, record) =>
          record.file ? this.renderFileDownload(record.file.url) : '-'
      },
      {
        title: __('Action'),
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record)
      }
    ];
  }

  renderStatus(text, record) {
    return record.isParticipated ? 'participated' : record.status;
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
      <a href={url} target="_blank">
        {__('View')}
      </a>
    );
  }

  renderOperation(record) {
    const { currentUser, notInterested, type } = this.props;
    const { status, _id, isParticipated, isSent } = record;
    const { __ } = this.context;

    const canNotInterested = status === 'open' && !isSent && !isParticipated;
    const canNotOpen = status === 'closed' && type === 'rfq';

    if (currentUser) {
      return (
        <div style={{ width: '160px' }}>
          {canNotOpen || <Link to={`/tender/submit/${_id}`}>{__('Open')}</Link>}

          {canNotInterested && [
            <Divider type="vertical" key={0} />,
            <Popconfirm
              key={1}
              title={__('Are you sure you are not interested？')}
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => notInterested(_id)}
            >
              <a>{__('Not interested')}</a>
            </Popconfirm>
          ]}
        </div>
      );
    } else {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/sign-in?required`}>{__('More')}</Link>
        </div>
      );
    }
  }

  render() {
    return this.renderTenders({ columns: this.columns() });
  }
}

SupplierTenders.propTypes = {
  currentUser: PropTypes.object,
  notInterested: PropTypes.func
};

SupplierTenders.contextTypes = {
  __: PropTypes.func
};

export default withRouter(SupplierTenders);
