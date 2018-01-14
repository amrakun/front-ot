import { queries } from 'modules/companies/graphql';

const { prequalificationFields } = queries;

const supplierPrequalification = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${prequalificationFields}
      basicInfo {
        enName
      }
    }
  }
`;

const qualificationDetail = `
  query qualificationDetail($supplierId: String!) {
    qualificationDetail(supplierId: $supplierId) {
      _id
      financialInfo {
        canProvideAccountsInfo
        reasonToCannotNotProvide
        currency
        annualTurnover
        preTaxProfit
        totalAssets
        totalCurrentAssets
        totalShareholderEquity
        recordsInfo
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
        investigations
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
    }
  }
`;

const blockedCompanies = `
  query blockedCompanies {
    blockedCompanies {
      _id
      supplierId
      startDate
      endDate
      note
      createdUser {
        email
      }
      supplier {
        basicInfo {
          enName
        }
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
        supplier {
          basicInfo {
            enName
          }
          contactInfo {
            name
            email
            phone
          }
        }
      }
    }
  }
`;

export default {
  blockedCompanies,
  supplierPrequalification,
  feedbackDetail,
  feedbacks,
  feedbackResponseDetail,
  qualificationDetail
};
