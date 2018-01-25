export const companyByUser = `
  query companyByUser {
    companyByUser {
      _id
      openTendersCount
      averageDifotScore
      audits {
        _id
        publishDate
      }
      lastFeedback {
        _id
        supplierResponse {
          status
        }
      }
      basicInfo {
        enName
      }
      contactInfo {
        name
      }
      managementTeamInfo {
        managingDirector {
          name
        }
      }
      groupInfo {
        hasParent
      }
      shareholderInfo {
        attachments
      }
      certificateInfo {
        isReceived
      }
      productsInfo
      financialInfo {
        canProvideAccountsInfo
      }
      businessInfo {
        doesMeetMinimumStandarts
      }
      environmentalInfo {
        doesHavePlan
      }
      healthInfo {
        doesHaveHealthSafety
      }
    }
  }
`;

const reportsSuppliersExport = `
  query reportsSuppliersExport($productCodes: [String], $isPrequalified: Boolean) {
    reportsSuppliersExport(productCodes: $productCodes, isPrequalified: $isPrequalified)
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

export default {
  companyByUser,
  companiesCountByTierType,
  companiesCountByRegisteredVsPrequalified,
  tenderCountByStatus,
  reportsSuppliersExport,
  reportsTendersExport
};
