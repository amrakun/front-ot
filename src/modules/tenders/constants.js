export const tenderColumns = [
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Open',
        value: 'open'
      },
      {
        text: 'Draft',
        value: 'draft'
      },
      {
        text: 'Closed',
        value: 'closed'
      }
    ]
  },
  {
    title: 'Tender #',
    dataIndex: 'number',
    sorter: true
  },
  {
    title: 'Tender name',
    dataIndex: 'name'
  },
  {
    title: 'Publish date',
    dataIndex: 'publishDate'
  },
  {
    title: 'Close date',
    dataIndex: 'closeDate'
  },
  {
    title: 'Suppliers',
    dataIndex: 'suppliers'
  },
  {
    title: 'Sumbitted',
    dataIndex: 'submitted'
  },
  {
    title: 'Not interested',
    dataIndex: 'notInterested'
  },
  {
    title: 'Not responded',
    dataIndex: 'notResponded'
  },
  {
    title: 'Regret letter',
    dataIndex: 'regretLetterSent'
  },
  {
    title: 'Operation',
    key: 'operation',
    fixed: 'right',
    width: 100
  }
];

export const supplierTenderColumns = [
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Open',
        value: 'open'
      },
      {
        text: 'Draft',
        value: 'draft'
      },
      {
        text: 'Closed',
        value: 'closed'
      }
    ]
  },
  {
    title: 'Tender #',
    dataIndex: 'number',
    sorter: true
  },
  {
    title: 'Tender name',
    dataIndex: 'name'
  },
  {
    title: 'Publish date',
    dataIndex: 'publishDate'
  },
  {
    title: 'Close date',
    dataIndex: 'closeDate'
  },
  {
    title: 'File',
    dataIndex: 'file'
  },
  {
    title: 'Operation',
    key: 'operation',
    fixed: 'right',
    width: 100
  }
];

export const eoiColumns = [
  { title: 'Document', dataIndex: 'document', key: '1' },
  { title: 'Submitted', dataIndex: 'submitted', key: '2' },
  { title: 'Document file name', dataIndex: 'fileName', key: '3' },
  { title: 'Notes', dataIndex: 'notes', key: '4' }
];

export const rfqColumns = [
  {
    title: 'OT material code',
    width: 150,
    dataIndex: 'materialCode',
    key: '1',
    fixed: 'left'
  },
  { title: 'Purchase request number', dataIndex: 'requestNum', key: '2' },
  { title: 'Short text', dataIndex: 'shortText', key: '3' },
  { title: 'Quantity', dataIndex: 'quantity', key: '4' },
  { title: 'UOM', dataIndex: 'UOM', key: '5' },
  { title: 'Manufacturer', dataIndex: 'manufacturer', key: '6' },
  { title: 'Manufacturer part #', dataIndex: 'manufacturerPartNum', key: '7' },
  {
    title: 'Suggested manufacturer if any',
    dataIndex: 'suggestedManufacturer',
    key: '8'
  },
  {
    title: 'Suggested manufacturer part #',
    dataIndex: 'suggestedManufacturerPartNum',
    key: '9'
  },
  { title: 'Unit price (excluding VAT)', dataIndex: 'unitPrice', key: '10' },
  { title: 'Total price', dataIndex: 'totalPrice', key: '11' },
  { title: 'Lead time', dataIndex: 'leadTime', key: '12' },
  { title: 'Shipping teams', dataIndex: 'shippingTime', key: '13' },
  { title: 'Comment', dataIndex: 'comment', key: '14' },
  { title: 'Picture (if required)', dataIndex: 'picture', key: '15' }
];

export const booleanData = [
  { text: 'Yes', value: 'true' },
  { text: 'No', value: 'false' }
];

