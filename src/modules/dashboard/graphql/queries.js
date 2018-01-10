export const companyByUser = `
  query companyByUser {
    companyByUser {
      _id
      lastDifotScore
      lastFeedback {
        _id
        closeDate
        status
        closeDate
        content
        createdDate
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

export default {
  companyByUser
};
