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

const usersEditProfile = `
    mutation usersEditProfile($username: String, $email: String, $password: String) {
        usersEditProfile(username: $username, email: $email, password: $password) {
            username
            email
            role
            isSupplier
            companyId
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

export default {
  register,
  usersAdd,
  usersEdit,
  resetPassword,
  usersEditProfile,
  usersRemove
};
