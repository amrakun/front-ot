const tenderDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      _id,
      number,
      name,
      content,
      publishDate,
      closeDate,
      file,
      reminderDay,
      supplierIds,
      requestedProducts {
        code,
        purchaseRequestNumber
      },
    }
  }
`;

export default {
  tenderDetail
};
