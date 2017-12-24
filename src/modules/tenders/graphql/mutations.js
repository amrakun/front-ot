const tendersInputType = `

`;

const tendersInput = `

`;

const tendersAdd = `
  mutation tendersAdd(
    $number: Float!,
    $name: String!,
    $content: String!,
    $publishDate: Date!,
    $closeDate: Date!,
    $file: JSON!,
    $reminderDay: Float!,
    $supplierIds: [String]!,
    $requestedProducts: [TenderRequestedProductInput]!
  ) {
    tendersAdd(
      type: "rfq",
      number: $number,
      name: $name,
      content: $content,
      publishDate: $publishDate,
      closeDate: $closeDate,
      file: $file,
      reminderDay: $reminderDay,
      supplierIds: $supplierIds,
      requestedProducts: $requestedProducts
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
    $requestedProducts: [TenderRequestedProductInput]!
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
    ) {
      _id
    }
  }
`;

const tendersResponsesAdd = `
  mutation tenderResponsesAdd(
    $tenderId: String!
    $supplierId: String!
    $respondedProducts: [TenderRespondedProductInput]!
  ) {
    tenderResponsesAdd(
      tenderId: $tenderId,
      supplierId: $supplierId
      respondedProducts: $respondedProducts
    ) {
      _id
    }
  }
`;

const tendersSubmit = `
  mutation tendersEdit(
    ${tendersInputType}
  ) {
    tendersEdit(
      ${tendersInput}
    ) {
      _id
    }
  }
`;

export default {
  tendersAdd,
  tendersEdit,
  tendersSubmit,
  tendersResponsesAdd
};
