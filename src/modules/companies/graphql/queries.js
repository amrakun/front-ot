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
  certificateOfRegistration,
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

const managementTeamItemFields = `
  name,
  jobTitle,
  phone,
  email,
`;

const managementTeamFields = `
  managingDirector {
    ${managementTeamItemFields}
  },

  executiveOfficer {
    ${managementTeamItemFields}
  },

  salesDirector {
    ${managementTeamItemFields}
  },

  financialDirector {
    ${managementTeamItemFields}
  },

  otherMember1 {
    ${managementTeamItemFields}
  },

  otherMember2 {
    ${managementTeamItemFields}
  },

  otherMember3 {
    ${managementTeamItemFields}
  },
`;

const shareholderItemFields = `
  name,
  jobTitle,
  percentage,
`;

export const companyDetail = `
  query companyDetail {
    companyDetail(_id: "5a1f9e2496123f0b089c1a2d") {
      basicInfo {
        ${basicInfoFields}
      }
      contactInfo {
        ${contactInfoFields}
      }
      managementTeamInfo {
        ${managementTeamFields}
      }
      shareholderInfo {
        attachments,
        shareholders {
          ${shareholderItemFields}
        }
      }
      productsInfo
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

export const companyPrequalificationDetail = `
  query companyDetail {
    companyDetail(_id: "5a1f9e2496123f0b089c1a2d") {
      financialInfo {
        canProvideAccountsInfo
        currency
        isUpToDateSSP
        isUpToDateCTP
        annualTurnover {
          year
          amount
        }
        preTaxProfit {
          year
          amount
        }
        totalAssets {
          year
          amount
        }
        totalCurrentAssets {
          year
          amount
        }
        totalShareholderEquity {
          year
          amount
        }
        recordsInfo {
          date
          path
        }
      }
    }
  }
`;

export default {
  companyDetail,
  companyPrequalificationDetail,
  companies
};
