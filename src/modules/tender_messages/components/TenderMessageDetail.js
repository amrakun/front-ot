import React from 'react';
import { Tag, Divider, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { readFileUrl } from 'modules/common/utils';

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

const FileLink = ({ attachment }) => {
  if (!attachment || !attachment.url) return null;
  else
    return (
      <>
        <Divider />
        <a href={readFileUrl(attachment.url)}>
          <Icon type="paper-clip" />
          Download attachment
        </a>
      </>
    );
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
      <FileLink attachment={tenderMessageDetail.attachment} />
      <Divider />
      <TextArea readOnly autosize value={tenderMessageDetail.body} />
    </>
  );
};

export default TenderMessageDetail;
