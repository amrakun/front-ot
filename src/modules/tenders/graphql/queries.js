import { pageParams, pageValues } from 'modules/common/queries';

const tenderFields = `
  _id,
  status,
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
  sentRegretLetter
  isParticipated
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

const tenderParams = `$type: String!, $supplierId: String, $ignoreSubmitted: Boolean, $search: String, $status: String`;
const tenderValues = `type: $type, supplierId: $supplierId, ignoreSubmitted: $ignoreSubmitted, search: $search, status: $status`;

const tenders = `
  query tenders(${tenderParams} ${pageParams}) {
    tenders(${tenderValues} ${pageValues}) {
      ${tenderFields}
    }
  }
`;

const exportTenders = `
  query tendersExport(${tenderParams}) {
    tendersExport(${tenderValues})
  }
`;

const rfqBidSummaryReport = `
  query tenderResponsesRfqBidSummaryReport($tenderId: String!, $supplierIds: [String!]!) {
    tenderResponsesRfqBidSummaryReport(tenderId: $tenderId, supplierIds: $supplierIds)
  }
`;

const eoiShortList = `
  query tenderResponsesEoiShortList($tenderId: String!, $supplierIds: [String!]!) {
    tenderResponsesEoiShortList(tenderId: $tenderId, supplierIds: $supplierIds)
  }
`;

const eoiBidderList = `
  query tenderResponsesEoiBidderList($tenderId: String!, $supplierIds: [String!]!) {
    tenderResponsesEoiBidderList(tenderId: $tenderId, supplierIds: $supplierIds)
  }
`;

export default {
  tenderDetail,
  tenders,
  tenderUpdateDetail,
  rfqBidSummaryReport,
  eoiShortList,
  eoiBidderList,
  exportTenders
};
