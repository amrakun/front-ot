/*eslint-disable max-len*/

const qualifyFinancialInfo = `
  mutation qualificationsSaveFinancialInfo(
    $supplierId: String!
    $financialInfo: QualificationFinancialInfoInput
  ) {
    qualificationsSaveFinancialInfo(
      supplierId: $supplierId
      financialInfo: $financialInfo
    ) {
      _id
    }
  }
`;

const qualifyBusinessInfo = `
  mutation qualificationsSaveBusinessInfo(
    $supplierId: String!
    $businessInfo: QualificationBusinessInfoInput
  ) {
    qualificationsSaveBusinessInfo(
      supplierId: $supplierId
      businessInfo: $businessInfo
    ) {
      _id
    }
  }
`;

const qualifyEnvironmentalInfo = `
  mutation qualificationsSaveEnvironmentalInfo(
    $supplierId: String!
    $environmentalInfo: QualificationEnvironmentalInfoInput
  ) {
    qualificationsSaveEnvironmentalInfo(
      supplierId: $supplierId
      environmentalInfo: $environmentalInfo
    ) {
      _id
    }
  }
`;

const qualifyHealthInfo = `
  mutation qualificationsSaveHealthInfo(
    $supplierId: String!
    $healthInfo: QualificationHealthInfoInput
  ) {
    qualificationsSaveHealthInfo(
      supplierId: $supplierId
      healthInfo: $healthInfo
    ) {
      _id
    }
  }
`;

const qualifySaveTierType = `
  mutation qualificationsSaveTierType($supplierId: String!, $tierType: String!) {
    qualificationsSaveTierType(supplierId: $supplierId, tierType: $tierType) {
      _id
    }
  }
`;

const addDifotScores = `
  mutation companiesAddDifotScores($difotScores: [CompanyDifotScoreInput]!) {
    companiesAddDifotScores(difotScores: $difotScores) {
      _id
    }
  }
`;

const addDueDiligence = `
  mutation companiesAddDueDiligences($dueDiligences: [CompanyDueDiligenceInput]!) {
    companiesAddDueDiligences(dueDiligences: $dueDiligences) {
      _id
    }
  }
`;

const addFeedback = `
  mutation feedbacksAdd(
    $closeDate: Date!
    $supplierIds: [String]!
    $content: String!
  ) {
    feedbacksAdd(
      closeDate: $closeDate
      supplierIds: $supplierIds
      content: $content
    ) {
      _id
    }
  }
`;

const addFeedbackResponse = `
  mutation feedbackResponsesAdd(
    $feedbackId: String!
    $supplierId: String!
    $totalEmploymentOt: Float!
    $totalEmploymentUmnugovi: Float!
    $employmentChangesAfter: Float!
    $numberOfEmployeeWorkToScopeNational: Float!
    $numberOfEmployeeWorkToScopeUmnugovi: Float!
    $procurementTotalSpend: Float!
    $procurementNationalSpend: Float!
    $procurementUmnugoviSpend: Float!
    $corporateSocial: String!
    $otherStories: String!
  ) {
    feedbackResponsesAdd(
      feedbackId: $feedbackId
      supplierId: $supplierId
      totalEmploymentOt: $totalEmploymentOt
      totalEmploymentUmnugovi: $totalEmploymentUmnugovi
      employmentChangesAfter: $employmentChangesAfter
      numberOfEmployeeWorkToScopeNational: $numberOfEmployeeWorkToScopeNational
      numberOfEmployeeWorkToScopeUmnugovi: $numberOfEmployeeWorkToScopeUmnugovi
      procurementTotalSpend: $procurementTotalSpend
      procurementNationalSpend: $procurementNationalSpend
      procurementUmnugoviSpend: $procurementUmnugoviSpend
      corporateSocial: $corporateSocial
      otherStories: $otherStories
    ) {
      _id
    }
  }
`;

const addValidation = `
  mutation companiesValidateProductsInfo(
    $_id: String!
    $personName: String
    $justification: String!
    $checkedItems: [String!]!
    $files: [JSON]
  ) {

    companiesValidateProductsInfo(
      _id: $_id
      personName: $personName
      justification: $justification
      checkedItems: $checkedItems
      files: $files
    ) {
      _id
    }
  }
`;

