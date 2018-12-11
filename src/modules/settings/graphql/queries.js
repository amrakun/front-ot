const User = `
  _id,
  username,
  email,
  role,
  isSupplier,
  companyId,
  firstName
  lastName
  jobTitle
  phone
  permissions
`;

export const users = `
  query users($page: Int, $perPage: Int, $search: String) {
    users(page: $page, perPage: $perPage, search: $search) {
      ${User}
    }
  }
`;

export const userDetail = `
  query userDetail($_id: String) {
    userDetail(_id: $_id) {
      ${User}
    }
  }
`;

export const usersTotalCount = `
  query usersTotalCount {
    usersTotalCount
  }
`;

export const modulePermissions = `
  query modulePermissions {
    modulePermissions {
      name
      permissions
    }
  }
`;

export const mailDeliveries = `
  query mailDeliveries($page: Int, $perPage: Int, $search: String) {
    mailDeliveries(page: $page, perPage: $perPage, search: $search) {
      _id
      createdDate
      from
      to
      subject
      html
      status
    }
  }
`;

export const mailDeliveriesTotalCount = `
  query mailDeliveriesTotalCount {
    mailDeliveriesTotalCount
  }
`;

export default {
  users,
  userDetail,
  usersTotalCount,
  modulePermissions,
  mailDeliveries,
  mailDeliveriesTotalCount
};
