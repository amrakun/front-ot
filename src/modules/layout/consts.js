export const supplierSideMenu = [
  {
    url: '/rfq-and-eoi',
    title: 'Tenders & EOI',
    icon: 'desktop',
  },
  {
    url: '/registration',
    title: 'Registration',
    icon: 'contacts',
  },
  {
    url: '/prequalification',
    title: 'Pre-qualification',
    icon: 'solution',
    className: 'multi-line',
  },
  {
    url: '/qualification',
    title: 'Qualification audit',
    icon: 'calendar',
    className: 'multi-line',
    subMenu: [
      {
        url: '/qualification',
        title: 'Qualification list',
      },
      {
        url: '/qualification/send-resubmit-request',
        title: 'Resubmit request',
      },
    ],
  },
  {
    url: '/capacity-building',
    title: 'Capacity building',
    icon: 'file-text',
    className: 'multi-line',
  },
];

export const buyerSideMenu = [
  {
    url: '/dashboard',
    title: 'Dashboard',
    icon: 'desktop',
  },
  {
    url: '/companies',
    title: 'Suppliers',
    icon: 'user',
  },
  {
    url: 'action',
    title: 'Action',
    icon: 'swap',
    subMenu: [
      {
        url: '/prequalification-status',
        title: 'Pre-qualification',
      },
      {
        url: '/capacity-building-status',
        title: 'Capacity building',
      },
      {
        url: 'audit',
        title: 'Qualification',
        subMenu: [
          {
            url: '/audit?prequalifiedStatus=yes',
            title: 'Send',
          },
          {
            url: '/audit/responses',
            title: 'Desktop audit',
          },
          {
            url: '/audit/responses-physical',
            title: 'Physical audit',
          },
          {
            url: '/audit/resubmission-requests?prequalifiedStatus=yes',
            title: 'Supplier request',
          },
        ],
      },
      {
        url: '/validation',
        title: 'Validation',
      },
      {
        url: '/difot',
        title: 'DIFOT score',
      },
      {
        url: '/due-diligence',
        title: 'Due Diligence',
      },
      {
        url: 'feedback',
        title: 'Success feedback',
        subMenu: [
          {
            url: '/feedback',
            title: 'Request feedback',
          },
          {
            url: '/feedback/responses',
            title: 'Responses',
          },
        ],
      },
      {
        url: '/blocking',
        title: 'Block a supplier',
      },
    ],
  },
  {
    url: '/rfq',
    title: 'RFQ responses',
    icon: 'bars',
  },
  {
    url: '/trfq',
    title: 'Travel RFQ responses',
    icon: 'bars',
  },
  {
    url: '/eoi',
    title: 'EOI responses',
    icon: 'bars',
  },
  {
    url: '/report',
    title: 'Report',
    icon: 'file',
  },
  {
    url: 'logs',
    title: 'Log',
    icon: 'file',
    subMenu: [
      {
        url: '/logs',
        title: 'Activity log',
        icon: 'file',
      },
      {
        url: '/action-logs',
        title: 'Action log',
        icon: 'hourglass',
      },
    ],
  },
  {
    url: 'settings',
    title: 'Settings',
    icon: 'setting',
    subMenu: [
      {
        url: '/settings/templates',
        title: 'Templates',
      },
      {
        url: '/settings/manage-expiry-dates',
        title: 'Manage Expiry Dates',
      },
      {
        url: '/user-list',
        title: 'Manage Users',
      },
      {
        url: '/mail-deliveries',
        title: 'Mail deliveries',
      },
    ],
  },
];
