const commonParams = `
  $number: String!,
  $name: String!,
  $content: String!,
  $attachments: [JSON],
  $publishDate: Date!,
  $closeDate: Date!,
  $file: JSON,
  $sourcingOfficer: String,
  $reminderDay: Float,
  $supplierIds: [String]!,
  $requestedProducts: [TenderRequestedProductInput]
  $requestedDocuments: [String]
`;

const commonFields = `
  number: $number,
  name: $name,
  content: $content,
  attachments: $attachments,
  publishDate: $publishDate,
  closeDate: $closeDate,
  file: $file,
  sourcingOfficer: $sourcingOfficer,
  reminderDay: $reminderDay,
  supplierIds: $supplierIds,
  requestedProducts: $requestedProducts
  requestedDocuments: $requestedDocuments
`;

const tendersAdd = `
  mutation tendersAdd(
    $type: String!,
    ${commonParams}
  ) {
    tendersAdd(
      type: $type,
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
  $respondedServiceFiles: [JSON]
  $respondedDocuments: [TenderRespondedDocumentInput]
`;

const tenderResponseFields = `
  tenderId: $tenderId,
  isNotInterested: $isNotInterested
  respondedProducts: $respondedProducts
  respondedServiceFiles: $respondedServiceFiles
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
  mutation tendersAward($_id: String! $supplierIds: [String!]!) {
    tendersAward(_id: $_id supplierIds: $supplierIds) {
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
  tenderResponsesSend
};
