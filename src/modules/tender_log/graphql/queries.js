import { gql } from 'react-apollo';

const tenderLogFields = `
  _id
  tender {
    _id
    rfqType
    type
    number
    name
  }
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

const list = gql`
  query list($page: Int, $perPage: Int, $tenderId: String) {
    tenderLog(page: $page, perPage: $perPage, tenderId: $tenderId) {
      ${tenderLogFields}
    }
  }
`;

const listForTender = gql`
  query listForTender($page: Int, $perPage: Int, $tenderId: String!) {
    tenderLog(page: $page, perPage: $perPage, tenderId: $tenderId) {
      ${tenderLogFields}
    }
  }
`;

const tenderLogTotalCount = gql`
  query tenderMessageTotalCount($tenderId: String) {
    tenderMessageTotalCount(tenderId: $tenderId)
  }
`;

export default { list, listForTender, tenderLogTotalCount };
