import React from 'react';
import { Tag, Divider, Input } from 'antd';

const { TextArea } = Input;

const renderUser = user => (
  <Tag key={user.email}>
    {user.username}
    {'<'}
    {user.email}
    {'>'}
  </Tag>
);

const renderCompany = ({ _id, basicInfo: { enName, email } }) => (
  <Tag key={_id}>
    {enName}
    {' <'}
    {email}
    {'>'}
  </Tag>
);

const Sender = ({ senderBuyer, senderSupplier }) => {
  if (senderBuyer) {
    return <>From: {renderUser(senderBuyer)}</>;
  }

  if (senderSupplier) {
    return <>From: {renderCompany(senderSupplier)}</>;
  }
};

const Receivers = ({ recipientSuppliers, tender }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    return <>To: {recipientSuppliers.map(renderCompany)}</>;
  }
  return <>To: {renderUser({ username: 'Tender', email: tender.number })}</>;
};

const TenderMessageDetail = ({ tenderMessageDetail }) => {
  if (!tenderMessageDetail) return null;
  return (
    <>
      <Sender {...tenderMessageDetail} />
      <Divider />
      <Receivers {...tenderMessageDetail} />
      <Divider />
      Subject: {tenderMessageDetail.subject}
      <Divider />
      <TextArea readOnly autosize value={tenderMessageDetail.body} />
    </>
  );
};

export default TenderMessageDetail;
