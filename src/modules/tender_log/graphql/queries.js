import { gql } from 'react-apollo';

const tenderLogFields = `
  _id
  user {
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
  isAuto
  action
  description
  createdAt
`;

const listForTender = gql`
  query listForTender($page: Int, $perPage: Int, $tenderId: String!) {
    tenderLog(page: $page, perPage: $perPage, tenderId: $tenderId) {
      ${tenderLogFields}
    }
  }
`;

const totalCountForTender = gql`
  query totalCountForTender($tenderId: String!) {
    tenderLogCount(tenderId: $tenderId)
  }
`;

export default { listForTender, totalCountForTender };
