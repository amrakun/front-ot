const currentUser = `
  query currentUser {
    currentUser {
      _id
      username
      email
      isSupplier
      companyId
    }
  }
`;

export default {
  currentUser
};
