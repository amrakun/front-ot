import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon, Divider, Card, message } from 'antd';
import { Route, Link, withRouter } from 'react-router-dom';
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
      return recipientSuppliers[0].username;
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

const senderUsername = ({ senderSupplier, senderBuyer }) =>
  (senderSupplier || senderBuyer).username;

const IsRepliedIcon = ({ isReplySent, isAuto }) => {
  if (isAuto) return <Icon type="stop" />;
  else return isReplySent ? <Icon type="export" /> : 'no';
};

const AttachmentIcon = attachment =>
  attachment ? <Icon type="paper-clip" /> : undefined;

const isNew = isRead =>
  !isRead ? <Icon type="info" theme="twoTone" /> : undefined;

class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { route: 'index', tenderMessageDetail: undefined };
  }

  columns() {
    const columns = [
      {
        title: 'From',
        render: senderUsername,
        width: 150
      },
      {
        title: 'To',
        render: Recipient,
        width: 150
      },
      {
        title: 'New',
        width: 60,
        dataIndex: 'isRead',
        render: isNew
      },
      {
        title: 'Replied',
        render: IsRepliedIcon,
        width: 65
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        width: 200
      },
      {
        title: <Icon type="paper-clip" />,
        width: 30,
        dataIndex: 'attachment',
        render: AttachmentIcon
      },
      {
        title: 'Body',
        dataIndex: 'body',
        render: body =>
          body && body.length > 100 ? body.slice(60) + '...' : body
      },
      {
        title: 'Actions',
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

  goto(route, tenderMessageDetail) {
    this.setState({ route, tenderMessageDetail });
  }

  renderNested() {
    const { route, tenderMessageDetail } = this.state;

    switch (route) {
      case ROUTE_ENUM.new:
        return <CreateTenderMessage />;
      case ROUTE_ENUM.edit:
        break;
      case ROUTE_ENUM.view:
        return (
          <TenderMessageDetail
            tenderMessageDetail={this.state.tenderMessageDetail}
          />
        );
      case ROUTE_ENUM.index:
        break;
      default:
        message.error('Unexpected route');
        break;
    }
  }

  render() {
    const { tenderMessagesQuery, match } = this.props;
    const { tenderMessages } = tenderMessagesQuery;
    return (
      <Fragment>
        <Button
          icon="plus"
          onClick={this.goto.bind(this, ROUTE_ENUM.new, undefined)}
        >
          Create message
        </Button>
        <Card>
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            pagination={true}
            dataSource={tenderMessages}
            loading={tenderMessagesQuery.loading}
          />
        </Card>
        <Card>{this.renderNested()}</Card>
      </Fragment>
    );
  }
}

Messages.propTypes = {
  tenderMessagesQuery: PropTypes.obj
};

export default withRouter(Messages);
