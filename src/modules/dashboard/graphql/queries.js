export const companyByUser = `
  query companyByUser {
    companyByUser {
      _id
      averageDifotScore
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
      openTendersCount
    }
  }
`;

export default {
  companyByUser
};
