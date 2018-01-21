const UserDetailsType = `
    avatar,
    fullName
`;

const User = `
    _id,
    username,
    email,
    role,
    isSupplier,
    details{
        ${UserDetailsType}
    },
    companyId
`;

export const users = `
    query users($page: Int, $perPage: Int) {
        users(page: $page, perPage: $perPage) {
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

export const currentUser = `
    query currentUser {
        ${User}
    }
`;

export default {
  users,
  userDetail,
  usersTotalCount,
  currentUser
};
