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

export const groupTypeData = [
  { text: 'Original Equipment Manufacturer (EOM)', value: '' },
  { text: 'Stockist', value: 'Stockist' },
  { text: 'Distrubor', value: 'Distrubor' }
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
    generic shared email zaaval oruulah buguud, OT hudaldan
    avaltiin gazraas zarlagdaj baigaa Oroltsoh sonirhol huleen avah
    bolon busad megdel zuvhun ug email hayagaar yavuulah bolohiig
    anhaarna uu.Huviin email oruulsnaas uuden Eoi huleen avaagui
    hariutslagiig OT huleehgui bolohiig anhaarna uu
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
        international trade sanctions apply`
};

export const productsData = [];

for (let i = 10; i < 36; i++) {
  productsData.push({ value: i.toString(36) + i, text: i.toString(36) + i });
}

export const certLabels = {
  isReceived: `Have you received capacity building certificate?`,

  isOTSupplier: `Are you an existing supplier to OT?`,

  cwpo: `Please provide CW and PO number`
};

export const groupLabels = {
  head: `Please provide details of your Ultimate Parent Company or any
    associated companies if applicable.`,

  hasParent: `22. Do you have an Ultimate Parent Company?`,

  parentAddress: `Ultimate Parent Company address`,

  parentRegistrationNumber: `Registration number of Ultimate Parent Company`,

  role: `23. Are you a Manufacturer, Distributor or Stockist?`,

  isExclusiveDistributor: `Are you an exclusive distributor?`,

  attachments: `Please list names of authorized distribution rights /EOM/`,

  primaryManufacturerName: `Primary manufacturer name`,

  countryOfPrimaryManufacturer: `Country of primary manufacture`
};
