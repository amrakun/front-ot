import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Popconfirm, Button, Icon, Divider, Tooltip } from 'antd';
import Tenders from './Tenders';

class BuyerTenders extends Tenders {
  columns() {
    const { type } = this.props;
    const { __ } = this.context;
    const renderIcon = this.renderIcon;

    const filters = [
      {
        text: <span>{renderIcon('draft')} Draft</span>,
        value: 'draft',
      },
      {
        text: <span>{renderIcon('open')} Open</span>,
        value: 'open',
      },
      {
        text: <span>{renderIcon('closed')} Closed</span>,
        value: 'closed',
      },
      {
        text: <span>{renderIcon('canceled')} Canceled</span>,
        value: 'canceled',
      },
    ];

    if (type === 'rfq') {
      filters.push({
        text: <span>{renderIcon('awarded')} Awarded</span>,
        value: 'awarded',
      });
    }

    return [
      {
        title: 'Status',
        filters,
        filteredValue: this.state.statuses,
        key: 'status',
        fixed: 'left',
        width: 75,
        render: (text, record) => {
          const { status } = record;

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
        title: 'Suppliers',
        dataIndex: 'requestedCount',
      },
      {
        title: 'Submitted',
        dataIndex: 'submittedCount',
      },
      {
        title: 'Not interested',
        dataIndex: 'notInterestedCount',
      },
      {
        title: 'Not responded',
        dataIndex: 'notRespondedCount',
      },
      {
        title: 'Officer name',
        dataIndex: 'sourcingOfficer',
      },
      {
        title: 'Regret letter',
        render: this.renderBoolean,
      },
      type === 'rfq' ? { title: 'Type', render: (text, record) => record.rfqType } : {},
      {
        title: 'Award note',
        dataIndex: 'awardNote',
      },
      {
        title: 'More',
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record),
      },
    ];
  }

  renderEditLink({ status, _id }) {
    if (['draft', 'closed', 'canceled', 'open'].includes(status)) {
      return [
        <Divider key={0} type="vertical" />,

        <Link key={1} to={`/tender/edit/${_id}`}>
          {['closed', 'canceled'].includes(status) ? 'Reopen' : 'Edit'}
        </Link>,
      ];
    }
  }

  renderCancelLink({ status, _id }) {
    if (['awarded', 'canceled'].includes(status)) {
      return null;
    }

    return (
      <>
        <Divider key={0} type="vertical" />

        <Popconfirm
          key={3}
          title="Are you sure you want to cancel this tender？"
          placement="bottomRight"
          okText="Yes"
          cancelText="No"
          onConfirm={() => this.props.cancelTender(_id)}
        >
          <a href="#cancel">Cancel</a>
        </Popconfirm>
      </>
    );
  }

  renderViewLink({ type, _id }) {
    return (
      <>
        <Divider key={0} type="vertical" />
        <Link key={1} to={`/${type}/${_id}`}>
          View
        </Link>
      </>
    );
  }

  renderOperation(record) {
    return (
      <div>
        {this.renderViewLink(record)}
        {this.renderEditLink(record)}
        {this.renderCancelLink(record)}
      </div>
    );
  }

  render() {
    const { exportTenders, exportLoading } = this.props;

    return this.renderTenders({
      columns: this.columns(),

      operation: (
        <Button disabled={exportLoading} onClick={exportTenders}>
          Export to excel
          <Icon type="file-excel" />
        </Button>
      ),
    });
  }
}

BuyerTenders.propTypes = {
  cancelTender: PropTypes.func,
  exportTenders: PropTypes.func,
  exportLoading: PropTypes.bool,
};

export default withRouter(BuyerTenders);