const blockCompanies = `
  mutation blockedCompaniesBlock(
    $supplierIds: [String!]!
    $startDate: Date!
    $endDate: Date!
    $note: String
  ) {
    blockedCompaniesBlock(
      supplierIds: $supplierIds
      startDate: $startDate
      endDate: $endDate
      note: $note
    )
  }
`;

const unblockCompanies = `
  mutation blockedCompaniesUnblock($supplierIds: [String!]!) {
    blockedCompaniesUnblock(supplierIds: $supplierIds)
  }
`;

const addAudit = `
  mutation auditsAdd(
    $publishDate: Date!
    $closeDate: Date!
    $supplierIds: [String]!
    $responsibleBuyerIds: [String]!
    $content: String!
    $reminderDay: Float
  ) {
    auditsAdd(
      publishDate: $publishDate
      closeDate: $closeDate
      supplierIds: $supplierIds
      responsibleBuyerIds: $responsibleBuyerIds
      content: $content
      reminderDay: $reminderDay
    ) {
      _id
    }
  }
`;

const commonInputs = '$auditId: String';
const commonFields = 'auditId: $auditId';

const auditsSupplierSaveBasicInfo = `
  mutation auditsSupplierSaveBasicInfo(
    ${commonInputs}
    $basicInfo: AuditSupplierBasicInfoInput
  ) {
    auditsSupplierSaveBasicInfo(
      ${commonFields}
      basicInfo: $basicInfo
    ) { _id }
  }
`;

const auditsSupplierSaveCoreHseqInfo = `
  mutation auditsSupplierSaveCoreHseqInfo(
    ${commonInputs}
    $coreHseqInfo: AuditSupplierCoreHseqInfoInput
  ) {
    auditsSupplierSaveCoreHseqInfo(
      ${commonFields},
      coreHseqInfo: $coreHseqInfo
    ) { _id }
  }
`;
const auditsSupplierSaveHrInfo = `
  mutation auditsSupplierSaveHrInfo(
    ${commonInputs}
    $hrInfo: AuditSupplierHrInfoInput
  ) {
    auditsSupplierSaveHrInfo(
      ${commonFields}
      hrInfo: $hrInfo
    ) { _id }
  }
`;

const auditsSupplierSaveBusinessInfo = `
  mutation auditsSupplierSaveBusinessInfo(
    ${commonInputs}
    $businessInfo: AuditSupplierBusinessInfoInput
  ) {
    auditsSupplierSaveBusinessInfo(
      ${commonFields}
      businessInfo: $businessInfo
    ) { _id }
  }
`;

const auditsBuyerSaveCoreHseqInfo = `
  mutation auditsBuyerSaveCoreHseqInfo(
    ${commonInputs}
    $supplierId: String
    $coreHseqInfo: AuditBuyerCoreHseqInfoInput
  ) {
    auditsBuyerSaveCoreHseqInfo(
      ${commonFields}
      supplierId: $supplierId
      coreHseqInfo: $coreHseqInfo
    ) { _id }
  }
`;

const auditsBuyerSaveHrInfo = `
  mutation auditsBuyerSaveHrInfo(
    ${commonInputs}
    $supplierId: String
    $hrInfo: AuditBuyerHrInfoInput
  ) {
    auditsBuyerSaveHrInfo(
      ${commonFields}
      supplierId: $supplierId
      hrInfo: $hrInfo
    ) { _id }
  }
`;

const auditsBuyerSaveBusinessInfo = `
  mutation auditsBuyerSaveBusinessInfo(
    ${commonInputs}
    $supplierId: String
    $businessInfo: AuditBuyerBusinessInfoInput
  ) {
    auditsBuyerSaveBusinessInfo(
      ${commonFields}
      supplierId: $supplierId
      businessInfo: $businessInfo
    ) {
      _id
      isQualified
    }
  }
`;

const auditsSupplierSendResponse = `
  mutation auditsSupplierSendResponse($auditId: String) {
    auditsSupplierSendResponse(auditId: $auditId) {
      _id
    }
  }
`;

const auditsSupplierSendResubmitRequest = `
  mutation auditsSupplierSendResubmitRequest($description: String!) {
    auditsSupplierSendResubmitRequest(description: $description)
  }
`;

