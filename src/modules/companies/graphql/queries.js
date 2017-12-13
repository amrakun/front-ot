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

const certificateInfoFields = `
  isReceived,
  isOTSupplier,
  cwpo,
`;

const groupInfoFields = `
  hasParent,
  parentAddress,
  parentRegistrationNumber,
  role,
  isExclusiveDistributor,
  attachments,
  primaryManufacturerName,
  countryOfPrimaryManufacturer,
  factories {
    name,
    townOrCity,
    country,
    productCodes,
  }
`;

export const companyDetail = `
  query companyDetail {
    companyDetail(_id: "5a1fc129c2e8aa7c0f2752dd") {
      basicInfo {
        ${basicInfoFields}
      }
      contactInfo {
        ${contactInfoFields}
      }
      managementTeamInfo {
        ${managementTeamFields}
      }
      groupInfo {
        ${groupInfoFields}
      }
      shareholderInfo {
        attachments,
        shareholders {
          ${shareholderItemFields}
        }
      }
      certificateInfo {
        ${certificateInfoFields}
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
        email,
        sapNumber
      }
      contactInfo {
        phone
      }
    }
  }
`;

export const companyPrequalificationDetail = `
  query companyDetail {
    companyDetail(_id: "5a1fc129c2e8aa7c0f2752dd") {
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
      businessInfo {
        doesMeetMinimumStandarts
        doesHaveJobDescription
        doesConcludeValidContracts
        employeeTurnoverRate
        doesHaveLiabilityInsurance
        doesHaveCodeEthics
        doesHaveResponsiblityPolicy
        hasConvictedLabourLaws
        hasConvictedForHumanRights
        hasConvictedForBusinessIntegrity
        proveHasNotConvicted
        hasLeadersConvicted
        doesEmployeePoliticallyExposed
        additionalInformation
        investigations {
          name
          date
          status
          statusDate
        }
      }
      environmentalInfo {
        doesHavePlan
        hasEnvironmentalRegulatorInvestigated
        dateOfInvestigation
        reasonForInvestigation
        actionStatus
        investigationDocumentation
        hasConvictedForEnvironmentalLaws
        proveHasNotConvicted
        additionalInformation
      }
      healthInfo {
        doesHaveHealthSafety
        areHSEResourcesClearlyIdentified
        doesHaveDocumentedProcessToEnsure
        areEmployeesUnderYourControl
        doesHaveDocumentForRiskAssesment
        doesHaveDocumentForIncidentInvestigation
        doesHaveDocumentedFitness
      }
    }
  }
`;

export default {
  companyDetail,
  companyPrequalificationDetail,
  companies
};
