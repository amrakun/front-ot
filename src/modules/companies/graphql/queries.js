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

export const companyByUser = `
  query companyByUser {
    companyByUser {
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

export const companyPrequalificationDetail = `
  query companyByUser {
    companyByUser {
      _id
      financialInfo {
        canProvideAccountsInfo
        reasonToCannotNotProvide
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
          file
        }
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
      productsInfo
    }
  }
`;

const commonParams = `
  $search: String
  $region: String
  $status: String
  $productCodes: String
  $_ids: [String]
`;

const commonValues = `
  search: $search,
  region: $region,
  status: $status,
  productCodes: $productCodes
  _ids: $_ids
`;

const companies = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
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
      averageDifotScore
      lastDueDiligence
      isProductsInfoValidated
    }
  }
`;

const difot = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
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
      lastDifotScore
      averageDifotScore
    }
  }
`;

const dueDiligence = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
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
      lastDueDiligence
    }
  }
`;

const feedback = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
      _id
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
    }
  }
`;

const validation = `
  query companies(${commonParams}) {
    companies(${commonValues}) {
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
      productsInfo
      validatedProductsInfo
      isProductsInfoValidated
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

const feedbackFields = `
  _id
  status
  closeDate
  supplierIds
  content
  createdDate
`;

const feedbackDetail = `
  query feedbackDetail($_id: String!) {
    feedbackDetail(_id: $_id) {
      _id
      status
      closeDate
      supplierIds
      content
      createdDate
    }
  }
`;

const feedbacks = `
  query feedbacks {
    feedbacks {
      ${feedbackFields}
      responses {
        _id
      }
    }
  }
`;

const feedbackResponseDetail = `
query feedbackDetail($_id: String!) {
  feedbackDetail(_id: $_id) {
    _id
    status
    closeDate
    supplierIds
    content
    createdDate
    createdUserId
    responses {
      _id
      status
      feedbackId
      supplierId
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
`;

export default {
  companyByUser,
  companyPrequalificationDetail,
  companies,
  simpleCompanies,
  dueDiligence,
  difot,
  validation,
  feedback,
  feedbackDetail,
  feedbacks,
  feedbackResponseDetail
};
