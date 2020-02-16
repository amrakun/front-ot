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
  query users($page: Int, $perPage: Int, $search: String, $isActive: String) {
    users(page: $page, perPage: $perPage, search: $search, isActive: $isActive) {
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
  query usersTotalCount($search: String, $isActive: String) {
    usersTotalCount(search: $search, isActive: $isActive)
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
  query mailDeliveries($page: Int, $perPage: Int, $search: String, $old: Boolean) {
    mailDeliveries(page: $page, perPage: $perPage, search: $search, old: $old) {
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
  query mailDeliveriesTotalCount($search: String, $old: Boolean) {
    mailDeliveriesTotalCount(search: $search, old: $old)
  }
`;

export default {
  users,
  userDetail,
  usersTotalCount,
  modulePermissions,
  mailDeliveries,
  mailDeliveriesTotalCount,
};
