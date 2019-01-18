import React, { Fragment, Component } from 'react';
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
        dataIndex: 'isRead',
        render: isNew,
        key: 3
      },
      {
        title: 'Replied',
        render: IsRepliedIcon,
        width: 65,
        key: 4
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        width: 200,
        key: 5
      },
      {
        title: <Icon type="paper-clip" />,
        width: 30,
        dataIndex: 'attachment',
        render: AttachmentIcon,
        key: 6
      },
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

  goto(route, tenderMessageDetail) {
    this.setState({ route, tenderMessageDetail });
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
      <Fragment>
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
              pagination={true}
              dataSource={tenderMessages}
              loading={tenderMessagesQuery.loading}
            />
          </Card>
        </Row>
        <Row>
          <Card>{this.renderNested()}</Card>
        </Row>
      </Fragment>
    );
  }
}

Messages.propTypes = {
  tenderDetail: PropTypes.object,
  tenderMessagesQuery: PropTypes.object,
  suppliers: PropTypes.array
};

export default withRouter(Messages);
