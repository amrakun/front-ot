const tenderFields = `
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
    code
    purchaseRequestNumber
    shortText
    quantity
    uom
    manufacturer
    manufacturerPart
  },
`;

const tenderDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      ${tenderFields}
    }
  }
`;

const tenders = `
  query tenders {
    tenders {
      ${tenderFields}
    }
  }
`;

const companies = `
  query companies {
    companies {
      _id
      basicInfo {
        enName,
        email,
        sapNumber
      }
      contactInfo {
        phone
      }
    }
  }
`;

export default {
  tenderDetail,
  tenders,
  companies
};
