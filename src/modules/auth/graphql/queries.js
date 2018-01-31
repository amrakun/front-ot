const currentUser = `
  query currentUser {
    currentUser {
      _id
      username
      email
      isSupplier
      companyId
      firstName
      lastName
      jobTitle
      phone
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

      eoiTemplate
      rfqTemplate
      regretLetterTemplate
      successFeedbackTemplate
      auditTemplate

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

export default {
  currentUser,
  systemConfig,
  simpleUsers
};
