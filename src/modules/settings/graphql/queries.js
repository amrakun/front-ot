const User = `
    _id,
    username,
    email,
    role,
    isSupplier,
    companyId,
    firstName
    lastName
    jobTitle
    phone
`;

export const users = `
    query users($page: Int, $perPage: Int, $search: String) {
        users(page: $page, perPage: $perPage, search: $search) {
            ${User}
        }
    }
`;

export const userDetail = `
    query userDetail($_id: String) {
        userDetail(_id: $_id) {
            ${User}
        }
    }
`;

export const usersTotalCount = `
    query usersTotalCount {
        usersTotalCount
    }
`;

export const currentUser = `
    query currentUser {
        ${User}
    }
`;

const Config = `
    _id
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
`;

export const config = `
    query config {
        ${Config}
    }
`;

export default {
  users,
  userDetail,
  usersTotalCount,
  currentUser,
  config
};
