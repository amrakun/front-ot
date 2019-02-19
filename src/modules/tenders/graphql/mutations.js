const commonParams = `
  $number: String!
  $name: String!
  $content: String!
  $attachments: [JSON]
  $publishDate: Date!
  $closeDate: Date!
  $file: JSON
  $sourcingOfficer: String
  $responsibleBuyerIds: [String]
  $reminderDay: Float
  $supplierIds: [String]
  $isToAll: Boolean
  $tierTypes: [String]
  $requestedProducts: [TenderRequestedProductInput]
  $requestedDocuments: [String]
`;

const commonFields = `
  number: $number
  name: $name
  content: $content
  attachments: $attachments
  publishDate: $publishDate
  closeDate: $closeDate
  file: $file
  sourcingOfficer: $sourcingOfficer
  responsibleBuyerIds: $responsibleBuyerIds
  reminderDay: $reminderDay
  supplierIds: $supplierIds
  isToAll: $isToAll
  tierTypes: $tierTypes
  requestedProducts: $requestedProducts
  requestedDocuments: $requestedDocuments
`;

const tendersAdd = `
  mutation tendersAdd(
    $type: String!,
    $rfqType: String,
    ${commonParams}
  ) {
    tendersAdd(
      type: $type,
      rfqType: $rfqType,
      ${commonFields}
    ) {
      _id
    }
  }
`;

const tendersEdit = `
  mutation tendersEdit(
    $_id: String!,
    ${commonParams}
  ) {
    tendersEdit(
      _id: $_id,
      ${commonFields}
    ) {
      _id
    }
  }
`;

const tenderResponseParams = `
  $tenderId: String!
  $isNotInterested: Boolean
  $respondedProducts: [TenderRespondedProductInput]
  $respondedFiles: [JSON]
  $respondedDocuments: [TenderRespondedDocumentInput]
`;

const tenderResponseFields = `
  tenderId: $tenderId,
  isNotInterested: $isNotInterested
  respondedProducts: $respondedProducts
  respondedFiles: $respondedFiles
  respondedDocuments: $respondedDocuments
`;

const tendersResponsesAdd = `
  mutation tenderResponsesAdd(
    ${tenderResponseParams}
  ) {
    tenderResponsesAdd(
      ${tenderResponseFields}
    ) {
      _id
    }
  }
`;

const tendersResponsesEdit = `
  mutation tenderResponsesEdit(
    ${tenderResponseParams}
  ) {
    tenderResponsesEdit(
      ${tenderResponseFields}
    ) {
      _id
    }
  }
`;

const tenderResponsesSend = `
  mutation tenderResponsesSend($tenderId: String, $supplierId: String) {
    tenderResponsesSend(tenderId: $tenderId, supplierId: $supplierId) {
      _id
    }
  }
`;

const tendersAward = `
  mutation tendersAward(
    $_id: String!
    $supplierIds: [String!]!
    $note: String
    $attachments: [TenderAwardAttachment]
  ) {
    tendersAward(
      _id: $_id
      supplierIds: $supplierIds
      note: $note
      attachments: $attachments
    ) {
      type
    }
  }
`;

const sendRegretLetter = `
  mutation tendersSendRegretLetter(
    $_id: String!
    $subject: String!
    $content: String!
  ) {
    tendersSendRegretLetter(
      _id: $_id
      subject: $subject
      content: $content
    )
  }
`;

const tendersCancel = `
  mutation tendersCancel($_id: String!) {
    tendersCancel(_id: $_id) {
      _id
    }
  }
`;

export default {
  tendersAdd,
  tendersCancel,
  tendersEdit,
  tendersResponsesAdd,
  tendersResponsesEdit,
  tendersAward,
  sendRegretLetter,
  tenderResponsesSend,
};
