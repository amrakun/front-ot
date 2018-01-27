export const supplierSideMenu = [
  {
    url: '/rfq-and-eoi',
    title: 'Tenders & EOI',
    icon: 'desktop'
  },
  {
    url: '/registration',
    title: 'Registration',
    icon: 'contacts'
  },
  {
    url: '/prequalification',
    title: 'Pre-qualification',
    icon: 'solution'
  },
  {
    url: '/qualification',
    title: 'Qualification/audit',
    icon: 'calendar'
  },
  {
    url: '/capacity-building',
    title: 'Capacity building',
    icon: 'file-text'
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
        url: '/prequalification-status',
        title: 'Pre-qualification'
      },
      {
        url: 'audit',
        title: 'Qualification',
        subMenu: [
          {
            url: '/audit',
            title: 'Send'
          },
          {
            url: '/audit/responses',
            title: 'Responses'
          },
          {
            url: '/audit/reports',
            title: 'Reports & plan'
          }
        ]
      },
      {
        url: '/validation',
        title: 'Validation'
      },
      {
        url: '/difot',
        title: 'DIFOT score'
      },
      {
        url: '/due-diligence',
        title: 'Due Diligence'
      },
      {
        url: 'feedback',
        title: 'Success feedback',
        subMenu: [
          {
            url: '/feedback',
            title: 'Request feedback'
          },
          {
            url: '/feedback/responses',
            title: 'Responses'
          }
        ]
      },
      {
        url: '/blocking',
        title: 'Block a supplier'
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
    url: '/report',
    title: 'Report',
    icon: 'file'
  },
  {
    url: 'settings',
    title: 'Settings',
    icon: 'setting',
    subMenu: [
      {
        url: '/settings/templates',
        title: 'Templates'
      },
      {
        url: '/settings/manage-expiry-dates',
        title: 'Manage Expiry Dates'
      },
      {
        url: '/user-list',
        title: 'Manage Users'
      }
    ]
  }
];
