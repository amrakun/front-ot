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

const tenders = `
  query tenders {
    tenders {
      _id
      number
      name
      content
      publishDate
      closeDate
      file
      reminderDay
      supplierIds
      requestedProducts {
        code
        purchaseRequestNumber
        shortText
        quantity
        uom
        manufacturer
        manufacturerPart
        suggestedManufacturer
        suggestedManufacturerPart
        unitPrice
        totalPrice
        leadTime
        comment
        picture
      }
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
