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

export default {
  currentUser,
  systemConfig
};
