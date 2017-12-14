const currentUser = `
  query currentUser {
    currentUser {
      _id
      username
      email
      isSupplier
      details {
        avatar
        fullName
      }
    }
  }
`;

export default {
  currentUser
};
