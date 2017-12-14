export const supplierSideMenu = [
  {
    url: '/registration',
    title: 'Registration',
    icon: 'user'
  },
  {
    url: '/prequalification',
    title: 'Prequalification',
    icon: 'solution'
  }
];

export const buyerSideMenu = [
  {
    url: '/dashboard',
    title: 'Dashboard',
    icon: 'desktop'
  },
  {
    url: '/companies',
    title: 'Suppliers',
    icon: 'user'
  },
  {
    url: 'action',
    title: 'Action',
    icon: 'swap',
    subMenu: [
      {
        url: '/audit',
        title: 'Qualification/audit status'
      },
      {
        url: '/validation',
        title: 'Validation status'
      },
      {
        url: '/difot',
        title: 'DIFOT'
      },
      {
        url: '/due-dillegence',
        title: 'Due dillegence'
      },
      {
        url: '/feedback',
        title: 'Success feedback'
      },
      {
        url: '/blocking',
        title: 'Blocking'
      }
    ]
  },
  {
    url: '/rfq',
    title: 'RFQ responses',
    icon: 'bars'
  },
  {
    url: '/eoi',
    title: 'EOI responses',
    icon: 'bars'
  },
  {
    url: 'report',
    title: 'Report',
    icon: 'file',
    subMenu: [
      {
        url: '/supplier-profile',
        title: 'Supplier profile'
      },
      {
        url: '/report',
        title: 'RFQ/EOI'
      }
    ]
  }
];
