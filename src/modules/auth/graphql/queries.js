const currentUser = `
  query currentUser {
    currentUser {
      _id
      username
      email
      isSupplier
      companyId
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
