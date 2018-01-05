export const regionOptions = [
  { label: 'National', value: 'national' },
  { label: 'Umnugovi', value: 'umnugovi' },
  { label: 'Tier 1', value: 'tier1' },
  { label: 'Tier 2', value: 'tier2' },
  { label: 'Tier 3', value: 'tier3' }
];

export const statusOptions = [
  { label: 'Pre-qualified', value: 'preQualified' },
  { label: 'Qaulified/audited', value: 'qualifiedAndAudited' },
  { label: 'Validated', value: 'validated' },
  { label: 'By DIFOT score', value: 'byDifotScore' },
  { label: 'Include blocked companies', value: 'includeBlockedCompanies' }
];

export const columns = [
  { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
  { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
  { title: 'Registration', dataIndex: 'registration' },
  { title: 'Pre-qualification', dataIndex: 'prequalification' },
  { title: 'Qualification/audit status', dataIndex: 'audit' },
  { title: 'Validation status', dataIndex: 'validation' },
  { title: 'Due dilligence', dataIndex: 'dilligence' },
  { title: 'DIFOT score', dataIndex: 'dipotScore' },
  { title: 'Blocking', dataIndex: 'isBlocked' },
  { title: 'Company adminstrators', dataIndex: 'adminstrators' },
  { title: 'Email', dataIndex: 'basicInfo.email' },
  { title: 'Phone', dataIndex: 'contactInfo.phone' },
  { title: 'Profile export to PDF', key: 'export' }
];
