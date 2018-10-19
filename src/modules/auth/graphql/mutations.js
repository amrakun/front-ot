const login = `
  mutation login($email: String!, $password: String!, $loginAs: String) {
    login(email: $email, password: $password, loginAs: $loginAs) {
      status
      token
      refreshToken

      user {
        _id
        username
        firstName
        lastName
      }

      delegatedUser {
        _id
        username
        firstName
        lastName
      }
    }
  }
`;

const register = `
  mutation register($email: String!) {
    register(email: $email)
  }
`;

const resendConfirmationLink = `
  mutation resendConfirmationLink($email: String!) {
    resendConfirmationLink(email: $email)
  }
`;

const confirmRegistration = `
  mutation confirmRegistration($token: String!, $password: String!, $passwordConfirmation: String!) {
    confirmRegistration(token: $token, password: $password, passwordConfirmation: $passwordConfirmation) {
      _id
    }
  }
`;

const forgotPassword = `
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const resetPassword = `
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const usersChangePassword = `
  mutation usersChangePassword($currentPassword: String!, $newPassword: String!) {
    usersChangePassword(currentPassword: $currentPassword, newPassword: $newPassword){
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
  mutation usersEditProfile($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String, $jobTitle: String, $phone: Float) {
    usersEditProfile(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName, jobTitle: $jobTitle, phone: $phone) {
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

const usersDelegate = `
  mutation usersDelegate(
    $userId: String!
    $reason: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    usersDelegate(
      userId: $userId
      reason: $reason
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
    }
  }
`;

export default {
  login,
  register,
  resendConfirmationLink,
  forgotPassword,
  resetPassword,
  usersEditProfile,
  confirmRegistration,
  usersChangePassword,
  usersDelegate
};
