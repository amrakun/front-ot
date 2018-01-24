const currentUser = `
  query currentUser {
    currentUser {
      _id
      username
      email
      isSupplier
      companyId
      firstName
      lastName
      jobTitle
      phone
    }
  }
`;

export default {
  currentUser
};
