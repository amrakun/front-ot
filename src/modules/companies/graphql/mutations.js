const basicInfo = `
  mutation companiesEditBasicInfo($basicInfo: CompanyBasicInfoInput) {
    companiesEditBasicInfo(_id: "5a1fc129c2e8aa7c0f2752dd", basicInfo: $basicInfo) {
      _id
    }
  }
`;

const contactInfo = `
  mutation companiesEditContactInfo($contactInfo: CompanyContactInfoInput) {
    companiesEditContactInfo(_id: "5a1fc129c2e8aa7c0f2752dd", contactInfo: $contactInfo) {
      _id
    }
  }
`;

const managementTeam = `
  mutation companiesEditManagementTeamInfo($managementTeamInfo: CompanyManagementTeamInfoInput) {
    companiesEditManagementTeamInfo(_id: "5a1fc129c2e8aa7c0f2752dd", managementTeamInfo: $managementTeamInfo) {
      _id
    }
  }
`;

const shareholderInfo = `
  mutation companiesEditShareholderInfo($shareholderInfo: CompanyShareholderInfoInput) {
    companiesEditShareholderInfo(_id: "5a1fc129c2e8aa7c0f2752dd", shareholderInfo: $shareholderInfo) {
      _id
    }
  }
`;

const productsInfo = `
  mutation companiesEditProductsInfo($productsInfo: [String]) {
    companiesEditProductsInfo(_id: "5a1fc129c2e8aa7c0f2752dd", productsInfo: $productsInfo) {
      _id
    }
  }
`;

const financialInfo = `
  mutation companiesEditFinancialInfo($financialInfo: CompanyFinancialInfoInput) {
    companiesEditFinancialInfo(_id: "5a1fc129c2e8aa7c0f2752dd", financialInfo: $financialInfo) {
      _id
    }
  }
`;

const businessInfo = `
  mutation companiesEditBusinessInfo($businessInfo: CompanyBusinessInfoInput) {
    companiesEditBusinessInfo(_id: "5a1fc129c2e8aa7c0f2752dd", businessInfo: $businessInfo) {
      _id
    }
  }
`;

const environmentalInfo = `
  mutation companiesEditEnvironmentalInfo($environmentalInfo: CompanyEnvironmentalInfoInput) {
    companiesEditEnvironmentalInfo(_id: "5a1fc129c2e8aa7c0f2752dd", environmentalInfo: $environmentalInfo) {
      _id
    }
  }
`;

const healthInfo = `
  mutation companiesEditHealthInfoInfo($healthInfo: CompanyHealthInfoInput) {
    companiesEditHealthInfo(_id: "5a1fc129c2e8aa7c0f2752dd", healthInfo: $healthInfo) {
      _id
    }
  }
`;

export default {
  basicInfo,
  contactInfo,
  managementTeam,
  shareholderInfo,
  productsInfo,
  financialInfo,
  businessInfo,
  environmentalInfo,
  healthInfo
};
