const register = `
  mutation register($email: String!) {
    register(email: $email)
  }
`;

const commonParams = `
  $username: String!,
  $email: String!,
  $role: String!,
  $firstName: String,
  $lastName: String,
  $jobTitle: String,
  $phone: Float,
  $permissions: [String!],
`;

const commonValues = `
  username: $username,
  email: $email,
  role: $role,
  firstName: $firstName,
  lastName: $lastName,
  jobTitle: $jobTitle,
  phone: $phone,
  password: $password,
  passwordConfirmation: $passwordConfirmation,
  permissions: $permissions,
`;

const usersAdd = `
  mutation usersAdd(
    ${commonParams},
    $password: String!,
    $passwordConfirmation: String!
  ) {
    usersAdd(${commonValues}) {
        _id
    }
  }
`;

const usersEdit = `
  mutation usersEdit(
    $_id: String!,
    ${commonParams},
    $password: String,
    $passwordConfirmation: String
  ) {
    usersEdit(
      _id: $_id,
      ${commonValues}
    ) {
        _id
        username
        email
        role
        isSupplier
        companyId
        firstName
        lastName
        jobTitle
        phone
    }
  }
`;

const usersRemove = `
  mutation usersRemove($_id: String!) {
    usersRemove(_id: $_id)
  }
`;

const resetPassword = `
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const configsSaveTemplate = `
  mutation configsSaveTemplate(
    $name: String!
    $kind: String!
    $from: String!
    $subject: JSON!
    $content: JSON!
    ) {

    configsSaveTemplate(
      name: $name
      kind: $kind
      from: $from
      subject: $subject
      content: $content
    ) {

      _id
      eoiTemplates
      rfqTemplates
    }
  }
`;

const configsSavePrequalificationDow = `
  mutation configsSavePrequalificationDow($doc: ConfigPrequalificationDowInput!) {
    configsSavePrequalificationDow(doc: $doc) {
      _id
      prequalificationDow
      specificPrequalificationDow
    }
  }
`;

const configsSaveAuditDow = `
  mutation configsSaveAuditDow($doc: ConfigAuditDowInput!) {
    configsSaveAuditDow(doc: $doc) {
      _id
      auditDow
      specificAuditDow
    }
  }
`;

const configsSaveImprovementPlanDow = `
  mutation configsSaveImprovementPlanDow($doc: ConfigImprovementPlanDowInput!){
    configsSaveImprovementPlanDow(doc: $doc){
      _id
      improvementPlanDow
      specificImprovementPlanDow
    }
  }
`;

export default {
  register,
  usersAdd,
  usersEdit,
  resetPassword,
  usersRemove,
  configsSaveTemplate,
  configsSavePrequalificationDow,
  configsSaveAuditDow,
  configsSaveImprovementPlanDow
};
