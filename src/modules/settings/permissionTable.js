const PERMISSION_ADD_USER = 'Add user';
const PERMISSION_EDIT_USER = 'Edit user';
const PERMISSION_REMOVE_USER = 'Remove user';

const PERMISSION_REPORTS_AUDIT_EXPORT = 'Export supplier profile report';
const PERMISSION_REPORTS_TENDERS_EXPORT = 'Export EOI/RFQ report';
const PERMISSION_COMPANIES_DETAIL_EXPORT = 'Export Audit report';

const PERMISSION_EDIT = 'Edit';
const PERMISSION_CANCEL = 'Cancel';
const PERMISSION_EXPORT = 'Export to excel';
const PERMISSION_TENDERS_RFQ_BID_SUMMARY_REPORT = 'Bid summary report';
const PERMISSION_SEND_REGRET_LETTER = 'Send regret letter';
const PERMISSION_AWARD = 'Award';

const PERMISSION_RESPONSES = 'Responses';

const PERMISSION_BLOCKED_COMPANIES_BLOCK = 'Add block';
const PERMISSION_BLOCKED_COMPANIES_UNBLOCK = 'Unblock';

const PERMISSION_COMPANIES_ADD_DUE_DILIGENCES = 'Insert Due diligence report';

const PERMISSION_COMPANIES_VALIDATE_PRODUCT_INFO =
  'Validated product & service code';

const PERMISSION_PHYSICAL_AUDITS_ADD = 'Insert physical audit';

const PERMISSION_CONFIGS_SAVE_IMPROVEMENT_PLAN_DOW = 'Create improvement plan';

export default {
  // qualification
  physicalAuditsAdd: PERMISSION_PHYSICAL_AUDITS_ADD,
  configsSaveImprovementPlanDow: PERMISSION_CONFIGS_SAVE_IMPROVEMENT_PLAN_DOW,

  // validation
  companiesValidateProductsInfo: PERMISSION_COMPANIES_VALIDATE_PRODUCT_INFO,

  // difot score

  // due diligences
  companiesAddDueDiligences: PERMISSION_COMPANIES_ADD_DUE_DILIGENCES,

  // blocking
  blockedCompaniesBlock: PERMISSION_BLOCKED_COMPANIES_BLOCK,
  blockedCompaniesUnblock: PERMISSION_BLOCKED_COMPANIES_UNBLOCK,

  // success feedback
  tenderResponses: PERMISSION_RESPONSES,

  // rfq & eoi
  tendersEdit: PERMISSION_EDIT,
  tendersCancel: PERMISSION_CANCEL,
  tendersExport: PERMISSION_EXPORT,
  tendersSendRegretLetter: PERMISSION_SEND_REGRET_LETTER,

  // rfq
  tenderResponsesRfqBidSummaryReport: PERMISSION_TENDERS_RFQ_BID_SUMMARY_REPORT,
  tendersAward: PERMISSION_AWARD,

  // eoi

  // reports
  reportsTendersExport: PERMISSION_REPORTS_TENDERS_EXPORT,
  reportsAuditExport: PERMISSION_REPORTS_AUDIT_EXPORT,
  companyDetailExport: PERMISSION_COMPANIES_DETAIL_EXPORT,

  //users
  usersAdd: PERMISSION_ADD_USER,
  usersEdit: PERMISSION_EDIT_USER,
  usersRemove: PERMISSION_REMOVE_USER
};
