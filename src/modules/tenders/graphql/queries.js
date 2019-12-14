import { pageParams, pageValues } from 'modules/common/constants';

const requestedProductsFields = `
  requestedProducts {
    productId
    code
    purchaseRequestNumber
    shortText
    quantity
    uom
    manufacturer
    manufacturerPartNumber
  }
`;

const tenderFields = `
  _id,
  status,
  type,
  rfqType,
  number,
  name,
  content,
  attachments,
  publishDate,
  closeDate,
  file,
  sourcingOfficer,
  reminderDay,
  requestedCount,
  submittedCount,
  notInterestedCount,
  notRespondedCount,
  createdUser {
    email
  },
  responsibleBuyerIds
  responses {
    supplierId
    isNotInterested
  }
  winnerIds
  notBidderListedSuppliers {
    basicInfo {
      enName
    }
  }
  isAwarded
  awardNote
  sentRegretLetter
`;

const tenderDetailFields = `
  isToAll,
  tierTypes,
  ${tenderFields}
  ${requestedProductsFields}
  requestedDocuments
`;

const rfqResponseFields = `
  respondedProducts {
    productId
    code
    suggestedManufacturer
    suggestedManufacturerPartNumber
    unitPrice
    totalPrice
    currency
    leadTime
    shippingTerms
    alternative
    comment
    file
  }
  respondedFiles
`;

const eoiResponseFields = `
  status
  respondedDocuments {
    name
    isSubmitted
    notes
    file
  }
`;

const tenderResponseSupplierFields = `
  _id
  isQualified
  prequalificationStatusDisplay
  isProductsInfoValidated
  averageDifotScore
  lastDueDiligence
  basicInfo {
    enName,
    sapNumber,
    totalNumberOfEmployees,
    certificateOfRegistration,
    corporateStructure,
    totalNumberOfEmployees
  }
  contactInfo {
    name,
    phone,
    email
  }
  businessInfo {
    doesHaveCodeEthicsFile
  }
  healthInfo {
    areHSEResourcesClearlyIdentifiedFile
  }
  shareholderInfo {
    attachments
  }
`;

const tenderResponsesParams = `
  $tenderId: String!
  $sort: JSON
  $betweenSearch: JSON
  $supplierSearch: String
  $isNotInterested: Boolean
`;

const tenderResponsesValues = `
  tenderId: $tenderId
  sort: $sort
  betweenSearch: $betweenSearch
  supplierSearch: $supplierSearch
  isNotInterested: $isNotInterested
`;

const tenderResponses = `
  query tenderResponses(
    ${tenderResponsesParams}
    ${pageParams}
  ) {
    tenderResponses(
      ${tenderResponsesValues}
      ${pageValues}
    ) {
      supplier {
        ${tenderResponseSupplierFields}
      }
      ${rfqResponseFields}
      ${eoiResponseFields}
    }
  }
`;

const tenderResponsesTotalCount = `
  query tenderResponsesTotalCount(${tenderResponsesParams}) {
    tenderResponsesTotalCount(${tenderResponsesValues})
  }
`;

const tenderResponseNotRespondedSuppliers = `
  query tenderResponseNotRespondedSuppliers($tenderId: String!, ${pageParams}) {
    tenderResponseNotRespondedSuppliers(tenderId: $tenderId, ${pageValues}) {
      list {
        ${tenderResponseSupplierFields}
      }
      totalCount
    }
  }
`;

const tenderResponseInvitedSuppliers = `
  query tenderResponseInvitedSuppliers($tenderId: String!, ${pageParams}) {
    tenderResponseInvitedSuppliers(tenderId: $tenderId, ${pageValues}) {
      list {
        ${tenderResponseSupplierFields}
      }
      totalCount
    }
  }
`;

const companies = `
  query companies($_ids: [String]) {
    companies(_ids: $_ids) {
      ${tenderResponseSupplierFields}
    }
  }
`;

const tenderDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      ${tenderDetailFields}
    }
  }
`;

const tenderDetailSupplier = `
  query tenderDetailSupplier($_id: String!) {
    tenderDetailSupplier(_id: $_id) {
      _id
      status
      type
      rfqType
      number
      name
      content
      publishDate
      closeDate
      file
      ${requestedProductsFields}
      requestedDocuments
      isSent
    }
  }

