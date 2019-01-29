/*eslint-disable max-len*/

import { queries } from 'modules/companies/graphql';

const { prequalificationFields } = queries;

const supplierPrequalification = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${prequalificationFields}
      basicInfo {
        enName,
        registeredInCountry,
        registeredInAimag,
        totalNumberOfEmployees,
        totalNumberOfMongolianEmployees,
      }
      isPrequalified
      isSentPrequalificationInfo
      prequalifiedStatus
      isSkippedPrequalification
      prequalificationSkippedReason
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
        investigations
        isSubContractor
        organizationChartFile
        doesEmployeePoliticallyExposed
        hasLeadersConvicted
        proveHasNotConvicted
        hasConvictedForBusinessIntegrity
        hasConvictedForHumanRights
        hasConvictedLabourLaws
        doesHaveResponsiblityPolicy
        doesHaveCodeEthics
        doesHaveLiabilityInsurance
        employeeTurnoverRate
        doesConcludeValidContracts
        doesMeetMinimumStandarts

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
      }
      healthInfo {
        doesHaveHealthSafety
        areHSEResourcesClearlyIdentified
        doesHaveDocumentedProcessToEnsure
        areEmployeesUnderYourControl
        doesHaveDocumentForRiskAssesment
        doesHaveDocumentForIncidentInvestigation
        doesHaveDocumentedFitness
        isWillingToComply
        hasIndustrialAccident
        tmha
        ltifr
        injuryExplanation
        seniorManagement
        isWillingToCommit
        isPerparedToCompile
        hasWorkedOnWorldBank
        hasWorkedOnLargeProjects
        doesHaveLicense
      }
      tierType
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
  createdUserId
  responses {
    _id
  }
`;

const feedbackDetail = `
  query feedbackDetail($_id: String!) {
    feedbackDetail(_id: $_id) {
      ${feedbackFields}
    }
  }
`;

const feedbacks = `
  query feedbacks {
    feedbacks {
      ${feedbackFields}
    }
  }
`;

const feedbackResponseFields = `
  _id
  status
  feedbackId
  supplierId
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
  createdDate
  feedback {
    status
  }
`;

const feedbackResponses = `
  query feedbackResponses($supplierName: String) {
    feedbackResponses(supplierName: $supplierName) {
      ${feedbackResponseFields}
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
        ${feedbackResponseFields}
      }
    }
  }
`;

const feedbackResponsesExport = `
  query feedbackResponsesExport($supplierName: String $responseIds: [String]) {
    feedbackResponsesExport(supplierName: $supplierName responseIds: $responseIds)
  }
