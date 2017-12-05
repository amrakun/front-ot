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
  'Include blocked suppliers'
];

export const columns = [
  {
    title: 'Supplier name',
    dataIndex: 'enName'
  },
  {
    title: 'SAP #',
    dataIndex: 'sapNumber'
  },
  {
    title: 'Registration',
    dataIndex: 'registration'
  },
  {
    title: 'Pre-qualification',
    dataIndex: 'prequalification'
  },
  {
    title: 'Qualification/audit status',
    dataIndex: 'audit'
  },
  {
    title: 'Validation status',
    dataIndex: 'validation'
  },
  {
    title: 'Due dilligence',
    dataIndex: 'dilligence'
  },
  {
    title: 'DIFOT score',
    dataIndex: 'dipotScore'
  },
  {
    title: 'Blocking',
    dataIndex: 'isBlocked'
  },
  {
    title: 'Company adminstrators',
    dataIndex: 'adminstrators'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Profile export to PDF',
    key: 'export'
  }
];

export const treeData = [
  {
    label: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        label: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    label: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        label: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0'
      },
      {
        label: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        label: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
];
