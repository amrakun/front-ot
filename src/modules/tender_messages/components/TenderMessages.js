import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Table, Icon, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { CreateTenderMessage } from '../containers/';
import TenderMessageDetail from './TenderMessageDetail';

const ROUTE_ENUM = {
  index: 0,
  view: 1,
  new: 2,
  edit: 3
};

const Recipient = ({ recipientSuppliers }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    if (recipientSuppliers.length === 1) {
      const { enName, email } = recipientSuppliers[0].basicInfo;
      return `${enName} <${email}>`;
    }
    if (recipientSuppliers.length > 1)
      return `${recipientSuppliers.length} suppliers`;
  } else {
    return 'RFQ';
  }
};
Recipient.propTypes = {
  recipientSuppliers: PropTypes.array
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

const IsRepliedIcon = ({ isReplySent, isAuto }) => {
  if (isAuto) return <Icon type="stop" />;
  else return isReplySent ? <Icon type="export" /> : 'no';
};

const AttachmentIcon = attachment =>
  attachment ? <Icon type="paper-clip" /> : undefined;

class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { route: 'index', tenderMessageDetail: undefined };
    this.isNew = this.isNew.bind(this);
  }

  columns() {
    const columns = [
      {
        title: 'From',
        render: senderUsername,
        width: 150,
        key: 1
      },
      {
        title: 'To',
        render: Recipient,
        width: 150,
        key: 2
      },
      {
        title: 'New',
        width: 60,
        render: this.isNew,
        key: 3
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
        key: 5
      },
      // {
      //   title: <Icon type="paper-clip" />,
      //   width: 30,
      //   dataIndex: 'attachment',
      //   render: AttachmentIcon,
      //   key: 6
      // },
      {
        title: 'Body',
        dataIndex: 'body',
        key: 7,
        render: body =>
          body && body.length > 100 ? body.slice(60) + '...' : body
      },
      {
        title: 'Actions',
        key: 8,
        render: tenderMessageDetail => {
          return (
            <Button
              key={`${tenderMessageDetail._id}view`}
              onClick={this.goto.bind(
                this,
                ROUTE_ENUM.view,
                tenderMessageDetail
              )}
            >
              View
            </Button>
          );
        }
      }
    ];
    return columns;
  }

  isNew(record) {
    console.log(record);
    const { isRead, senderSupplier, senderBuyer } = record;
    const { currentUser } = this.context;

    if (currentUser.isSupplier && senderBuyer) {
      return isRead ? undefined : <Icon type="info-circle" />;
    }

    if (!currentUser.isSupplier && senderSupplier) {
      console.log('from supplier', isRead);
      return isRead ? undefined : <Icon type="info-circle" />;
    }
  }

  goto(route, tenderMessageDetail) {
    this.setState({ route, tenderMessageDetail });

    if (route === ROUTE_ENUM.view && !tenderMessageDetail.isRead) {
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
    switch (route) {
      case ROUTE_ENUM.new:
        return <CreateTenderMessage tenderDetail={this.props.tenderDetail} />;
      case ROUTE_ENUM.view:
        return (
          <TenderMessageDetail tenderMessageDetail={tenderMessageDetail} />
        );
      case ROUTE_ENUM.index:
        break;
      case ROUTE_ENUM.edit:
        break;
      default:
        break;
    }
  }

  render() {
    const { tenderMessagesQuery } = this.props;
    const { tenderMessages } = tenderMessagesQuery;
    return (
      <>
        <Row>
          <Button
            icon="plus"
            onClick={this.goto.bind(this, ROUTE_ENUM.new, undefined)}
          >
            Create message
          </Button>
        </Row>
        <Row>
          <Card>
            <Table
              columns={this.columns()}
              rowKey={({ _id }) => _id}
              rowClassName={({ isRead }) =>
                isRead ? undefined : 'message-new'
              }
              pagination={true}
              dataSource={tenderMessages}
              loading={tenderMessagesQuery.loading}
            />
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
  tenderMessageSetAsRead: PropTypes.func
};

Messages.contextTypes = {
  currentUser: PropTypes.object
};

export default withRouter(Messages);
