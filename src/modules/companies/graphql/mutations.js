const basicInfo = `
  mutation companiesEditBasicInfo($basicInfo: CompanyBasicInfoInput) {
    companiesEditBasicInfo(basicInfo: $basicInfo) {
      _id
    }
  }
`;

const contactInfo = `
  mutation companiesEditContactInfo($contactInfo: CompanyContactInfoInput) {
    companiesEditContactInfo(contactInfo: $contactInfo) {
      _id
    }
  }
`;

const managementTeam = `
  mutation companiesEditManagementTeamInfo($managementTeamInfo: CompanyManagementTeamInfoInput) {
    companiesEditManagementTeamInfo(managementTeamInfo: $managementTeamInfo) {
      _id
    }
  }
`;

const shareholderInfo = `
  mutation companiesEditShareholderInfo($shareholderInfo: CompanyShareholderInfoInput) {
    companiesEditShareholderInfo(shareholderInfo: $shareholderInfo) {
      _id
    }
  }
`;

const groupInfo = `
  mutation groupEditShareholderInfo($groupInfo: CompanyGroupInfoInput) {
    companiesEditGroupInfo(groupInfo: $groupInfo) {
      _id
    }
  }
`;

const productsInfo = `
  mutation companiesEditProductsInfo($productsInfo: [String]) {
    companiesEditProductsInfo(productsInfo: $productsInfo) {
      _id
    }
  }
`;

const certificateInfo = `
  mutation companiesEditCertificateInfo($certificateInfo: CompanyCertificateInfoInput) {
    companiesEditCertificateInfo(certificateInfo: $certificateInfo) {
      _id
    }
  }
`;

const financialInfo = `
  mutation companiesEditFinancialInfo($financialInfo: CompanyFinancialInfoInput) {
    companiesEditFinancialInfo(financialInfo: $financialInfo) {
      _id
    }
  }
`;

const businessInfo = `
  mutation companiesEditBusinessInfo($businessInfo: CompanyBusinessInfoInput) {
    companiesEditBusinessInfo(businessInfo: $businessInfo) {
      _id
    }
  }
`;

const environmentalInfo = `
  mutation companiesEditEnvironmentalInfo($environmentalInfo: CompanyEnvironmentalInfoInput) {
    companiesEditEnvironmentalInfo(environmentalInfo: $environmentalInfo) {
      _id
    }
  }
`;

const healthInfo = `
  mutation companiesEditHealthInfoInfo($healthInfo: CompanyHealthInfoInput) {
    companiesEditHealthInfo(healthInfo: $healthInfo) {
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
  basicInfo,
  contactInfo,
  managementTeam,
  shareholderInfo,
  groupInfo,
  productsInfo,
  certificateInfo,
  financialInfo,
  businessInfo,
  environmentalInfo,
  healthInfo,
  addDifotScores,
  addDueDiligence,
  addFeedback,
  addFeedbackResponse,
  addValidation,
  blockCompanies,
  unblockCompanies
};
