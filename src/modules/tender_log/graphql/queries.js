import { gql } from 'react-apollo';

const tenderLogFields = `
  _id
  tender {
    _id
    rfqType
    createdDate
    sourcingOfficer
    file
    reminderDay
    isAwarded
    awardNote
    sentRegretLetter
    requestedCount
    submittedCount
    notInterestedCount
    notRespondedCount
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
    delegatedUserId
    delegationStartDate
    delegationEndDate
    temporarySecureInformation
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
