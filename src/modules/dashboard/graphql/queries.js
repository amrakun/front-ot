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

export default {
  companyByUser,
  reportsSuppliersExport,
  reportsTendersExport
};
