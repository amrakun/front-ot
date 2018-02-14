import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Divider, Popconfirm } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import Tenders from './Tenders';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  tenderFile: {
    id: 'tenderFile',
    defaultMessage: 'File'
  },
  tenderAction: {
    id: 'tenderAction',
    defaultMessage: 'Action'
  },
  tenderStatus: {
    id: 'tenderStatus',
    defaultMessage: 'Status'
  }
});

class SupplierTenders extends Tenders {
  columns() {
    const { formatMessage } = this.context;
    const renderIcon = this.renderIcon;
    return [
      {
        title: formatMessage(messages.tenderStatus),
        filters: [
          {
            text: (
              <span>
                {renderIcon('open')} <T id="statusOpen">Open</T>
              </span>
            ),
            value: 'open'
          },
          {
            text: (
              <span>
                {renderIcon('closed')} <T id="statusClosed">Closed</T>
              </span>
            ),
            value: 'closed'
          },
          {
            text: (
              <span>
                {renderIcon('participated')}{' '}
                <T id="statusParticipated">Participated</T>
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
        title: formatMessage(messages.tenderFile),
        render: (text, record) =>
          record.file ? this.renderFileDownload(record.file.url) : '-'
      },
      {
        title: formatMessage(messages.tenderAction),
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
    if (record.sentRegretLetter) return 'Yeasdasds';
    else return '-';
  }

  renderDate(date) {
    return moment(date).format(dateTimeFormat);
  }

  renderFileDownload(url) {
    return (
      <a href={url} target="_blank">
        <T id="view">View</T>
      </a>
    );
  }

  renderOperation(record) {
    const { currentUser, notInterested } = this.props;
    const { status, _id, isParticipated, isSent } = record;

    const canNotInterested = status === 'open' && !isSent && !isParticipated;

    if (currentUser) {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/tender/submit/${_id}`}>
            <T id="tenderOpen">Open</T>
          </Link>
          {canNotInterested && [
            <Divider type="vertical" key={0} />,
            <Popconfirm
              key={1}
              title="Are you sure you are not interested？"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => notInterested(_id)}
            >
              <a>
                <T id="notInterested">Not interested</T>
              </a>
            </Popconfirm>
          ]}
        </div>
      );
    } else {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/sign-in?required`}>
            <T id="more">More</T>
          </Link>
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
  formatMessage: PropTypes.func
};

export default withRouter(SupplierTenders);
