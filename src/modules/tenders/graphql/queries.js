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
      responses {
        supplier {
          _id
          basicInfo {
            enName,
            sapNumber,
            totalNumberOfEmployees
          }
          contactInfo {
            name,
            phone,
            email
          }
        }
        response {
          respondedProducts {
            code
            suggestedManufacturer
            suggestedManufacturerPartNumber
            unitPrice
            totalPrice
            leadTime
            comment
            file
          }
          respondedDocuments {
            name
            isSubmitted
            notes
            file
          }
        }
      },
    }
  }
`;

const companiesByIds = `
  query companies($region: String) {
    companies(region: $region) {
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

const tenders = `
  query tenders($type: String!, $supplierId: String, $ignoreSubmitted: Boolean) {
    tenders(type: $type, supplierId: $supplierId, ignoreSubmitted: $ignoreSubmitted) {
      ${tenderFields}
    }
  }
`;

export default {
  tenderDetail,
  tenders,
  companiesByIds
};
