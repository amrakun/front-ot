const tendersAdd = `
  mutation tendersAdd(
    $type: String!,
    $number: Float!,
    $name: String!,
    $content: String!,
    $publishDate: Date!,
    $closeDate: Date!,
    $file: JSON!,
    $reminderDay: Float!,
    $supplierIds: [String]!,
    $requestedProducts: [TenderRequestedProductInput]
    $requestedDocuments: [String]
  ) {
    tendersAdd(
      type: $type,
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
    ) {
      _id
    }
  }
`;

const tendersEdit = `
  mutation tendersEdit(
    $_id: String!,
    $number: Float!,
    $name: String!,
    $content: String!,
    $publishDate: Date!,
    $closeDate: Date!,
    $file: JSON!,
    $reminderDay: Float!,
    $supplierIds: [String]!,
    $requestedProducts: [TenderRequestedProductInput]
    $requestedDocuments: [String]
  ) {
    tendersEdit(
      _id: $_id,
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
    ) {
      _id
    }
  }
`;

const tendersResponsesAdd = `
  mutation tenderResponsesAdd(
    $tenderId: String!
    $supplierId: String!
    $isNotInterested: Boolean
    $respondedProducts: [TenderRespondedProductInput]
    $respondedDocuments: [TenderRespondedDocumentInput]
  ) {
    tenderResponsesAdd(
      tenderId: $tenderId,
      supplierId: $supplierId
      isNotInterested: $isNotInterested
      respondedProducts: $respondedProducts
      respondedDocuments: $respondedDocuments
    ) {
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
      _id
    }
  }
`;

export default {
  tendersAdd,
  tendersEdit,
  tendersResponsesAdd,
  tendersAward
};
