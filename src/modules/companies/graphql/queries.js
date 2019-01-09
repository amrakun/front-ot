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
  isChinese
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
  description,
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
      isSentRegistrationInfo
      isSkippedPrequalification
      ${registrationFields}
    }
  }
`;

const prequalificationFields = `
  _id
  basicInfo {
    ${basicInfoFields}
  }
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
    hasConvictedLabourLawsDescription
    hasConvictedForHumanRightsDescription
    isSubContractor

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
    areHSEResourcesClearlyIdentifiedFile
    doesHaveDocumentedProcessToEnsure
    doesHaveDocumentedProcessToEnsureFile
    areEmployeesUnderYourControl
    areEmployeesUnderYourControlFile
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
      isPrequalificationInfoEditable
      isPrequalified
      isSkippedPrequalification
      prequalificationSkippedReason
      prequalifiedStatus
    }
  }
`;

const genericParams = `
  $search: String
  $region: String
  $productCodes: String
  $includeBlocked: Boolean
  $productsInfoStatus: String
  $prequalifiedStatus: String
  $qualifiedStatus: String
  $difotScore: String
  $source: String
  $_ids: [String]
  $page: Int
  $perPage: Int
`;

const commonParams = `
  ${genericParams}
  $sortField: String
  $sortDirection: Int
`;

const genericValues = `
  search: $search
  region: $region
  productCodes: $productCodes
  includeBlocked: $includeBlocked
  productsInfoStatus: $productsInfoStatus
  prequalifiedStatus: $prequalifiedStatus
  qualifiedStatus: $qualifiedStatus,
  difotScore: $difotScore
  source: $source
  _ids: $_ids
  page: $page
  perPage: $perPage
`;

const commonValues = `
  ${genericValues}
  sortField: $sortField
  sortDirection: $sortDirection
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
  tierTypeDisplay
  prequalificationStatusDisplay
`;

const companies = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      owner {
        email
      }
      tierType
      averageDifotScore
      lastDueDiligence

      productsInfoValidationStatusDisplay
      qualificationStatusDisplay
      isBlocked

      financialInfo {
        annualTurnover {
          year
          amount
        }
      }
    }
  }
`;

const exportCompanies = `
  query companiesExport(${commonParams}) {
    companiesExport(${commonValues})
  }
`;

const exportCompany = `
  query companyRegistrationExport($_id: String!) {
    companyRegistrationExport(_id: $_id)
  }
`;

const exportCurrentCompanyRegistration = `
  query companyRegistrationSupplierExport {
    companyRegistrationSupplierExport
  }
`;

const exportCurrentCompanyPrequalification = `
  query companyPrequalificationSupplierExport {
    companyPrequalificationSupplierExport
  }
`;

const status = `
  query companies(${genericParams}) {
    companies(${genericValues} sortField: "prequalifiedDate", sortDirection: -1) {
      ${commonFields}
      prequalifiedDate
      prequalificationSubmittedCount
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
      dueDiligences {
        date
        expireDate
        file
        createdUser {
          email
          firstName
          lastName
        }
      }
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
          totalEmploymentOt
          totalEmploymentUmnugovi
          employmentChangesAfter
          numberOfEmployeeWorkToScopeNational
          numberOfEmployeeWorkToScopeUmnugovi
          procurementTotalSpend
          procurementNationalSpend
          procurementUmnugoviSpend
          corporateSocial
          otherStories
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
      lastProductsInfoValidation
    }
  }
`;

const audit = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      qualificationStatusDisplay
    }
  }
`;

const capacityBuilding = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      ${commonFields}
      isSentPrequalificationInfo
      isPrequalificationInfoEditable
      certificateInfo {
        description
        file
      }
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
      shareholderInfo {
        shareholders {
          name
        }
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

const companiesTotalCount = `
  query companiesTotalCount(${commonParams}) {
    companiesTotalCount(${commonValues})
  }
`;

export default {
  companyByUser,
  companyPrequalificationDetail,
  companies,
  companiesTotalCount,
  simpleCompanies,
  exportCompanies,
  dueDiligence,
  difot,
  validation,
  feedback,
  status,
  prequalificationFields,
  companyDetail,
  audit,
  capacityBuilding,
  exportCompany,
  exportCurrentCompanyRegistration,
  exportCurrentCompanyPrequalification
};
