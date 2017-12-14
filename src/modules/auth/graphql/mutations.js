const login = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

const register = `
  mutation register($email: String!, $password: String!, $passwordConfirmation: String!) {
    register(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      username
      email
      role
      isSupplier
      details {
        avatar
        fullName
      }
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

export default {
  login,
  register,
  forgotPassword,
  resetPassword
};
