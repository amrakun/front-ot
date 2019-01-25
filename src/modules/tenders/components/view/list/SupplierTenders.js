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
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        fixed: 'left',
        width: 75,
        render: record => this.renderTooltippedIcon(record),
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
      <a href={url} target="__blank">
        {__('View')}
      </a>
    );
  }

  renderNotInterestedLink(record) {
    const { notInterested } = this.props;
    const { __ } = this.context;
    const { _id, status, isParticipated, isSent } = record;

    if (status === 'open' && !isSent && !isParticipated) {
      return [
        <Divider type="vertical" key={0} />,
        <Popconfirm
          key={1}
          title={__('Are you sure you are not interested？')}
          placement="bottomRight"
          okText={__('Yes')}
          cancelText={__('No')}
          onConfirm={() => notInterested(_id)}
        >
          <a href="#not-interested">{__('Not interested')}</a>
        </Popconfirm>,
      ];
    }
  }

  renderOpenLink(record) {
    const { type } = this.props;
    const { status, _id } = record;
    const { __ } = this.context;

    if (status === 'canceled') {
      return null;
    }

    if (status === 'closed' && type !== 'eoi') {
      return null;
    }

    return <Link to={`/tender/submit/${_id}`}>{__('Open')}</Link>;
  }

  renderOperation(record) {
    const { currentUser } = this.props;
    const { __ } = this.context;

    if (currentUser) {
      return (
        <div style={{ width: '160px' }}>
          {this.renderOpenLink(record)}
          {this.renderNotInterestedLink(record)}
        </div>
      );
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
  notInterested: PropTypes.func,
};

SupplierTenders.contextTypes = {
  __: PropTypes.func,
};

export default withRouter(SupplierTenders);
