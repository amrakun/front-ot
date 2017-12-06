const basicInfo = `
  mutation companiesEditBasicInfo($basicInfo: CompanyBasicInfoInput) {
    companiesEditBasicInfo(_id: "5a1ff5eae3fc5b3adf2ac7e8", basicInfo: $basicInfo) {
      _id
    }
  }
`;

const contactInfo = `
  mutation companiesEditContactInfo($contactInfo: CompanyContactInfoInput) {
    companiesEditContactInfo(_id: "5a1ff5eae3fc5b3adf2ac7e8", contactInfo: $contactInfo) {
      _id
    }
  }
`;
export default {
  basicInfo,
  contactInfo
};
