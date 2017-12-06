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

const contactInfoFields = `
  name,
  jobTitle,
  address,
  address2,
  address3,
  townOrCity,
  province,
  zipCode,
  country,
  phone,
  phone2,
  email,
`;

export const companyDetail = `
  query companyDetail {
    companyDetail(_id: "5a1ff5eae3fc5b3adf2ac7e8") {
      basicInfo {
        ${basicInfoFields}
      }
      contactInfo {
        ${contactInfoFields}
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
