const companyByUser = `
  query companyByUser {
    companyByUser {
      _id
      openTendersCount
      averageDifotScore
      isPrequalified
      audits {
        _id
        publishDate
        supplierResponse {
          isSent
        }
      }
      lastFeedback {
        _id
        supplierResponse {
          status
        }
      }
      isSentRegistrationInfo
      isSentPrequalificationInfo
    }
  }
`;

const reportsSuppliersExport = `
  query reportsSuppliersExport(
    $productCodes: [String],
    $isPrequalified: Boolean,
    $tierType: String
  ) {
    reportsSuppliersExport(
      productCodes: $productCodes,
      isPrequalified: $isPrequalified,
      tierType: $tierType
    )
  }
`;

const reportsTendersExport = `
  query reportsTendersExport(
    $type: ReportsTendersType
    $publishDate: DateInterval
    $closeDate: DateInterval
  ) {
    reportsTendersExport(
      type: $type
      publishDate: $publishDate
      closeDate: $closeDate
    )
  }
`;

const reportsAuditExport = `
  query reportsAuditExport(
    $type: String
    $publishDate: DateInterval
    $closeDate: DateInterval
  ) {
    reportsAuditExport(
      type: $type
      publishDate: $publishDate
      closeDate: $closeDate
    )
  }
`;

const reportsShareholder = `
  query reportsShareholder {
    reportsShareholder
  }
`;

const companiesCountByTierType = `
  query companiesCountByTierType($startDate: Date!, $endDate: Date!){
    companiesCountByTierType(startDate: $startDate, endDate: $endDate)
  }
`;

const companiesCountByRegisteredVsPrequalified = `
  query companiesCountByRegisteredVsPrequalified(
    $startDate: Date!,
    $endDate: Date!
    $productCodes: String
  ){
    companiesCountByRegisteredVsPrequalified(
      startDate: $startDate,
      endDate: $endDate,
      productCodes: $productCodes
    )
  }
`;

const tenderCountByStatus = `
  query tenderCountByStatus(
    $startDate: Date!,
    $endDate: Date!
    $type: String!
  ){
    tenderCountByStatus(
      startDate: $startDate,
      endDate: $endDate,
      type: $type
    )
  }
`;

const tendersTotalCount = `
  query tendersTotalCount(
    $startDate: Date!,
    $endDate: Date!
    $type: String!
  ){
    tendersTotalCount(
      startDate: $startDate,
      endDate: $endDate,
      type: $type
    )
  }
`;

const tendersAverageDuration = `
  query tendersAverageDuration(
    $startDate: Date!,
    $endDate: Date!
    $type: String!
  ){
    tendersAverageDuration(
      startDate: $startDate,
      endDate: $endDate,
      type: $type
    )
  }
`;

const logsActivitiesPerBuyerExport = `
  query logsActivitiesPerBuyerExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsActivitiesPerBuyerExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsUserLastLoginsExport = `
  query logsUserLastLoginsExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsUserLastLoginsExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

export default {
  companyByUser,
  companiesCountByTierType,
  companiesCountByRegisteredVsPrequalified,
  tenderCountByStatus,
  tendersTotalCount,
  tendersAverageDuration,
  reportsSuppliersExport,
  reportsTendersExport,
  reportsAuditExport,
  reportsShareholder,
  logsActivitiesPerBuyerExport,
  logsUserLastLoginsExport
};
