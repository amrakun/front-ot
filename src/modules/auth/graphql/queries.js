const userFields = `
  _id
  username
  email
  isSupplier
  companyId
  firstName
  lastName
  jobTitle
  phone

  temporarySecureInformation
`;

const currentUser = `
  query currentUser {
    currentUser {
      ${userFields}
    }
  }
`;

const systemConfig = `
  query config {
    config {
      logo
      name
      phone
      email
      address

      rfqTemplates
      trfqTemplates
      eoiTemplates
      successFeedbackTemplates
      capacityBuildingTemplates
      blockTemplates
      prequalificationTemplates
      desktopAuditTemplates

      prequalificationDow
      specificPrequalificationDow

      auditDow
      specificAuditDow

      improvementPlanDow
      specificImprovementPlanDow
    }
  }
`;

const simpleUsers = `
  query users($search: String) {
    users(page: 1, perPage: 10, search: $search) {
      _id
      firstName
      lastName
      email
      isSupplier
    }
  }
`;

const userDetail = `
  query userDetail($_id: String) {
    userDetail(_id: $_id) {
      ${userFields}
    }
  }
`;

export default {
  currentUser,
  userDetail,
  systemConfig,
  simpleUsers
};
