import { queries } from 'modules/companies/graphql';

const { prequalificationFields } = queries;

const supplierPrequalification = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${prequalificationFields}
    }
  }
`;

const blockedCompanies = `
  query blockedCompanies {
    blockedCompanies {
      _id
      supplierId
      startDate
      endDate
      note
      createdUser {
        email
      }
      supplier {
        basicInfo {
          enName
        }
      }
    }
  }
`;

const feedbackFields = `
  _id
  status
  closeDate
  supplierIds
  content
  createdDate
`;

const feedbackDetail = `
  query feedbackDetail($_id: String!) {
    feedbackDetail(_id: $_id) {
      _id
      status
      closeDate
      supplierIds
      content
      createdDate
    }
  }
`;

const feedbacks = `
  query feedbacks {
    feedbacks {
      ${feedbackFields}
      responses {
        _id
      }
    }
  }
`;

const feedbackResponseDetail = `
  query feedbackDetail($_id: String!) {
    feedbackDetail(_id: $_id) {
      _id
      status
      closeDate
      supplierIds
      content
      createdDate
      createdUserId
      responses {
        _id
        status
        feedbackId
        supplierId
        employmentNumberBefore
        employmentNumberNow
        nationalSpendBefore
        nationalSpendAfter
        umnugobiSpendBefore
        umnugobiSpendAfter
        investment
        trainings
        corporateSocial
        technologyImprovement
      }
    }
  }
`;

export default {
  blockedCompanies,
  supplierPrequalification,
  feedbackDetail,
  feedbacks,
  feedbackResponseDetail
};