export const mockTender = {
  tenderNumber: 'nm123',
  tenderName: 'hakuna',
  startDate: '2017-12-12T11:25:44.524Z',
  endDate: '2017-12-19T11:25:44.524Z',
  reminderDay: '1 day',
  tableRows: [
    {
      key: 0,
      materialCode: 'aaab',
      requestNum: 'bbbb',
      shortText: 'cccc',
      quantity: 'dddd',
      UOM: 'ereeee',
      manufacturer: 'ffff',
      manufacturerPartNum: 'gggg',
      suggestedManufacturer: 'hhhh',
      suggestedManufacturerPartNum: 'jjjjj',
      unitPrice: 'kkkkk',
      totalPrice: 'llllll',
      leadTime: 'mmmmm',
      shippingTime: 'nnnnn',
      comment: 'Oooooo',
      picture: 'pppppp'
    },
    {
      key: 1,
      materialCode: 'asfasfasfasfsa',
      requestNum: 'bbbb',
      shortText: 'cccc',
      quantity: 'dddd',
      UOM: 'ereeee',
      manufacturer: 'ffff',
      manufacturerPartNum: 'gggg',
      suggestedManufacturer: 'hhhh',
      suggestedManufacturerPartNum: 'jjjjj',
      unitPrice: 'kkkkk',
      totalPrice: 'llllll',
      leadTime: 'mmmmm',
      shippingTime: 'nnnnn',
      comment: 'Oooooo',
      picture: 'pppppp'
    }
  ],
  companies: [{ basicInfo: { enName: 'enNames' } }],
  emailHtml:
    '<p>Dearsss Supplier,</p>\n<p></p>\n<p>You are kindly invited to quote for following items.</p>\n<p>Bid closing time: 14:00 PM , May 2017 Local time (Ulaanbaatar) .,</p>\n<p></p>\n<p>NOTE: please ensure the pricing to be valid for partial purchase.</p>\n<p></p>\n<p>Please submit Quotation only in MS Excel format, all other formats will not be accepted. Additional information can be attached.</p>\n<p>Please send your quote for this RFQ just replying to the email it came from, do not change the email subject line.</p>\n<p></p>\n<p>Your lead time must include your packaging and document preperation time. (The goods need to be ready: packaged, documented and ready for pick up by the end of your lead time given)</p>\n<p>Quote must include actual pick up address of the order * (*applicable to international orders under FCA term)</p>\n<p>Please include Oyu Tolgoi stock code/ Material number** to your quote (each item has individual code), if there is no stock code in the Request For Quote you can leave it blank.</p>\n<p>Please send your quote before the bid end time as we do not consider the bids received after bid closing time valid for evaluation.</p>\n<p>Currency should be in MNT from Mongolian companies and USD from International vendors.</p>\n<p>If you offer alternative product (brand, make, model etc) with alternative technical specifications, please send technical data sheet (picture or link from the internet) with your quotation so they can be evaluated.</p>\n<p>Oyu Tolgoi (OT) General Conditions for Services and Supply of Goods can be accessed at:</p>\n<p></p>\n<p>These changes would mean that:</p>\n<p>Our payment terms will be 45 days from the end of the calendar month (accumulation period) in which the invoice is received.</p>\n<p>Our current weekly payment runs schedule will be replaced by twice-monthly payment runs, occurring on the 1st and 15th day (or next business day) of each month.</p>\n<p>All payments will be made in the payment run immediately following the end of the payment term.</p>\n<p></p>\n<p>Oyu Tolgoi LLC. values our relationship with your company and we ask for your help in implementing these changes. We believe this change will increase the efficiency and predictability in our accounts payable process and help provide cash flow certainty to our companies.</p>\n<p></p>\n<p>This letter is notice to you that our new standard payment policy and processing arrangements will be applied to all invoices dated and received from you from 1 June 2015. Please update your records to reflect this change.</p>\n'
};

