const tenderFields = `
  _id,
  type,
  number,
  name,
  content,
  publishDate,
  closeDate,
  file,
  reminderDay,
  supplierIds,
  requestedCount,
  submittedCount,
  notInterestedCount,
  notRespondedCount,
  requestedProducts {
    code
    purchaseRequestNumber
    shortText
    quantity
    uom
    manufacturer
    manufacturerPartNumber
  },
  requestedDocuments
  winnerId
  isAwarded
`;

const tenderDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      ${tenderFields}
      suppliers {
        _id
        basicInfo {
          enName,
          email,
          sapNumber
        }
        contactInfo {
          phone
        }
      },
    }
  }
`;

const tenders = `
  query tenders($type: String!, $supplierId: String) {
    tenders(type: $type, supplierId: $supplierId) {
      ${tenderFields}
    }
  }
`;

export default {
  tenderDetail,
  tenders
};
