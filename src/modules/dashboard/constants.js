const labels = {
  preqSuggestion: `Your prequalification information is not confirmed yet`,

  difotSuggestion: `DIFOT (delivery in full, on time) is a measurement of logistics or delivery performance within a supply chain. It expressed as a percentage, and measures whether the product was able to deliver in the right quantity, at right place and within the expected time.`
};

const MODULES_TO_TEXT = [
  ['dashboard', 'Dashboard'],
  ['companies', 'Suppliers'],
  ['prequalification-status', 'Pre-qualification'],
  ['audit', 'Qualification'],
  ['audit/responses', 'Qualification Responses (desktop)'],
  ['audit/responses-physical', 'Qualification Responses (physical)'],
  ['audit/reports', 'Qualifications Report & Plan'],
  ['validation', 'Validation'],
  ['difot', 'DIFOT score'],
  ['due-diligence', 'Due Dilligence'],
  ['feedback', 'Success feedback - request feedback'],
  ['feedback/responses', 'Success feedback - responses'],
  ['blocking', 'Block supplier'],
  ['rfq', 'RFQ responses'],
  ['eoi', 'EOI responses'],
  ['report', 'Report'],
  ['logs', 'Log'],
  ['settings/templates', 'Settings - Templates'],
  ['settings/manage-expiry-dates', 'Settings - Manage expiry dates'],
  ['user-list', 'Settings - Manage users']
];

const productCategoryLabels = {
  a: 'Construction',
  b: 'Energy',
  c: 'Fixed plant & equipment',
  d: 'Logistics',
  e: 'Mining equipment',
  f: 'MRO',
  g: 'Product consumables',
  h: 'Services'
};

export { labels, MODULES_TO_TEXT, productCategoryLabels };
