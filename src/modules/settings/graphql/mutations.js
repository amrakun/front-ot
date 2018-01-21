const register = `
    mutation register($email: String!) {
        register(email: $email)
    }
`;

const commonParams = `
  $username: String!,
  $email: String!,
  $role: String!
  $details: UserDetails,
  $password: String!,
  $passwordConfirmation: String!
`;

const commonValues = `
  username: $username,
  email: $email,
  role: $role,
  details: $details,
  password: $password,
  passwordConfirmation: $passwordConfirmation
`;

const usersAdd = `
    mutation usersAdd(${commonParams}) {
        usersAdd(${commonValues}) {
            _id
        }
    }
`;

const usersEdit = `
    mutation usersEdit($_id: String, ${commonParams}) {
        usersEdit(_id: $_id, ${commonValues}) {
            username
            email
            role
            isSupplier
            details
            companyId
        }
    }
`;

const usersEditProfile = `
    mutation usersEditProfile($username: String, $email: String, $details: UserDetails, $password: String) {
        usersEditProfile(username: $username, email: $email, details: $details, password: $password) {
            username
            email
            role
            isSupplier
            details
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
