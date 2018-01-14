/*eslint-disable max-len*/

const qualifyFinancialInfo = `
  mutation qualificationsSaveFinancialInfo($supplierId: String!, $financialInfo: QualificationFinancialInfoInput) {
    qualificationsSaveFinancialInfo(supplierId: $supplierId, financialInfo: $financialInfo) {
      _id
    }
  }
`;

const qualifyBusinessInfo = `
  mutation qualificationsSaveBusinessInfo($supplierId: String!, $businessInfo: QualificationBusinessInfoInput) {
    qualificationsSaveBusinessInfo(supplierId: $supplierId, businessInfo: $businessInfo) {
      _id
    }
  }
`;

const qualifyEnvironmentalInfo = `
  mutation qualificationsSaveEnvironmentalInfo($supplierId: String!, $environmentalInfo: QualificationEnvironmentalInfoInput) {
    qualificationsSaveEnvironmentalInfo(supplierId: $supplierId, environmentalInfo: $environmentalInfo) {
      _id
    }
  }
`;

const qualifyHealthInfo = `
  mutation qualificationsSaveHealthInfo($supplierId: String!, $healthInfo: QualificationHealthInfoInput) {
    qualificationsSaveHealthInfo(supplierId: $supplierId, healthInfo: $healthInfo) {
      _id
    }
  }
`;

const addDifotScores = `
  mutation companiesAddDifotScores($difotScores: [CompanyDifotScoreInput]!) {
    companiesAddDifotScores(difotScores: $difotScores) {
      _id
    }
  }
`;

const addDueDiligence = `
  mutation companiesAddDueDiligences($dueDiligences: [CompanyDueDiligenceInput]!) {
    companiesAddDueDiligences(dueDiligences: $dueDiligences) {
      _id
    }
  }
`;

const addFeedback = `
  mutation feedbacksAdd(
    $closeDate: Date!
    $supplierIds: [String]!
    $content: String!
  ) {
    feedbacksAdd(
      closeDate: $closeDate
      supplierIds: $supplierIds
      content: $content
    ) {
      _id
    }
  }
`;

const addFeedbackResponse = `
  mutation feedbackResponsesAdd(
    $feedbackId: String!
    $supplierId: String!
    $employmentNumberBefore: Float!
    $employmentNumberNow: Float!
    $nationalSpendBefore: Float!
    $nationalSpendAfter: Float!
    $umnugobiSpendBefore: Float!
    $umnugobiSpendAfter: Float!
    $investment: String!
    $trainings: String!
    $corporateSocial: String!
    $technologyImprovement: String!
  ) {
    feedbackResponsesAdd(
      feedbackId: $feedbackId
      supplierId: $supplierId
      employmentNumberBefore: $employmentNumberBefore
      employmentNumberNow: $employmentNumberNow
      nationalSpendBefore: $nationalSpendBefore
      nationalSpendAfter: $nationalSpendAfter
      umnugobiSpendBefore: $umnugobiSpendBefore
      umnugobiSpendAfter: $umnugobiSpendAfter
      investment: $investment
      trainings: $trainings
      corporateSocial: $corporateSocial
      technologyImprovement: $technologyImprovement
    ) {
      _id
    }
  }
`;

const addValidation = `
  mutation companiesValidateProductsInfo($_id: String,! $codes: [String]!) {
    companiesValidateProductsInfo(_id: $_id, codes: $codes) {
      _id
    }
  }
`;

const blockCompanies = `
  mutation blockedCompaniesBlock(
    $supplierIds: [String!]!
    $startDate: Date!
    $endDate: Date!
    $note: String
  ) {
    blockedCompaniesBlock(
      supplierIds: $supplierIds
      startDate: $startDate
      endDate: $endDate
      note: $note
    )
  }
`;

const unblockCompanies = `
  mutation blockedCompaniesUnblock($supplierIds: [String!]!) {
    blockedCompaniesUnblock(supplierIds: $supplierIds)
  }

`;

export default {
  addDifotScores,
  addDueDiligence,
  addFeedback,
  addFeedbackResponse,
  addValidation,
  blockCompanies,
  unblockCompanies,
  qualifyFinancialInfo,
  qualifyBusinessInfo,
  qualifyEnvironmentalInfo,
  qualifyHealthInfo
};
