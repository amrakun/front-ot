export const structureData = [
  { text: 'Sole Trader', value: 'Sole Trader' },
  { text: 'Partnership', value: 'Partnership' },
  { text: 'Limited Liability Company', value: 'Limited Liability Company' },
  { text: 'Public Limited Company', value: 'Public Limited Company' },
  { text: 'Joint Stock Company', value: 'Joint Stock Company' },
  {
    text: 'Non-Governmental Organisation (NGO)',
    value: 'Non-Governmental Organisation (NGO)'
  },
  { text: 'Government Owned Enterprise', value: 'Government Owned Enterprise' }
];

export const foreignPercentageData = [
  { text: '0% (Mongolian only)', value: '0% (Mongolian only)' },
  { text: '1-24%', value: '1-24%' },
  { text: '25-49%', value: '25-49%' },
  { text: '50-74%', value: '50-74%' },
  { text: '75-99%', value: '75-99%' },
  { text: '100% (Foreign only)', value: '100% (Foreign only)' }
];

export const booleanData = [
  { text: 'Yes', value: 'true' },
  { text: 'No', value: 'false' }
];

export const aimagData = [
  { text: 'Umnugovi', value: 'Umnugovi' },
  { text: 'Khovd', value: 'Khovd' }
];

export const soumData = [
  { text: 'Dalanzadgad', value: 'Dalanzadgad' },
  { text: 'Khovd', value: 'Khovd' }
];

export const countryData = [
  { text: 'Mongolia', value: 'Mongolia' },
  { text: 'China', value: 'China' },
  { text: 'Russia', value: 'Russia' }
];

export const roleData = [
  { text: 'Original Equipment Manufacturer (OEM)', value: 'EOM' },
  { text: 'Stockist', value: 'Stockist' },
  { text: 'Distributor', value: 'Distributor' },
  { text: 'None of above', value: 'None' }
];

export const descriptions = {
  isSubContractor: `
    Belarus,
    Burundi,
    Central African Republic,
    Cuba,
    Democratic Republic of Congo,
    Iran,
    Iraq,
    Lebanon,
    Libya,
    North Korea,
    Somalia,
    Sudan,
    Syria,
    Ukraine/Russia,
    Venezuela,
    Yemen and
    Zimbabwe.
  `,

  certificateOfRegistration: `
    You may upload &quot;jpg,jpeg,png,rtf,pdf&quot; files, or simple Adobe
   PDF files. Files that have the ability to contain macros or other
   types of active code are not acceptable. Maximum file size is
   30mb.
  `,

  email: `
    Please fill in generic shared email. Receive an interest in the announcement
    of the OT Procurement Depertment and other notices only by e-mail. Please
    note that OT will not be responsible for non-EOI receipts due to the
    personal e-mail entry.
  `
};

export const labels = {
  foreignOwnershipPercentage: `
    10. Please indicate what percentage of company is owned by
    foreign entity
  `,

  corporateStructure: `5. Please select the corporate structure that most closely
        matches your company`,

  isSubContractor: `4. Does your company, parent company or any sub-contractor is
        registered in any of the following countries to which
        international trade sanctions apply`,

  managingDirector: `15. Managing director`,
  executiveOfficer: `16. Executive officer`,
  salesDirector: `17. Sales director`,
  financialDirector: `18. Financial director`,
  otherMember1: `19. Other management team member`,
  otherMember2: `Other management team member 2`,
  otherMember3: `Other management team member 3`
};

export const certLabels = {
  isReceived: `Have you received capacity building certificate?`,

  isOTSupplier: `Are you an existing supplier to OT?`,

  cwpo: `Please provide CW and PO number`
};

export const groupLabels = {
  head: `Please provide details of your Ultimate Parent Company or any
    associated companies if applicable.`,

  isParentExistingSup: `Is your parent company existing supplier in OT`,

  hasParent: `22. Do you have an Ultimate Parent Company?`,

  parentName: `Ultimate parent company`,

  parentAddress: `Ultimate Parent Company address`,

  parentRegistrationNumber: `Registration number of Ultimate Parent Company`,

  role: `23. Are you a Manufacturer, Distributor or Stockist?`,

  isExclusiveDistributor: `Are you an exclusive distributor?`,

  attachments: `Please list names of authorized distribution rights /EOM/`,

  primaryManufacturerName: `Primary manufacturer name`,

  countryOfPrimaryManufacturer: `Country of primary manufacture`
};

export const productDescription = `
  1. Using the product picker
  The product codes have been structured in a 3 level hierarchy: Family Sect Code > Macro Sect Code > Sect Code.  Clicking on the check boxes will expand the category.  You can only select at Sect Code level.
  2. Search
  Alternatively you can use the search by free text to find potential matches.  Clicking View All will return you to the full list of product codes.
  3.  Adding and Removing product codes
  To add a Product / Service click on the check box.  Selected product codes are displayed in the right pane.  To remove simply click on the cross.
  4. Keywords
  Clicking the magnifying glass icon provides more detail about the types of activity included by the Product / Service.
`;
