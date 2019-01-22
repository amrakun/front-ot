const tenderMessageBuyerSend = `
  mutation tenderMessageBuyerSend(
    $tenderId: String!
    $recipientSupplierIds: [String!]!
    $subject: String!
    $body: String!
    $attachment: TenderMessageAttachmentInput
    $replyToId: String
  ) {
    tenderMessageBuyerSend(
      tenderId: $tenderId
      recipientSupplierIds: $recipientSupplierIds
      subject: $subject
      body: $body
      attachment: $attachment
      replyToId: $replyToId
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
    $attachment: TenderMessageAttachmentInput
    $replyToId: String
  ) {
    tenderMessageSupplierSend(
      tenderId: $tenderId
      subject: $subject
      body: $body
      attachment: $attachment
      replyToId: $replyToId
    ) {
      _id
    }
  }
`;

const tenderMessageSetAsRead = `
  mutation tenderMessageSetAsRead($_id: String!) {
    tenderMessageSetAsRead(_id:$_id) {
      _id
    }
  }
`;
export default {
  tenderMessageBuyerSend,
  tenderMessageSupplierSend,
  tenderMessageSetAsRead
};
