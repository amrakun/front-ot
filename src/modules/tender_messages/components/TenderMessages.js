import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const renderRecipient = ({ recipientSuppliers }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    if (recipientSuppliers.length === 1) {
      return recipientSuppliers[0].username;
    }
    if (recipientSuppliers.length > 1)
      return `${recipientSuppliers.length} suppliers`;
  } else {
    return 'me';
  }
};

const renderSender = ({ senderSupplier, senderBuyer }) =>
  (senderSupplier || senderBuyer).username;

const renderIsReplied = ({ isReplySent, isAuto }) => {
  if (isAuto) return undefined;
  else return isReplySent ? <Icon type="export" /> : <Icon type="close" />;
};

const renderActions = ({ _id }) => (
  <Fragment>
    <Link key={`${_id}view`} to={`/msg/view/${_id}`}>
      View
    </Link>
    <Divider key="1" type="vertical" />
    <Link key={`${_id}edit`} to={`/msg/edit/${_id}`}>
      Edit
    </Link>
  </Fragment>
);

const renderAttachmentIcon = attachment =>
  attachment ? <Icon type="paper-clip" /> : undefined;

const columns = [
  {
    title: 'From',
    render: renderSender,
    width: 150
  },
  {
    title: 'To',
    render: renderRecipient,
    width: 150
  },
  {
    title: 'Reply sent',
    render: renderIsReplied,
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
    render: renderAttachmentIcon
  },
  {
    title: 'Body',
    dataIndex: 'body',
    render: body => {
      if (body && body.length > 100) return body.slice(100) + '...';
      else return body;
    }
  },
  {
    fixed: 'right',
    width: 80,
    render: renderActions
  }
];

const Messages = props => {
  console.log(props);
  const { data, match } = props;
  console.log(match);
  return (
    <Fragment>
      <Table
        columns={columns}
        rowKey={record => record._id}
        pagination={true}
        dataSource={data.tenderMessages}
        loading={data.loading}
      />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Fragment>
  );
};

Messages.propTypes = {
  data: PropTypes.obj,
  match: PropTypes.obj
};

export default withRouter(Messages);