`;

const basicInfoCompanyFields = `
  _id
  tierType
  isQualified
  basicInfo {
    enName
    totalNumberOfEmployees
  }
  contactInfo {
    name
  }
  shareholderInfo {
    shareholders {
      name
      percentage
      jobTitle
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

const auditsSuppliers = `
  query auditsSuppliers($type: String!) {
    auditsSuppliers(type: $type) {
      audit {
        _id
        status
        publishDate
        closeDate
      }
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
      }
    }
  }
`;

const auditRequests = `
  query companyByUser {
    companyByUser {
      _id
      audits {
        _id
        publishDate
        closeDate
        status
        supplierResponse {
          isSent
          isQualified
          isEditable
        }
      }
    }
  }
`;

const audits = `
  query audits {
    audits {
      _id
      status
      publishDate
      closeDate
      supplierIds
      responses {
        _id
      }
    }
  }
`;

const auditResponseParams = `
  $supplierSearch: String
  $publishDate: Date
  $closeDate: Date
  $status: String
  $isQualified: Boolean
  $isNew: Boolean
  $isSentImprovementPlan: Boolean
`;

const auditResponseValues = `
  supplierSearch: $supplierSearch
  publishDate: $publishDate
  closeDate: $closeDate
  status: $status
  isQualified: $isQualified
  isNew: $isNew
  isSentImprovementPlan: $isSentImprovementPlan
`;

const auditResponsesQualifiedStatus = `
  query auditResponsesQualifiedStatus(
    ${auditResponseParams}
  ) {
    auditResponsesQualifiedStatus (
      ${auditResponseValues}
    )
  }
`;

const auditResponses = `
  query auditResponses(
    ${auditResponseParams}
  ) {
    auditResponses(
      ${auditResponseValues}
    ) {
      _id
      status
      audit {
        _id
        status
        publishDate
        closeDate
      }
      isQualified
      submittedCount
      improvementPlanFile
      improvementPlanSentDate
      reportFile
      reportSentDate
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
`;

const AuditBasicInfo = `
  sotri
  sotie
  otExperience
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
      qualifiedStatus
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
      isQualified
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

const auditImprovementPlan = `
  query auditImprovementPlan(
    $auditId: String!
    $supplierId: String!
    $auditDate: Date!
    $auditResult: Boolean!
    $reassessmentDate: Date!
    $auditorName: String!
  ) {
    auditImprovementPlan(
      auditId: $auditId
      supplierId: $supplierId
      auditDate: $auditDate
      auditResult: $auditResult
      reassessmentDate: $reassessmentDate
      auditorName: $auditorName
    )
  }
`;

const auditReport = `
  query auditReport(
    $auditId: String!
    $supplierId: String!
    $auditDate: Date!
    $auditResult: Boolean!
    $auditor: String!
    $reportNo: String!
  ) {
    auditReport(
      auditId: $auditId
      supplierId: $supplierId
      auditDate: $auditDate
      auditResult: $auditResult
      auditor: $auditor
      reportNo: $reportNo
    )
  }
`;

const commonParams = `
  $search: String
  $region: String
  $productCodes: String
  $includeBlocked: Boolean
  $productsInfoStatus: String
  $prequalifiedStatus: String
  $qualifiedStatus: String
  $difotScore: String
  $_ids: [String]
`;

const commonValues = `
  search: $search,
  region: $region,
  productCodes: $productCodes,
  includeBlocked: $includeBlocked,
  productsInfoStatus: $productsInfoStatus,
  prequalifiedStatus: $prequalifiedStatus,
  qualifiedStatus: $qualifiedStatus,
  difotScore: $difotScore
  _ids: $_ids
`;

const companiesGenerateDifotScoreList = `
  query companiesGenerateDifotScoreList(${commonParams}) {
    companiesGenerateDifotScoreList(${commonValues})
  }
`;

const companiesValidatedProductsInfoExport = `
  query companiesValidatedProductsInfoExport(${commonParams}) {
    companiesValidatedProductsInfoExport(${commonValues})
  }
`;

const companyPrequalificationExport = `
  query companyPrequalificationExport($_id: String!) {
    companyPrequalificationExport(_id: $_id)
  }
`;

const companiesGenerateDueDiligenceList = `
  query companiesGenerateDueDiligenceList(${commonParams}) {
    companiesGenerateDueDiligenceList(${commonValues})
  }
`;

const companiesGeneratePrequalificationList = `
  query companiesGeneratePrequalificationList($_ids: [String]) {
    companiesGeneratePrequalificationList(_ids: $_ids)
  }
`;

const physicalAuditFields = `
  _id
  createdDate
  isQualified
  reportFile
  improvementPlanFile
  supplier {
    _id
    basicInfo {
      enName,
      sapNumber
    }
  }
`;

const physicalAudits = `
  query physicalAudits($supplierSearch: String, $page: Int, $perPage: Int) {
    physicalAudits(supplierSearch: $supplierSearch, page: $page, perPage: $perPage) {
      ${physicalAuditFields}
    }
  }
`;

const totalPhysicalAudits = `
  query totalPhysicalAudits($supplierSearch: String) {
    totalPhysicalAudits(supplierSearch: $supplierSearch)
  }
`;

const physicalAuditDetail = `
  query physicalAuditDetail($_id: String!) {
    physicalAudits(_id: $_id) {
      ${physicalAuditFields}
    }
  }
`;

const auditResponseTotalCounts = `
  query auditResponseTotalCounts {
    auditResponseTotalCounts {
      invited
      notResponded
      qualified
      sentImprovementPlan
      notNotified
    }
  }
`;

const companiesPrequalifiedStatus = `
  query companiesPrequalifiedStatus(
    ${commonParams}
  ) {
    companiesPrequalifiedStatus(
      ${commonValues}
    )
  }
`;

const qualificationPrequalificationReplacer = `
  query qualificationPrequalificationReplacer($supplierId: String!) {
    qualificationPrequalificationReplacer(supplierId: $supplierId)
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
  auditsSuppliers,
  auditRequests,
  audits,
  auditResponses,
  auditResponseTotalCounts,
  auditResponseByUser,
  auditResponseDetail,
  supplierBasicInfo,
  auditImprovementPlan,
  auditReport,
  feedbackResponses,
  companiesGenerateDifotScoreList,
  physicalAudits,
  totalPhysicalAudits,
  physicalAuditDetail,
  companyPrequalificationExport,
  companiesValidatedProductsInfoExport,
  companiesGenerateDueDiligenceList,
  companiesGeneratePrequalificationList,
  feedbackResponsesExport,
  companiesPrequalifiedStatus,
  qualificationPrequalificationReplacer,
  auditResponsesQualifiedStatus,
};
