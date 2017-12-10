const basicInfo = `
  mutation companiesEditBasicInfo($basicInfo: CompanyBasicInfoInput) {
    companiesEditBasicInfo(_id: "5a1f9e2496123f0b089c1a2d", basicInfo: $basicInfo) {
      _id
    }
  }
`;

const contactInfo = `
  mutation companiesEditContactInfo($contactInfo: CompanyContactInfoInput) {
    companiesEditContactInfo(_id: "5a1f9e2496123f0b089c1a2d", contactInfo: $contactInfo) {
      _id
    }
  }
`;

const managementTeam = `
  mutation companiesEditManagementTeam($managementTeam: CompanyManagementTeamInput) {
    companiesEditManagementTeam(_id: "5a1f9e2496123f0b089c1a2d", managementTeam: $managementTeam) {
      _id
    }
  }
`;

const shareholderInfo = `
  mutation companiesEditShareholderInfo($shareholderInfo: CompanyShareholderInfoInput) {
    companiesEditShareholderInfo(_id: "5a1f9e2496123f0b089c1a2d", shareholderInfo: $shareholderInfo) {
      _id
    }
  }
`;

const productsInfo = `
  mutation companiesEditProductsInfo($productsInfo: [String]) {
    companiesEditProductsInfo(_id: "5a1f9e2496123f0b089c1a2d", productsInfo: $productsInfo) {
      _id
    }
  }
`;

export default {
  basicInfo,
  contactInfo,
  managementTeam,
  shareholderInfo,
  productsInfo
};
