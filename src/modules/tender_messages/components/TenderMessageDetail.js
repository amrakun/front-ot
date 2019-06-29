import React from 'react';
import moment from 'moment';
import { Tag, Divider, Icon, Col, Row } from 'antd';
import { readFileUrl } from 'modules/common/utils';
import { dateTimeFormat } from 'modules/common/constants';

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

const Attachment = ({ attachment }) => {
  if (!attachment || !attachment.url) {
    return null;
  }

  return (
    <Row>
      <Col span={2}>Attachment: </Col>

      <Col span={22}>
        <p>
          <a href={readFileUrl(attachment.url)}>
            <Icon type="paper-clip" />
            Download attachment
          </a>
        </p>
      </Col>
    </Row>
  );
};

const Message = ({ message  }) => {
  return (
    <>
      <Row>
        <Col span={2}>Date: </Col>
        <Col span={22}><p>{moment(message.createdAt).format(dateTimeFormat)}</p></Col>
      </Row>

      <Sender {...message} />
      <Receivers {...message} />

      <Row>
        <Col span={2}>Subject: </Col>
        <Col span={22}><p>{message.subject}</p></Col>
      </Row>

      <Attachment attachment={message.attachment} />

      <Row>
        <Col span={2}>Content: </Col>
        <Col span={22}>
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        </Col>
      </Row>
    </>
  );
};

const TenderMessageDetail = ({ tenderMessageDetail }) => {
  if (!tenderMessageDetail) return null;

  return (
    <div>
      <Message message={tenderMessageDetail} />
      <Divider />

      {tenderMessageDetail.relatedMessages.map((message) => {
        return (
          <div key={message._id}>
            <Message message={message} />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default TenderMessageDetail;
