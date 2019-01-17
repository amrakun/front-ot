import React, { Fragment } from 'react';
import { Tag, Divider, Input } from 'antd';

const renderUser = user => (
  <Tag key={user.email}>
    {user.username}
    {'<'}
    {user.email}
    {'>'}
  </Tag>
);

const renderCompany = ({ _id, basicInfo: { enName, email } }) => (
  <Tag key={email}>
    {enName}
    {'<'}
    {email}
    {'>'}
  </Tag>
);

const Sender = ({ senderBuyer, senderSupplier }) => {
  if (senderBuyer) {
    return <Fragment>From: {renderUser(senderBuyer)}</Fragment>;
  }

  if (senderSupplier) {
    return <Fragment>From: {renderCompany(senderSupplier)}</Fragment>;
  }
};

const Receivers = ({ recipientSuppliers, tender }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    return <Fragment>To: {recipientSuppliers.map(renderCompany)}</Fragment>;
  }
  return (
    <Fragment>
      To: {renderUser({ username: 'Tender', email: tender.number })}
    </Fragment>
  );
};

const TenderMessageDetail = ({ tenderMessageDetail }) => {
  if (!tenderMessageDetail) return null;
  return (
    <Fragment>
      <Sender {...tenderMessageDetail} />
      <Divider />
      <Receivers {...tenderMessageDetail} />
      <Divider />
      Subject: {tenderMessageDetail.subject}
      <Divider />
      <textera>{tenderMessageDetail.body}</textera>
    </Fragment>
  );
};

export default TenderMessageDetail;
