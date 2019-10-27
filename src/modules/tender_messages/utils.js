import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
import { dateTimeFormat } from 'modules/common/constants';

export const renderDate = tenderMessage => {
  return moment(tenderMessage.createdAt).format(dateTimeFormat);
};

export const renderSupplierName = supplier => {
  if (!supplier.basicInfo) {
    return '';
  }

  const { enName, email } = supplier.basicInfo;

  return <Tag key={supplier._id}>{`${enName} <${email}>`}</Tag>;
};

export const renderRecipient = ({ tenderMessage, currentUser, isDetailed }) => {
  const { recipientSuppliers, eoiTargets, senderSupplier } = tenderMessage;

  if (currentUser.isSupplier) {
    if (senderSupplier) {
      return 'OT';
    }

    const recipientSupplier = recipientSuppliers.find(s => s._id === currentUser.companyId);

    return renderSupplierName(recipientSupplier);
  }

  if (eoiTargets) {
    return eoiTargets === 'toAll' ? 'To all' : 'To particated suppliers';
  }

  if (recipientSuppliers && recipientSuppliers.length >= 1) {
    if (isDetailed) {
      return recipientSuppliers.map(supplier => renderSupplierName(supplier));
    }

    if (recipientSuppliers.length === 1) {
      return renderSupplierName(recipientSuppliers[0]);
    }

    return `${recipientSuppliers.length} suppliers`;
  }

  return 'OT';
};

export const renderSender = tenderMessage => {
  const { senderBuyer, senderSupplier } = tenderMessage;

  if (senderBuyer) {
    return <Tag>OT</Tag>;
  }

  if (senderSupplier) {
    return renderSupplierName(senderSupplier);
  }
};