export const eoiTemplate = {
  tableRows: [
    { key: 0, document: 'Scope specific experience' },
    { key: 1, document: 'Customer reference /atleast 2/' },
    { key: 2, document: 'Special licences if applicable (copy)' }
  ],
  emailHtml:
    '<p>Dearsss Supplier,</p>\n<p></p>\n<p>You are kindly invited to quote for following items.</p>\n<p>Bid closing time: 14:00 PM , May 2017 Local time (Ulaanbaatar) .,</p>\n<p></p>\n<p>NOTE: please ensure the pricing to be valid for partial purchase.</p>\n<p></p>\n<p>Please submit Quotation only in MS Excel format, all other formats will not be accepted. Additional information can be attached.</p>\n<p>Please send your quote for this RFQ just replying to the email it came from, do not change the email subject line.</p>\n<p></p>\n<p>Your lead time must include your packaging and document preperation time. (The goods need to be ready: packaged, documented and ready for pick up by the end of your lead time given)</p>\n<p>Quote must include actual pick up address of the order * (*applicable to international orders under FCA term)</p>\n<p>Please include Oyu Tolgoi stock code/ Material number** to your quote (each item has individual code), if there is no stock code in the Request For Quote you can leave it blank.</p>\n<p>Please send your quote before the bid end time as we do not consider the bids received after bid closing time valid for evaluation.</p>\n<p>Currency should be in MNT from Mongolian companies and USD from International vendors.</p>\n<p>If you offer alternative product (brand, make, model etc) with alternative technical specifications, please send technical data sheet (picture or link from the internet) with your quotation so they can be evaluated.</p>\n<p>Oyu Tolgoi (OT) General Conditions for Services and Supply of Goods can be accessed at:</p>\n<p></p>\n<p>These changes would mean that:</p>\n<p>Our payment terms will be 45 days from the end of the calendar month (accumulation period) in which the invoice is received.</p>\n<p>Our current weekly payment runs schedule will be replaced by twice-monthly payment runs, occurring on the 1st and 15th day (or next business day) of each month.</p>\n<p>All payments will be made in the payment run immediately following the end of the payment term.</p>\n<p></p>\n<p>Oyu Tolgoi LLC. values our relationship with your company and we ask for your help in implementing these changes. We believe this change will increase the efficiency and predictability in our accounts payable process and help provide cash flow certainty to our companies.</p>\n<p></p>\n<p>This letter is notice to you that our new standard payment policy and processing arrangements will be applied to all invoices dated and received from you from 1 June 2015. Please update your records to reflect this change.</p>\n'
};

export const rfqTemplate = {
  tableRows: [{ key: 0 }],
  emailHtml:
    '<p>Dears Supplier,</p>\n<p></p>\n<p>You are kindly invited to quote for following items.</p>\n<p>Bid closing time: 14:00 PM , May 2017 Local time (Ulaanbaatar) .,</p>\n<p></p>\n<p>NOTE: please ensure the pricing to be valid for partial purchase.</p>\n<p></p>\n<p>Please submit Quotation only in MS Excel format, all other formats will not be accepted. Additional information can be attached.</p>\n<p>Please send your quote for this RFQ just replying to the email it came from, do not change the email subject line.</p>\n<p></p>\n<p>Your lead time must include your packaging and document preperation time. (The goods need to be ready: packaged, documented and ready for pick up by the end of your lead time given)</p>\n<p>Quote must include actual pick up address of the order * (*applicable to international orders under FCA term)</p>\n<p>Please include Oyu Tolgoi stock code/ Material number** to your quote (each item has individual code), if there is no stock code in the Request For Quote you can leave it blank.</p>\n<p>Please send your quote before the bid end time as we do not consider the bids received after bid closing time valid for evaluation.</p>\n<p>Currency should be in MNT from Mongolian companies and USD from International vendors.</p>\n<p>If you offer alternative product (brand, make, model etc) with alternative technical specifications, please send technical data sheet (picture or link from the internet) with your quotation so they can be evaluated.</p>\n<p>Oyu Tolgoi (OT) General Conditions for Services and Supply of Goods can be accessed at:</p>\n<p></p>\n<p>These changes would mean that:</p>\n<p>Our payment terms will be 45 days from the end of the calendar month (accumulation period) in which the invoice is received.</p>\n<p>Our current weekly payment runs schedule will be replaced by twice-monthly payment runs, occurring on the 1st and 15th day (or next business day) of each month.</p>\n<p>All payments will be made in the payment run immediately following the end of the payment term.</p>\n<p></p>\n<p>Oyu Tolgoi LLC. values our relationship with your company and we ask for your help in implementing these changes. We believe this change will increase the efficiency and predictability in our accounts payable process and help provide cash flow certainty to our companies.</p>\n<p></p>\n<p>This letter is notice to you that our new standard payment policy and processing arrangements will be applied to all invoices dated and received from you from 1 June 2015. Please update your records to reflect this change.</p>\n'
};
