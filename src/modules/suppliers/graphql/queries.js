const basicInfoFields = `
  isRegisteredOnSup,
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
  isSubContractor,
  corporateStructure,
  registrationNumber,
  email,
  foreignOwnershipPercentage,
  # totalIntOfEmployees,
  # totalIntOfUmnugoviEmployees,
  # totalIntOfMongolianEmployees,
`;

export const companyDetail = `
  query companyDetail {
    companyDetail(_id: "5a1fc129c2e8aa7c0f2752dd") {
      basicInfo {
        ${basicInfoFields}
      }
    }
  }
`;

export default {
  companyDetail
};
