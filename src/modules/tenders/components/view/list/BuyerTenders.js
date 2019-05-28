import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Icon, Divider, Tooltip, Modal, Select, Form, message } from 'antd';
import Tenders from './Tenders';

const { Option } = Select;

class BuyerTenders extends Tenders {
  constructor(props) {
    super(props);

    this.state = {
      selectedTenderId: null,
      cancelReason: '',
    }
  }

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

  renderCancelPopup({ _id }) {
    const {  selectedTenderId, cancelReason } = this.state;

    if (_id !== selectedTenderId) {
      return null;
    }

    const toggleCancelForm = () => {
      this.setState({ selectedTenderId: null });
    }

    const onChooseReason = (reasons) => {
      this.setState({ cancelReason: reasons.join(', ') });
    }

    const onConfirm = () => {
      if (!cancelReason) {
        return message.warn('Please select reasons');
      }

      return this.props.cancelTender(_id, cancelReason);
    }

    return (
      <Modal
        title="Cancel"
        visible={true}
        width="50%"
        onCancel={toggleCancelForm}
        footer={[
          <Button key="cancel" onClick={toggleCancelForm}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={onConfirm}>
            Confirm
          </Button>
        ]}
      >
        <Form.Item label="Reasons">
          <Select
            onChange={onChooseReason}
            placeholder="Please select reasons ..."
            style={{ width: '100%' }}
            mode="multiple"
          >
            <Option value="Poor technical specification - Техникийн мэдээлэл хангалттай бус">
              Poor technical specification - Техникийн мэдээлэл хангалттай бус
            </Option>
            <Option value="Insufficient budget - Зарцуулах төсөв, мөнгө хангалттай бус">
              Insufficient budget - Зарцуулах төсөв, мөнгө хангалттай бус
            </Option>
            <Option value="Long lead time - Хүргэгдэх хугацаа хэтэрхий урт">
              Long lead time - Хүргэгдэх хугацаа хэтэрхий урт
            </Option>
            <Option value="Overpriced(compared with system historic price) - Хэт их үнэтэй (САП системийн үнэтэй харьцуулахад)">
              Overpriced(compared with system historic price) - Хэт их үнэтэй (САП системийн үнэтэй харьцуулахад)
            </Option>
            <Option value="No supplier responded - Ямар ч ханган нийлүүлэгч үнийн санал ирүүлээгүй">
              No supplier responded - Ямар ч ханган нийлүүлэгч үнийн санал ирүүлээгүй
            </Option>
            <Option value="End user request - Эцсийн хэрэглэгчийн хүсэлт">
              End user request - Эцсийн хэрэглэгчийн хүсэлт
            </Option>
          </Select>
        </Form.Item>
      </Modal>
    )
  }

  renderCancelLink({ status, _id }) {
    if (['awarded', 'canceled'].includes(status)) {
      return null;
    }

    const onClick = () => {
      this.setState({ selectedTenderId: _id });
    }

    return (
      <>
        <Divider key={0} type="vertical" />

        {this.renderCancelPopup({ _id })}

        <a href="#cancel" onClick={onClick}>Cancel</a>
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
