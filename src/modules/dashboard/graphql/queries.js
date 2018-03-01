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

const tendersTotalCountReport = `
  query tendersTotalCountReport(
    $startDate: Date!,
    $endDate: Date!
    $type: String!
  ){
    tendersTotalCountReport(
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

const logsSupplierLoginsExport = `
  query logsSupplierLoginsExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsSupplierLoginsExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsBuyerLoginsExport = `
  query logsBuyerLoginsExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsBuyerLoginsExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsSupplierLoginsByEoiSubmissionsExport = `
  query logsSupplierLoginsByEoiSubmissionsExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsSupplierLoginsByEoiSubmissionsExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsSupplierLoginsByRfqSubmissionsExport = `
  query logsSupplierLoginsByRfqSubmissionsExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsSupplierLoginsByRfqSubmissionsExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsSearchesPerBuyerExport = `
  query logsSearchesPerBuyerExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsSearchesPerBuyerExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsEoiCreatedAndSentExport = `
  query logsEoiCreatedAndSentExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsEoiCreatedAndSentExport(
      startDate: $startDate,
      endDate: $endDate,
    )
  }
`;

const logsRfqCreatedAndSentExport = `
  query logsRfqCreatedAndSentExport(
    $startDate: Date!,
    $endDate: Date!
  ){
    logsRfqCreatedAndSentExport(
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
  tendersTotalCountReport,
  tendersAverageDuration,
  reportsSuppliersExport,
  reportsTendersExport,
  reportsAuditExport,
  reportsShareholder,

  logsSupplierLoginsExport,
  logsBuyerLoginsExport,
  logsSupplierLoginsByEoiSubmissionsExport,
  logsSupplierLoginsByRfqSubmissionsExport,
  logsSearchesPerBuyerExport,
  logsEoiCreatedAndSentExport,
  logsRfqCreatedAndSentExport
};
