const tenderMessageBuyerSend = `
  mutation tenderMessageBuyerSend(
    $tenderId: String!
    $recipientSupplierIds: [String!]!
    $subject: String!
    $body: String!
  ) {
    tenderMessageBuyerSend(
      tenderId: $tenderId
      recipientSupplierIds: $recipientSupplierIds
      subject: $subject
      body: $body
    ) {
      _id
    }
  }
`;

const tenderMessageSupplierSend = `
  mutation tenderMessageSupplierSend(
    $tenderId: String!
    $subject: String!
    $body: String!
  ) {
    tenderMessageSupplierSend(
      tenderId: $tenderId
      subject: $subject
      body: $body
    ) {
      type
    }
  }
`;

export default { tenderMessageBuyerSend, tenderMessageSupplierSend };
