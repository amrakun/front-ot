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
  createdUser {
    email
  },
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
          enName
        }
      }
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

const tenderUpdateDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      ${tenderFields}
      suppliers {
        _id
        basicInfo {
          enName
        }
      }
    }
  }
`;

const companiesByIds = `
  query companies($_ids: [String]) {
    companies(_ids: $_ids) {
      _id
      basicInfo {
        enName,
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

const rfqBidSummaryReport = `
  query tenderResponsesRfqBidSummaryReport($tenderId: String!, $supplierIds: [String!]!) {
    tenderResponsesRfqBidSummaryReport(tenderId: $tenderId, supplierIds: $supplierIds)
  }
`;

export default {
  tenderDetail,
  tenders,
  companiesByIds,
  tenderUpdateDetail,
  rfqBidSummaryReport
};
