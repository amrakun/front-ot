const basicInfoFields = `
  isRegisteredOnSup,
  sapNumber,
  enName,
  mnName,
  address,
  address2,
  address3,
  townOrCity,
  province,
  zipCode,
  country,
  registeredInCountry,
  registeredInAimag,
  registeredInSum,
  isChinese,
  isSubContractor,
  corporateStructure,
  registrationNumber,
  email,
  website,
  foreignOwnershipPercentage,
  totalNumberOfEmployees,
  totalNumberOfUmnugoviEmployees,
  totalNumberOfMongolianEmployees,
`;

export const companyDetail = `
  query companyDetail {
    companyDetail(_id: "5a1f9e2496123f0b089c1a2d") {
      basicInfo {
        ${basicInfoFields}
      }
    }
  }
`;

export default {
  companyDetail
};
