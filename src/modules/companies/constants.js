export const regionOptions = [
  'National',
  'Umnugovi',
  'Tier 1',
  'Tier 2',
  'Tier 3'
];

export const statusOptions = [
  'Pre-qualified',
  'Qaulified/audited',
  'Validated',
  'By DIFOT score',
  'Include blocked companies'
];

export const treeData = [
  {
    label: 'Node1',
    value: 'node1',
    key: 'node1',
    children: [
      {
        label: 'Child Node1',
        value: 'childNode1',
        key: 'childeNode1'
      }
    ]
  },
  {
    label: 'Node2',
    value: 'node2',
    key: 'node2',
    children: [
      {
        label: 'Child Node3',
        value: 'childNode3',
        key: 'childNode3'
      },
      {
        label: 'Child Node4',
        value: 'childNode4',
        key: 'childNode4'
      },
      {
        label: 'Child Node5',
        value: 'childNode5',
        key: 'childNode5'
      }
    ]
  }
];

export const columns = [
  { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
  { title: 'SAP #', dataIndex: 'basicInfo.sapNumber' },
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
