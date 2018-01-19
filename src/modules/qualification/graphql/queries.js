import { queries } from 'modules/companies/graphql';

const { prequalificationFields } = queries;

const supplierPrequalification = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${prequalificationFields}
      basicInfo {
        enName
      }
      isPrequalified
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

const basicInfoCompanyFields = `
  _id
  basicInfo {
    totalNumberOfEmployees
  }
  shareholderInfo {
    shareholders {
      name
    }
  }
`;

const companyByUser = `
  query companyByUser {
    companyByUser {
      ${basicInfoCompanyFields}
    }
  }
`;

const auditRequests = `
  query companyByUser {
    companyByUser {
      _id
      audits {
        _id
        date
      }
    }
  }
`;

const audits = `
  query audits {
    audits {
      _id
      date
      createdUser {
        email
      }
      responses {
        _id
      }
      supplierIds
    }
  }
`;
const auditDetail = `
  query auditDetail($_id: String!) {
    auditDetail(_id: $_id) {
      _id
      supplierIds
      responses {
        _id
        supplier {
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
        }
      }
    }
  }
`;

const AuditBasicInfo = `
  sotri
  sotie
`;

const AnswerRecommendation = `
  supplierComment
  supplierAnswer
  auditorComment
  auditorRecommendation
  auditorScore
`;

const HrAnswerRecommendation = `
  supplierComment
  supplierAnswer
  auditorComment
  auditorRecommendation
  auditorScore
`;

const AuditCoreHseqInfo = `
  doesHaveHealthSafety { ${AnswerRecommendation} }
  doesHaveDocumentedPolicy { ${AnswerRecommendation} }
  doesPerformPreemployment { ${AnswerRecommendation} }
  doWorkProceduresConform { ${AnswerRecommendation} }
  doesHaveFormalProcess { ${AnswerRecommendation} }
  doesHaveTrackingSystem { ${AnswerRecommendation} }
  doesHaveValidIndustry { ${AnswerRecommendation} }
  doesHaveFormalProcessForReporting { ${AnswerRecommendation} }
  doesHaveLiabilityInsurance { ${AnswerRecommendation} }
  doesHaveFormalProcessForHealth { ${AnswerRecommendation} }
`;

const AuditHrInfo = `
  workContractManagement { ${HrAnswerRecommendation} }
  jobDescriptionProcedure { ${HrAnswerRecommendation} }
  trainingDevelopment { ${HrAnswerRecommendation} }
  employeePerformanceManagement { ${HrAnswerRecommendation} }
  timeKeepingManagement { ${HrAnswerRecommendation} }
  managementOfPractises { ${HrAnswerRecommendation} }
  managementOfWorkforce { ${HrAnswerRecommendation} }
  employeeAwareness { ${HrAnswerRecommendation} }
  employeeSelection { ${HrAnswerRecommendation} }
  employeeExitManagement { ${HrAnswerRecommendation} }
  grievanceAndFairTreatment { ${HrAnswerRecommendation} }
`;

const AuditBusinessInfo = `
  doesHavePolicyStatement { ${AnswerRecommendation} }
  ensureThroughoutCompany { ${AnswerRecommendation} }
  ensureThroughoutSupplyChain { ${AnswerRecommendation} }
  haveBeenSubjectToInvestigation { ${AnswerRecommendation} }
  doesHaveDocumentedPolicyToCorruption { ${AnswerRecommendation} }
  whoIsResponsibleForPolicy { ${AnswerRecommendation} }
`;

const AuditEvidenceInfo = `
  doesHaveHealthSafety
  doesHaveDrugPolicy
  doesPerformPreemployment
  workProceduresConform
  doesHaveFormalProcessForHSE
  doesHaveSystemForTracking
  doesHaveValidCertifications
  doesHaveSystemForReporting
  doesHaveLiabilityInsurance
  doesHaveFormalProcessForHealth
  isThereCurrentContract
  doesHaveJobDescription
  doesHaveTraining
  doesHaveEmployeeRelatedProcedure
  doesHaveTimeKeeping
  doesHavePerformancePolicy
  doesHaveProcessToSupport
  employeesAwareOfRights
  doesHaveSystemToEnsureSafeWork
  doesHaveEmployeeSelectionProcedure
  doesHaveEmployeeLaborProcedure
  doesHaveGrievancePolicy
  proccessToEnsurePolicesCompany
  proccessToEnsurePolicesSupplyChain
  hasBeenSubjectToInvestigation
  doesHaveCorruptionPolicy
  whoIsResponsibleForCorruptionPolicy
`;

const auditResponseByUser = `
  query auditResponseByUser($auditId: String!) {
    auditResponseByUser(auditId: $auditId) {
      _id
      basicInfo { ${AuditBasicInfo} }
      coreHseqInfo { ${AuditCoreHseqInfo} }
      hrInfo { ${AuditHrInfo} }
      businessInfo { ${AuditBusinessInfo} }
      evidenceInfo { ${AuditEvidenceInfo} }
    }
  }
`;

const auditResponseDetail = `
  query auditResponseDetail($auditId: String!, $supplierId: String!) {
    auditResponseDetail(auditId: $auditId, supplierId: $supplierId) {
      _id
      basicInfo { ${AuditBasicInfo} }
      coreHseqInfo { ${AuditCoreHseqInfo} }
      hrInfo { ${AuditHrInfo} }
      businessInfo { ${AuditBusinessInfo} }
      evidenceInfo { ${AuditEvidenceInfo} }
    }
  }
`;

const supplierBasicInfo = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${basicInfoCompanyFields}
    }
  }
`;

export default {
  blockedCompanies,
  supplierPrequalification,
  feedbackDetail,
  feedbacks,
  feedbackResponseDetail,
  qualificationDetail,
  companyByUser,
  auditRequests,
  audits,
  auditDetail,
  auditResponseByUser,
  auditResponseDetail,
  supplierBasicInfo
};
