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
        hasLeadersConvicted
        doesEmployeePoliticallyExposed
        organizationChartFile
        isSubContractor
      }
      environmentalInfo {
        doesHavePlan
        hasEnvironmentalRegulatorInvestigated
        hasConvictedForEnvironmentalLaws
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

const auditFields = `
    status
    supplierIds
    publishDate
    closeDate
    responsibleBuyerIds
    content
`;

const auditsSuppliers = `
  query auditsSuppliers($type: String!) {
    auditsSuppliers(type: $type) {
      audit {
        _id
        ${auditFields}
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
        ${auditFields}
        supplierResponse {
          isSent
          status
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
      ${auditFields}
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
  $qualStatus: String
  $supplierStatus: String
`;

const auditResponseValues = `
  supplierSearch: $supplierSearch
  publishDate: $publishDate
  closeDate: $closeDate
  qualStatus: $qualStatus
  supplierStatus: $supplierStatus
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
        ${auditFields}
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
        qualificationStatusDisplay
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
  supplierFile

  auditorComment
  auditorRecommendation
  auditorScore
`;

const HrAnswerRecommendation = `
  supplierComment
  supplierAnswer
  supplierFile

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
  specialLicenseOfImporting { ${AnswerRecommendation} }
  wasteManagementPlan { ${AnswerRecommendation} }
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

const auditResponseByUser = `
  query auditResponseByUser($auditId: String!) {
    auditResponseByUser(auditId: $auditId) {
      _id
      qualifiedStatus
      basicInfo { ${AuditBasicInfo} }
      coreHseqInfo { ${AuditCoreHseqInfo} }
      hrInfo { ${AuditHrInfo} }
      businessInfo { ${AuditBusinessInfo} }
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
      isQualified
    }
  }
`;

const supplierInfo = `
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
    $auditor: String!
  ) {
    auditImprovementPlan(
      auditId: $auditId
      supplierId: $supplierId
      auditDate: $auditDate
      auditResult: $auditResult
      reassessmentDate: $reassessmentDate
      auditor: $auditor
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
  supplierInfo,
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
