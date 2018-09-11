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

const companiesSendRegistrationInfo = `
  mutation companiesSendRegistrationInfo {
    companiesSendRegistrationInfo {
      _id
    }
  }
`;

const companiesSendPrequalificationInfo = `
  mutation companiesSendPrequalificationInfo {
    companiesSendPrequalificationInfo {
      _id
    }
  }
`;

const companiesSkipPrequalification = `
  mutation companiesSkipPrequalification($reason: String!) {
    companiesSkipPrequalification(reason: $reason) {
      _id
      isSkippedPrequalification
      prequalificationSkippedReason
    }
  }
`;

const registerViaBuyer = `
  mutation registerViaBuyer(
    $companyName: String!
    $contactPersonName: String!
    $contactPersonPhone: String!
    $contactPersonEmail: String!
  ) {
    registerViaBuyer(
      companyName: $companyName
      contactPersonName: $contactPersonName
      contactPersonPhone: $contactPersonPhone
      contactPersonEmail: $contactPersonEmail
    ) {
      user {
        email
      }
      company {
        _id
        basicInfo {
          enName
        }
      }
    }
  }
`;

const sendEmail = `
  mutation massMailsSend(
    $supplierIds: [String!]!
    $subject: String
    $content: String
  ) {
    massMailsSend(
      supplierIds: $supplierIds
      subject: $subject
      content: $content
    ) {
      status
      supplierIds
    }
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
  companiesSendRegistrationInfo,
  companiesSendPrequalificationInfo,
  companiesSkipPrequalification,
  registerViaBuyer,
  sendEmail
};
