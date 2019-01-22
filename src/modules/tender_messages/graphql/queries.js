const supplierFields = `
  _id,
  basicInfo {
    enName,
    email
  }
`;

const tenderMessageFields = `
  _id,
  tender {
    _id,
    rfqType,
    createdDate,
    sourcingOfficer,
    number,
    isAwarded
  },
  senderBuyer {
    _id,
    username,
    email,
    isSupplier,
    firstName,
    lastName,
    jobTitle,
    phone,
  },
  recipientSuppliers {
    ${supplierFields}
  },
  senderSupplier {
    ${supplierFields}
  },
  subject,
  body,
  attachment {
    name,
    url
  },
  isAuto,
  isRead,
  isReplySent
`;
const tenderMessages = `
  query tenderMessages($page: Int, $perPage: Int, $tenderId: String) {
    tenderMessages(page: $page, perPage: $perPage, tenderId: $tenderId) {
      ${tenderMessageFields}
    }
  }
`;

const tenderMessageDetail = `
  query tenderMessageDetail($_id : String!) {
    tenderMessageDetail(_id : $_id) {
      ${tenderMessageFields}
    }
  }
`;

const tenderMessageTotalCount = `
  query tenderMessageTotalCount($tenderId: String) {
    tenderMessageTotalCount(tenderId : $tenderId)
  }
`;

export default { tenderMessages, tenderMessageDetail, tenderMessageTotalCount };
