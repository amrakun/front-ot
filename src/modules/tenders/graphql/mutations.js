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

export default {
  tendersAdd
};
