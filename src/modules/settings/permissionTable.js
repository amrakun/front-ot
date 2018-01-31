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

// eoi
const PERMISSION_TENDER_RESPONSES_EOI_SHORT_LIST = 'EOI short list Create';
const PERMISSION_TENDER_RESPONSES_EOI_BIDDER_LIST = 'EOI bidder list Create';

// feedbacks
const PERMISSION_FEEDBACKS_ADD = 'Send success feedback';

// difot
const PERMISSION_COMPANIES_GENERATE_DIFOT_SCORE_LIST = 'Download template';
const PERMISSION_COMPANIES_ADD_DIFOT_SCORES = 'Import difot score';

// pre-qualification
const PERMISSION_APPROVE_PRE_QUALIFICATION_STATUS =
  'Approve pre-qualification status';
const PERMISSION_QUALIFICATIONS_SAVE_TIER_TYPE = 'Supplier tier type';

// audits
const PERMISSION_AUDITS_ADD = 'Create audit';
const PERMISSION_AUDITS_REPORT = 'Create report';
const PERMISSION_AUDITS_BUYER_SEND_FILES =
  'Responses & send report, send improvement plan';

export default {
  // pre-qualification
  qualificationsPrequalify: PERMISSION_APPROVE_PRE_QUALIFICATION_STATUS,
  qualificationsSaveTierType: PERMISSION_QUALIFICATIONS_SAVE_TIER_TYPE,

  // qualification
  physicalAuditsAdd: PERMISSION_PHYSICAL_AUDITS_ADD,
  configsSaveImprovementPlanDow: PERMISSION_CONFIGS_SAVE_IMPROVEMENT_PLAN_DOW,
  auditsAdd: PERMISSION_AUDITS_ADD,
  auditReport: PERMISSION_AUDITS_REPORT,
  auditsBuyerSendFiles: PERMISSION_AUDITS_BUYER_SEND_FILES,

  // validation
  companiesValidateProductsInfo: PERMISSION_COMPANIES_VALIDATE_PRODUCT_INFO,

  // difot score
  companiesGenerateDifotScoreList: PERMISSION_COMPANIES_GENERATE_DIFOT_SCORE_LIST,
  companiesAddDifotScores: PERMISSION_COMPANIES_ADD_DIFOT_SCORES,

  // due diligences
  companiesAddDueDiligences: PERMISSION_COMPANIES_ADD_DUE_DILIGENCES,

  // blocking
  blockedCompaniesBlock: PERMISSION_BLOCKED_COMPANIES_BLOCK,
  blockedCompaniesUnblock: PERMISSION_BLOCKED_COMPANIES_UNBLOCK,

  // success feedback
  tenderResponses: PERMISSION_RESPONSES,
  feedbacksAdd: PERMISSION_FEEDBACKS_ADD,

  // rfq & eoi
  tendersEdit: PERMISSION_EDIT,
  tendersCancel: PERMISSION_CANCEL,
  tendersExport: PERMISSION_EXPORT,
  tendersSendRegretLetter: PERMISSION_SEND_REGRET_LETTER,

  // rfq
  tenderResponsesRfqBidSummaryReport: PERMISSION_TENDERS_RFQ_BID_SUMMARY_REPORT,
  tendersAward: PERMISSION_AWARD,

  // eoi
  tenderResponsesEoiShortList: PERMISSION_TENDER_RESPONSES_EOI_SHORT_LIST,
  tenderResponsesEoiBidderList: PERMISSION_TENDER_RESPONSES_EOI_BIDDER_LIST,

  // reports
  reportsTendersExport: PERMISSION_REPORTS_TENDERS_EXPORT,
  reportsAuditExport: PERMISSION_REPORTS_AUDIT_EXPORT,
  companyDetailExport: PERMISSION_COMPANIES_DETAIL_EXPORT,

  // users
  usersAdd: PERMISSION_ADD_USER,
  usersEdit: PERMISSION_EDIT_USER,
  usersRemove: PERMISSION_REMOVE_USER
};
