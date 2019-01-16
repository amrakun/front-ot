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
    username,
    email,
    role,
    isSupplier,
    companyId,
    firstName,
    lastName,
    jobTitle,
    phone,
    delegatedUserId,
    delegationStartDate,
    delegationEndDate,
    temporarySecureInformation
  },
  recipientSuppliers {
    username,
    email,
    role,
    isSupplier,
    companyId,
    firstName,
    lastName,
    jobTitle,
    phone,
    delegatedUserId,
    delegationStartDate,
    delegationEndDate,
    temporarySecureInformation
  },
  senderSupplier {
    username,
    email,
    role,
    isSupplier,
    companyId,
    firstName,
    lastName,
    jobTitle,
    phone,
    delegatedUserId,
    delegationStartDate,
    delegationEndDate,
    temporarySecureInformation
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

export default { tenderMessages, tenderMessageDetail };
