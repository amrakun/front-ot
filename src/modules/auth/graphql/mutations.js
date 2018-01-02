const login = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

const register = `
  mutation register($email: String!) {
    register(email: $email)
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

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  confirmRegistration
};
