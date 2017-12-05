const basicInfo = `
  mutation companiesEditBasicInfo($basicInfo: CompanyBasicInfoInput) {
    companiesEditBasicInfo(_id: "5a1f9e2496123f0b089c1a2d", basicInfo: $basicInfo) {
      _id
    }
  }
`;

export default {
  basicInfo
};
