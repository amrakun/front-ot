import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Divider, Card } from 'antd';
import { Route, Link, withRouter } from 'react-router-dom';
import TenderMessage from '../containers/TenderMessage';

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

const MessageLinks = ({ _id }) => (
  <Fragment>
    <Link key={`${_id}view`} to={`/tmsg/view/${_id}`}>
      View
    </Link>
  </Fragment>
);
MessageLinks.propTypes = {
  _id: PropTypes.string
};

const AttachmentIcon = attachment =>
  attachment ? <Icon type="paper-clip" /> : undefined;

const isNew = isRead =>
  !isRead ? <Icon type="info" theme="twoTone" /> : undefined;

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
    render: body => (body && body.length > 100 ? body.slice(60) + '...' : body)
  },
  {
    fixed: 'right',
    width: 80,
    render: MessageLinks
  }
];

const Messages = ({ tenderMessagesQuery, match }) => {
  const { tenderMessages } = tenderMessagesQuery;
  return (
    <Fragment>
      <Card>
        <Table
          columns={columns}
          rowKey={record => record._id}
          pagination={true}
          dataSource={tenderMessages}
          loading={tenderMessagesQuery.loading}
        />
      </Card>
      <Card>
        <Route path={`${match.url}/view/:_id`} component={TenderMessage} />
      </Card>
    </Fragment>
  );
};

Messages.propTypes = {
  tenderMessagesQuery: PropTypes.obj
};

export default withRouter(Messages);
