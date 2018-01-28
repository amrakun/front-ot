const commonParams = `
  $number: String!,
  $name: String!,
  $content: String!,
  $publishDate: Date!,
  $closeDate: Date!,
  $file: JSON,
  $reminderDay: Float!,
  $supplierIds: [String]!,
  $requestedProducts: [TenderRequestedProductInput]
  $requestedDocuments: [String]
`;

const commonFields = `
  number: $number,
  name: $name,
  content: $content,
  publishDate: $publishDate,
  closeDate: $closeDate,
  file: $file,
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
  $respondedDocuments: [TenderRespondedDocumentInput]
`;

const tenderResponseFields = `
  tenderId: $tenderId,
  isNotInterested: $isNotInterested
  respondedProducts: $respondedProducts
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
    $supplierId: String!
  ) {
    tendersAward(
      _id: $_id
      supplierId: $supplierId
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

export default {
  tendersAdd,
  tendersEdit,
  tendersResponsesAdd,
  tendersResponsesEdit,
  tendersAward,
  sendRegretLetter,
  tenderResponsesSend
};