`;

const tenderResponseByUser = `
  query tenderResponseByUser($tenderId: String!) {
    tenderResponseByUser(tenderId: $tenderId) {
      isSent
      isNotInterested
      ${rfqResponseFields}
      ${eoiResponseFields}
    }
  }
`;

const tenderUpdateDetail = `
  query tenderDetail($_id: String!) {
    tenderDetail(_id: $_id) {
      ${tenderDetailFields}
      suppliers {
        _id
        basicInfo {
          enName
        }
      }
    }
  }
`;

const tenderParams = `$type: String!, $search: String, $status: String, $month: Date`;
const tenderValues = `type: $type, search: $search, status: $status, month: $month`;

const tendersBuyer = `
  query tenders(${tenderParams} ${pageParams}) {
    tenders(${tenderValues} ${pageValues}) {
      ${tenderFields}
    }
  }
`;

const tendersSupplier = `
  query tendersSupplier(${tenderParams} ${pageParams}) {
    tendersSupplier(${tenderValues} ${pageValues}) {
      _id
      status
      type
      rfqType
      createdDate
      number
      name
      publishDate
      closeDate
      reminderDay
      isAwarded
      isParticipated
      isNotInterested
      isSent
    }
  }
`;

const exportTenders = `
  query tendersExport(${tenderParams}) {
    tendersExport(${tenderValues})
  }
`;

const rfqBidSummaryReport = `
  query tenderResponsesRfqBidSummaryReport($tenderId: String!, $supplierIds: [String!]!, $sort: String, $exchangeRate: Float) {
    tenderResponsesRfqBidSummaryReport(tenderId: $tenderId, supplierIds: $supplierIds, sort: $sort, exchangeRate: $exchangeRate)
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

const generateMaterialsTemplate = `
  query tenderGenerateMaterialsTemplate($tenderId: String!) {
    tenderGenerateMaterialsTemplate(tenderId: $tenderId)
  }
`;

const totalSupplierTenders = `
  query tendersSupplierTotalCount(
    $page: Int
    $perPage: Int
    $type: String
    $status: String
    $search: String
    $sortField: String
    $sortDirection: Int
  ) {
    tendersSupplierTotalCount(
      page: $page
      perPage: $perPage
      type: $type
      status: $status
      search: $search
      sortField: $sortField
      sortDirection: $sortDirection
    )
  }
`;

const totalBuyerTenders = `
  query tendersBuyerTotalCount(
    $page: Int
    $perPage: Int
    $type: String
    $status: String
    $search: String
    $sortField: String
    $sortDirection: Int
  ) {
    tendersBuyerTotalCount(
      page: $page
      perPage: $perPage
      type: $type
      status: $status
      search: $search
      sortField: $sortField
      sortDirection: $sortDirection
    )
  }
`;

const buyers = `
  query users {
    users {
      _id
      firstName
      lastName
    }
  }
`;

const logsTender = `
  query logsTender($page: Int, $perPage: Int, $tenderId: String!) {
    logsTender(page: $page, perPage: $perPage, tenderId: $tenderId) {
      _id
      user {
        _id 
        username
        email
        role
        isSupplier
        companyId
        firstName
        lastName
        jobTitle
        phone
      }
      isAuto
      action
      description
      createdAt
    }
  }
`;

const logsTenderTotalCount = `
  query logsTenderTotalCount($tenderId: String!) {
    logsTenderTotalCount(tenderId: $tenderId)
  }
`;

export default {
  tenderResponses,
  tenderResponsesTotalCount,
  tenderDetail,
  tendersBuyer,
  tendersSupplier,
  totalSupplierTenders,
  totalBuyerTenders,
  tenderUpdateDetail,
  tenderDetailSupplier,
  rfqBidSummaryReport,
  eoiShortList,
  eoiBidderList,
  exportTenders,
  tenderResponseByUser,
  generateMaterialsTemplate,
  tenderResponseNotRespondedSuppliers,
  tenderResponseInvitedSuppliers,
  companies,
  buyers,
  logsTender,
  logsTenderTotalCount,
};
