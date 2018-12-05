const companyByUser = `
  query companyByUser {
    companyByUser {
      _id
      openTendersCount
      averageDifotScore
      isPrequalified
      hasNewAudit

      auditImprovementPlanNotification {
        _id
        auditId
      }

      lastFeedback {
        _id
        supplierResponse {
          status
        }
      }
      isSentRegistrationInfo
      isSentPrequalificationInfo
      prequalifiedStatus
    }
  }
`;

const reportsSuppliersExport = `
  query reportsSuppliersExport(
    $productCodes: [String],
    $state: String,
    $tierType: String
  ) {
    reportsSuppliersExport(
      productCodes: $productCodes,
      state: $state,
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
  query reportsShareholder($name: String) {
    reportsShareholder(name: $name)
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

const companiesCountByProductCode = `
  query companiesCountByProductCode(
    $startDate: Date!,
    $endDate: Date!
  ){
    companiesCountByProductCode(
      startDate: $startDate,
      endDate: $endDate,
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

const logsSuppliersByProductCodeLogsExport = `
  query logsSuppliersByProductCodeLogsExport(
    $startDate: Date!,
    $endDate: Date!,
    $productCodes: [String!]
  ){
    logsSuppliersByProductCodeLogsExport(
      startDate: $startDate,
      endDate: $endDate,
      productCodes: $productCodes
    )
  }
`;

const logsActivityLogsExport = `
  query logsActivityLogsExport(
    $startDate: Date!,
    $endDate: Date!,
    $module: String
  ){
    logsActivityLogsExport(
      startDate: $startDate,
      endDate: $endDate,
      module: $module
    )
  }
`;

export default {
  companyByUser,
  companiesCountByTierType,
  companiesCountByRegisteredVsPrequalified,
  companiesCountByProductCode,
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
  logsRfqCreatedAndSentExport,
  logsSuppliersByProductCodeLogsExport,
  logsActivityLogsExport
};
