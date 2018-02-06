import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Popconfirm, Button, Icon, Divider } from 'antd';
import Tenders from './Tenders';

class BuyerTenders extends Tenders {
  columns() {
    const renderIcon = this.renderIcon;
    return [
      {
        title: 'Status',
        filters: [
          {
            text: <span>{renderIcon('draft')} Draft</span>,
            value: 'draft'
          },
          {
            text: <span>{renderIcon('open')} Open</span>,
            value: 'open'
          },
          {
            text: <span>{renderIcon('closed')} Closed</span>,
            value: 'closed'
          },
          {
            text: <span>{renderIcon('awarded')} Awarded</span>,
            value: 'awarded'
          },
          {
            text: <span>{renderIcon('canceled')} Canceled</span>,
            value: 'canceled'
          }
        ],
        filteredValue: this.state.statuses,
        key: 'status',
        render: record => this.renderTooltippedIcon(record)
      },
      ...this.commonColumns(),
      {
        title: 'Suppliers',
        dataIndex: 'requestedCount'
      },
      {
        title: 'Submitted',
        dataIndex: 'submittedCount'
      },
      {
        title: 'Not interested',
        dataIndex: 'notInterestedCount'
      },
      {
        title: 'Not responded',
        dataIndex: 'notRespondedCount'
      },
      {
        title: 'Sourcing officer',
        dataIndex: 'sourcingOfficer'
      },
      {
        title: 'Regret letter',
        render: this.renderBoolean
      },
      {
        title: 'More',
        fixed: 'right',
        width: 100,
        render: (text, record) => this.renderOperation(record)
      }
    ];
  }

  renderOperation(record) {
    const { cancelTender } = this.props;
    const { status, _id, type } = record;

    return (
      <div style={{ width: '120px' }}>
        <Link to={`/${type}/${_id}`}>View</Link>
        {!['closed', 'awarded'].includes(status) && [
          <Divider key={0} type="vertical" />,
          <Link key={1} to={`/tender/edit/${_id}`}>
            Edit
          </Link>
        ]}
        {!['closed', 'awarded', 'canceled'].includes(status) && [
          <Divider key={0} type="vertical" />,
          <Popconfirm
            key={3}
            title="Are you sure you want to cancel this tender？"
            placement="bottomRight"
            okText="Yes"
            cancelText="No"
            onConfirm={() => cancelTender(_id)}
          >
            <a>Cancel</a>
          </Popconfirm>
        ]}
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
      )
    });
  }
}

BuyerTenders.propTypes = {
  cancelTender: PropTypes.func,
  exportTenders: PropTypes.func,
  exportLoading: PropTypes.bool
};

export default withRouter(BuyerTenders);