const qualificationsPrequalify = `
  mutation qualificationsPrequalify(
    $supplierId: String!,
    $qualified: Boolean,
    $templateObject: JSON
  ) {
    qualificationsPrequalify(
    supplierId: $supplierId,
    qualified: $qualified,
    templateObject: $templateObject,
    ) {

      _id
    }
  }
`;

const auditsBuyerSendFiles = `
  mutation auditsBuyerSendFiles(
    $responseIds: [String]!
    $reassessmentDate: Date
    $improvementPlan: Boolean
    $report: Boolean
  ) {
    auditsBuyerSendFiles(
      responseIds: $responseIds
      reassessmentDate: $reassessmentDate
      improvementPlan: $improvementPlan
      report: $report
    ) {
      _id
    }
  }
`;

const auditsBuyerSaveResultForm = `
  mutation auditsBuyerSaveResultForm(
    $responseId: String!
    $reportLanguage: String,
    $auditDate: Date,
    $reassessmentDate: Date,
    $reportNo: String,
    $auditor: String,
    $content: String,
  ) {
    auditsBuyerSaveResultForm(
      responseId: $responseId,
      reportLanguage: $reportLanguage,
      auditDate: $auditDate,
      reassessmentDate: $reassessmentDate,
      reportNo: $reportNo,
      auditor: $auditor,
      content: $content,
    ) {
      _id
    }
  }
`;

const auditsBuyerCancelResponse = `
  mutation auditsBuyerCancelResponse($responseId: String!) {
    auditsBuyerCancelResponse(responseId: $responseId)
  }
`;

const auditsBuyerNotificationMarkAsRead = `
  mutation auditsBuyerNotificationMarkAsRead($responseId: String!) {
    auditsBuyerNotificationMarkAsRead(responseId: $responseId)
  }
`;

const physicalAuditParams = `
  $isQualified: Boolean!
  $supplierId: String!
  $reportFile: String!
  $improvementPlanFile: String!
`;

const physicalAuditFields = `
  isQualified: $isQualified
  supplierId: $supplierId
  reportFile: $reportFile
  improvementPlanFile: $improvementPlanFile
`;

const physicalAuditsAdd = `
  mutation physicalAuditsAdd(${physicalAuditParams}) {
    physicalAuditsAdd(${physicalAuditFields}) {
      _id
    }
  }
`;

const physicalAuditsEdit = `
  mutation physicalAuditsEdit(
    $_id: String!
    ${physicalAuditParams}
  ) {
    physicalAuditsEdit(
      _id: $_id
      ${physicalAuditFields}
    ) { _id }
  }
`;

const physicalAuditsRemove = `
  mutation physicalAuditsRemove($_id: String!) {
    physicalAuditsRemove(_id: $_id)
  }
`;

const togglePrequalificationState = `
  mutation companiesTogglePrequalificationState($supplierId: String!) {
    companiesTogglePrequalificationState(supplierId: $supplierId) {
      _id
    }
  }
`;
const toggleAuditState = `
  mutation auditsBuyerToggleState($supplierId: String!, $editableDate: Date) {
    auditsBuyerToggleState(supplierId: $supplierId, editableDate: $editableDate) {
      _id
    }
  }
`;

export default {
  addDifotScores,
  addDueDiligence,
  addFeedback,
  addFeedbackResponse,
  addValidation,
  blockCompanies,
  unblockCompanies,
  qualifyFinancialInfo,
  qualifyBusinessInfo,
  qualifyEnvironmentalInfo,
  qualifyHealthInfo,
  qualifySaveTierType,
  addAudit,
  auditsSupplierSaveBasicInfo,
  auditsSupplierSaveCoreHseqInfo,
  auditsSupplierSaveHrInfo,
  auditsSupplierSaveBusinessInfo,
  auditsBuyerSaveCoreHseqInfo,
  auditsBuyerSaveHrInfo,
  auditsBuyerSaveBusinessInfo,
  auditsSupplierSendResponse,
  auditsSupplierSendResubmitRequest,
  qualificationsPrequalify,
  auditsBuyerSendFiles,
  auditsBuyerSaveResultForm,
  auditsBuyerCancelResponse,
  auditsBuyerNotificationMarkAsRead,
  physicalAuditsAdd,
  physicalAuditsEdit,
  physicalAuditsRemove,
  togglePrequalificationState,
  toggleAuditState,
};
