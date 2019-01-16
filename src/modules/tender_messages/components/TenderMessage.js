import React, { Fragment } from 'react';
import { Tag, Tooltip, Row, Divider, Icon } from 'antd';

const renderUser = user => (
  <Tag>
    {user.username}
    {'<'}
    {user.email}
    {'>'}
  </Tag>
);

const Sender = ({ senderBuyer, senderSupplier }) => {
  const sender = senderBuyer || senderSupplier;
  return <Fragment>From: {renderUser(sender)}</Fragment>;
};

const Receivers = ({ recipientSuppliers, tender }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    return <Fragment>To: {recipientSuppliers.map(renderUser)}</Fragment>;
  }
  return (
    <Fragment>
      To: {renderUser({ username: 'Tender', email: tender.number })}
    </Fragment>
  );
};

const TenderMessage = ({ tenderMessageDetailQuery }) => {
  const { tenderMessageDetail, loading } = tenderMessageDetailQuery;
  if (loading) return <Icon type="loading" />;
  return (
    <Fragment>
      <Sender {...tenderMessageDetail} />
      <Divider />
      <Receivers {...tenderMessageDetail} />
      <Divider />
      Subject: {tenderMessageDetail.subject}
      <Divider />
      {/* <Divider/> */}
      {tenderMessageDetail.body}
      <pre>{JSON.stringify(tenderMessageDetailQuery, null, 4)}</pre>;
    </Fragment>
  );
};

export default TenderMessage;
