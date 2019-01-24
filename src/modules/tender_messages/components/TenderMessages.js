import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Table, Icon, Card, Modal, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import { CreateTenderMessage } from '../containers/';
import TenderMessageDetail from './TenderMessageDetail';
import { Paginator } from 'modules/common/components';

const ROUTE_ENUM = {
  index: 0,
  view: 1,
  new: 2,
  edit: 3,
  reply: 4,
};

const Recipient = ({ recipientSuppliers }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    if (recipientSuppliers.length === 1) {
      const { enName, email } = recipientSuppliers[0].basicInfo;
      return `${enName} <${email}>`;
    }
    if (recipientSuppliers.length > 1) return `${recipientSuppliers.length} suppliers`;
  } else {
    return 'RFQ';
  }
};
Recipient.propTypes = {
  recipientSuppliers: PropTypes.array,
};

const senderUsername = record => {
  const { senderSupplier, senderBuyer } = record;

  if (senderSupplier) {
    return senderSupplier.basicInfo.enName;
  }

  if (senderBuyer) {
    return senderBuyer.username;
  }
};

const AttachmentIcon = attachment => (attachment ? <Icon type="paper-clip" /> : undefined);

class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      route: 'index',
      tenderMessageDetail: undefined,
    };
    this.isNew = this.isNew.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.setAsRead = this.setAsRead.bind(this);
  }

  columns() {
    const columns = [
      {
        title: 'From',
        render: senderUsername,
        width: 150,
        key: 1,
      },
      {
        title: 'To',
        render: Recipient,
        width: 150,
        key: 2,
      },
      {
        title: 'New',
        width: 60,
        render: this.isNew,
        key: 3,
      },
      // {
      //   title: 'Replied',
      //   render: IsRepliedIcon,
      //   width: 65,
      //   key: 4
      // },
      {
        title: 'Subject',
        dataIndex: 'subject',
        width: 200,
        key: 5,
      },
      {
        title: <Icon type="paper-clip" />,
        width: 30,
        dataIndex: 'attachment',
        render: AttachmentIcon,
        key: 6,
      },
      // {
      //   title: 'Body',
      //   dataIndex: 'body',
      //   key: 7,
      //   render: body =>
      //     body && body.length > 100 ? body.slice(60) + '...' : body
      // },
      {
        title: 'Actions',
        key: 8,
        width: 100,
        render: this.renderActions,
      },
    ];
    return columns;
  }

  renderActions(tenderMessageDetail) {
    const { currentUser } = this.context;
    const { senderBuyer, senderSupplier } = tenderMessageDetail;

    let replyButton = null;

    if ((currentUser.isSupplier && senderBuyer) || (!currentUser.isSupplier && senderSupplier)) {
      replyButton = (
        <>
          <Divider type="vertical" />
          <Button
            key={`${tenderMessageDetail._id}reply`}
            onClick={this.goto.bind(this, ROUTE_ENUM.reply, tenderMessageDetail)}
          >
            Reply
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          key={`${tenderMessageDetail._id}view`}
          onClick={this.goto.bind(this, ROUTE_ENUM.view, tenderMessageDetail)}
        >
          View
        </Button>
        {replyButton}
      </>
    );
  }

  isNew(record) {
    const { isRead, senderSupplier, senderBuyer } = record;
    const { currentUser } = this.context;

    if (currentUser.isSupplier && senderBuyer) {
      return isRead ? undefined : <Icon type="info-circle" />;
    }

    if (!currentUser.isSupplier && senderSupplier) {
      return isRead ? undefined : <Icon type="info-circle" />;
    }
  }

  goto(route, tenderMessageDetail) {
    this.setState({ route, tenderMessageDetail });

    if (route === ROUTE_ENUM.view) {
      this.setAsRead(tenderMessageDetail);
    }
  }

  setAsRead(tenderMessageDetail) {
    if (!tenderMessageDetail.isRead) {
      const { senderSupplier, senderBuyer } = tenderMessageDetail;
      const { currentUser } = this.context;
      if (
        // supplier -> buyer
        (!currentUser.isSupplier && senderSupplier) ||
        // buyer -> supplier
        (currentUser.isSupplier && senderBuyer)
      ) {
        const { tenderMessageSetAsRead } = this.props;
        tenderMessageSetAsRead({ variables: { _id: tenderMessageDetail._id } });
      }
    }
  }

  renderNested() {
    const { route, tenderMessageDetail } = this.state;
    const _id = tenderMessageDetail ? tenderMessageDetail._id : null;
    return (
      <>
        <Modal
          visible={route === ROUTE_ENUM.new}
          footer={null}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="New message"
          width={1080}
        >
          <CreateTenderMessage
            key={Math.random()}
            tenderDetail={this.props.tenderDetail}
            onComplete={this.goto.bind(this, ROUTE_ENUM.index, null)}
            width={1080}
          />
        </Modal>
        <Modal
          visible={route === ROUTE_ENUM.view}
          footer={null}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="View"
          width={1080}
        >
          <TenderMessageDetail tenderMessageDetail={tenderMessageDetail} />
        </Modal>
        <Modal
          visible={route === ROUTE_ENUM.reply}
          footer={null}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="Reply"
          width={1080}
        >
          <CreateTenderMessage
            key={_id}
            replyTo={this.state.tenderMessageDetail}
            tenderDetail={this.props.tenderDetail}
            onComplete={this.goto.bind(this, ROUTE_ENUM.index, null)}
          />
        </Modal>
      </>
    );
  }

  render() {
    const { tenderMessagesQuery, tenderMessageTotalCountQuery } = this.props;
    const { tenderMessages } = tenderMessagesQuery;
    const totalCount = tenderMessageTotalCountQuery.loading
      ? 0
      : tenderMessageTotalCountQuery.tenderMessageTotalCount;
    return (
      <>
        <Row>
          <div className="table-operations">
            <Button
              type="primary"
              icon="plus"
              onClick={this.goto.bind(this, ROUTE_ENUM.new, undefined)}
            >
              Create message
            </Button>
          </div>
        </Row>
        <Row>
          <Card>
            <Table
              columns={this.columns()}
              rowKey={({ _id }) => _id}
              rowClassName={({ isRead }) => (isRead ? undefined : 'message-new')}
              pagination={false}
              dataSource={tenderMessages}
              loading={tenderMessagesQuery.loading}
            />
            <Paginator total={totalCount} />
          </Card>
        </Row>
        <Row>
          <Card>{this.renderNested()}</Card>
        </Row>
      </>
    );
  }
}

Messages.propTypes = {
  tenderDetail: PropTypes.object,
  tenderMessagesQuery: PropTypes.object,
  suppliers: PropTypes.array,
  tenderMessageSetAsRead: PropTypes.func,
  tenderMessageTotalCountQuery: PropTypes.object,
};

Messages.contextTypes = {
  currentUser: PropTypes.object,
};

export default withRouter(Messages);
