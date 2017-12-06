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
    companyDetail(_id: "5a1fc129c2e8aa7c0f2752dd") {
      basicInfo {
        ${basicInfoFields}
      }
    }
  }
`;

const companies = `
  query companies {
    companies {
      basicInfo {
        enName,
        email
      }
    }
  }
`;

export default {
  companyDetail,
  companies
};
