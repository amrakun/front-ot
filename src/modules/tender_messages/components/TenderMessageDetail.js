import React from 'react';
import { Tag, Divider, Icon, Col, Row } from 'antd';
import { readFileUrl } from 'modules/common/utils';

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
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}><Tag>OT</Tag></Col>
      </Row>
    );
  }

  if (senderSupplier) {
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}>{renderCompany(senderSupplier)}</Col>
      </Row>
    );
  }
};

const Receivers = ({ recipientSuppliers, tender }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    return (
      <Row>
        <Col span={2}>To: </Col>
        <Col span={22}>{recipientSuppliers.map(renderCompany)}</Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col span={2}>To: </Col>
      <Col span={22}>{renderUser({ username: 'Tender', email: tender.number })}</Col>
    </Row>
  );
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
      <Row>
        <Col span={2}>Subject: </Col>
        <Col span={22}>{tenderMessageDetail.subject}</Col>
      </Row>
      <FileLink attachment={tenderMessageDetail.attachment} />
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: tenderMessageDetail.body }} />
    </>
  );
};

export default TenderMessageDetail;
