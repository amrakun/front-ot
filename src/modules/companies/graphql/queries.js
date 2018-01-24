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
  file,
`;

const groupInfoFields = `
  hasParent,
  isParentExistingSup,
  parentName,
  parentAddress,
  parentRegistrationNumber,
  role,
  isExclusiveDistributor,
  attachments,
  primaryManufacturerName,
  countryOfPrimaryManufacturer,
  authorizedDistributions,
  factories {
    name,
    townOrCity,
    country,
    productCodes,
  }
`;

const registrationFields = `
  _id
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
`;

export const companyByUser = `
  query companyByUser {
    companyByUser {
      ${registrationFields}
    }
  }
`;

export const certificateByUser = `
  query companyByUser {
    companyByUser {
      _id
      certificateInfo {
        ${certificateInfoFields}
      }
    }
  }
`;

const prequalificationFields = `
  _id
  financialInfo {
    canProvideAccountsInfo
    reasonToCannotNotProvide
    currency
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
      file
    }
    isUpToDateSSP
    isUpToDateCTP
  }
  businessInfo {
    doesMeetMinimumStandarts
    doesMeetMinimumStandartsFile
    doesHaveJobDescription
    doesHaveJobDescriptionFile
    doesConcludeValidContracts
    employeeTurnoverRate
    doesHaveLiabilityInsurance
    doesHaveLiabilityInsuranceFile
    doesHaveCodeEthics
    doesHaveCodeEthicsFile
    doesHaveResponsiblityPolicy
    doesHaveResponsiblityPolicyFile
    hasConvictedLabourLaws
    hasConvictedForHumanRights
    hasConvictedForBusinessIntegrity
    proveHasNotConvicted
    hasLeadersConvicted
    doesEmployeePoliticallyExposed
    pepName
    organizationChartFile
    investigations {
      name
      date
      status
      statusDate
    }
  }
  environmentalInfo {
    doesHavePlan
    doesHavePlanFile
    hasEnvironmentalRegulatorInvestigated
    dateOfInvestigation
    reasonForInvestigation
    actionStatus
    investigationDocumentation
    hasConvictedForEnvironmentalLaws
    proveHasNotConvicted
  }
  healthInfo {
    doesHaveHealthSafety
    doesHaveHealthSafetyFile
    areHSEResourcesClearlyIdentified
    doesHaveDocumentedProcessToEnsure
    doesHaveDocumentedProcessToEnsureFile
    areEmployeesUnderYourControl
    doesHaveDocumentForRiskAssesment
    doesHaveDocumentForRiskAssesmentFile
    doesHaveDocumentForIncidentInvestigation
    doesHaveDocumentForIncidentInvestigationFile
    doesHaveDocumentedFitness
    doesHaveDocumentedFitnessFile
    isWillingToComply
    hasIndustrialAccident
    tmha
    ltifr
    injuryExplanation
    seniorManagement
    isWillingToCommit
    isPerparedToCompile
    hasWorkedOnWorldBank
    hasWorkedOnWorldBankDescription
    hasWorkedOnLargeProjects
    hasWorkedOnLargeProjectsDescription
    doesHaveLicense
    doesHaveLicenseDescription
  }
`;

export const companyPrequalificationDetail = `
  query companyByUser {
    companyByUser {
      ${prequalificationFields}
      productsInfo
    }
  }
`;

const commonParams = `
  $search: String
  $region: String
  $productCodes: String
  $isProductsInfoValidated: Boolean
  $includeBlocked: Boolean
  $isPrequalified: Boolean
  $isQualified: Boolean
  $difotScore: String
  $_ids: [String]
`;

const commonValues = `
  search: $search,
  region: $region,
  productCodes: $productCodes,
  isProductsInfoValidated: $isProductsInfoValidated,
  includeBlocked: $includeBlocked,
  isPrequalified: $isPrequalified,
  isQualified: $isQualified,
  difotScore: $difotScore
  _ids: $_ids
`;

const commonFields = `
  _id
  basicInfo {
    enName,
    email,
    sapNumber
  }
  contactInfo {
    name,
    email,
    phone
  }
  isPrequalified
  tierType
`;

const companies = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      tierType
      averageDifotScore
      lastDueDiligence
      isProductsInfoValidated
      isBlocked
      isPrequalified
      isQualified
    }
  }
`;

const exportCompanies = `
  query companiesExport(${commonParams}) {
    companiesExport(${commonValues})
  }
`;

const status = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
    }
  }
`;

const difot = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      lastDifotScore
      averageDifotScore
    }
  }
`;

const dueDiligence = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      lastDueDiligence
    }
  }
`;

const feedback = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      lastFeedback {
        closeDate
        supplierResponse {
          _id
          status
          employmentNumberBefore
          employmentNumberNow
          nationalSpendBefore
          nationalSpendAfter
          umnugobiSpendBefore
          umnugobiSpendAfter
          investment
          trainings
          corporateSocial
          technologyImprovement
        }
      }
    }
  }
`;

const validation = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      productsInfo
      validatedProductsInfo
      isProductsInfoValidated
    }
  }
`;

const audit = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
    }
  }
`;

const simpleCompanies = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      _id
      basicInfo {
        mnName,
        enName
      }
    }
  }
`;

const companyDetail = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${registrationFields}
    }
  }
`;

export default {
  companyByUser,
  companyPrequalificationDetail,
  companies,
  simpleCompanies,
  exportCompanies,
  dueDiligence,
  difot,
  validation,
  feedback,
  status,
  prequalificationFields,
  companyDetail,
  audit
};
