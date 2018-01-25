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
    $phone: Float
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
    passwordConfirmation: $passwordConfirmation
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
    mutation configsSaveTemplate($name: String!, $content: String!) {
        configsSaveTemplate(name: $name, content: $content) {
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
            specificPrequalificationDows
            auditDow
            specificAuditDows
            improvementPlanDow
            specificImprovementPlanDows
        }
    }
`;

export default {
  register,
  usersAdd,
  usersEdit,
  resetPassword,
  usersRemove,
  configsSaveTemplate
};
