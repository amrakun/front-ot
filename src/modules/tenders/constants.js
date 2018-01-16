export const statusIcons = {
  draft: { type: 'edit', color: 'rgb(161,161,164)' },
  open: { type: 'sync', color: 'rgb(0,153,168)' },
  closed: { type: 'lock', color: 'rgb(188, 90, 58)' },
  awarded: { type: 'trophy', color: 'rgb(244,119,33)' },
  participated: { type: 'check-circle-o', color: 'rgb(244,119,33)' }
};

export const labels = {
  rfq: 'Request For Quotation',
  eoi: 'Expression Of Interest'
};

export const rfqProductsColumns = {
  code: 'OT material code',
  purchaseRequestNumber: 'Purchase request number',
  shortText: 'Short text',
  quantity: 'Quantity',
  uom: 'UOM',
  manufacturer: 'Manufacturer',
  manufacturerPart: 'Manufacturer part number',
  suggestedManufacturer: 'Suggested manufacturer if any',
  suggestedManufacturerPart: 'Suggest manufacturer part number',
  unitPrice: 'Unit pirce',
  totalPrice: 'Total price',
  leadTime: 'Lead time',
  shippingTerms: 'Shipping terms',
  comment: 'Comment',
  picture: 'Picture (if required)'
};

export const eoiProductsColumns = {
  document: 'Document',
  isSubmitted: 'Submitted',
  documentFileName: 'Document file name',
  notes: 'Notes'
};

export const eoiRequestColumns = [
  { title: 'Document', dataIndex: 'document', key: '1' }
];

export const eoiResponseColumns = [
  { title: 'Document file name', dataIndex: 'name', key: '3' },
  { title: 'Submitted', dataIndex: 'isSubmitted', key: '2' },
  { title: 'Picture', dataIndex: 'file', key: '5' },
  { title: 'Notes', dataIndex: 'notes', key: '4' }
];

export const eoiColumns = [...eoiRequestColumns, ...eoiResponseColumns];

export const rfqRequestColumns = [
  {
    title: 'OT material code',
    width: 150,
    dataIndex: 'code',
    key: '1',
    fixed: 'left'
  },
  {
    title: 'Purchase request number',
    dataIndex: 'purchaseRequestNumber',
    key: '2'
  },
  { title: 'Short text', dataIndex: 'shortText', key: '3' },
  { title: 'Quantity', dataIndex: 'quantity', key: '4' },
  { title: 'UOM', dataIndex: 'UOM', key: '5' },
  { title: 'Manufacturer', dataIndex: 'manufacturer', key: '6' },
  {
    title: 'Manufacturer part number',
    dataIndex: 'manufacturerPartNumber',
    key: '7'
  }
];

export const rfqResponseColumns = [
  {
    title: 'Suggested manufacturer if any',
    dataIndex: 'suggestedManufacturer',
    key: '8'
  },
  {
    title: 'Suggested manufacturer part number',
    dataIndex: 'suggestedManufacturerPartNumber',
    key: '9'
  },
  { title: 'Unit price (excluding VAT)', dataIndex: 'unitPrice', key: '10' },
  { title: 'Total price', dataIndex: 'totalPrice', key: '11' },
  { title: 'Lead time', dataIndex: 'leadTime', key: '12' },
  { title: 'Shipping terms', dataIndex: 'shippingTerms', key: '13' },
  { title: 'Comment', dataIndex: 'comment', key: '14' },
  { title: 'Picture (if required)', dataIndex: 'file', key: '15' }
];

export const rfqColumns = [...rfqRequestColumns, ...rfqResponseColumns];

export const eoiEmailTemplate =
  '<p>Dearsss Supplier,</p>\n<p></p>\n<p>You are kindly invited to quote for following items.</p>\n<p>Bid closing time: 14:00 PM , May 2017 Local time (Ulaanbaatar) .,</p>\n<p></p>\n<p>NOTE: please ensure the pricing to be valid for partial purchase.</p>\n<p></p>\n<p>Please submit Quotation only in MS Excel format, all other formats will not be accepted. Additional information can be attached.</p>\n<p>Please send your quote for this RFQ just replying to the email it came from, do not change the email subject line.</p>\n<p></p>\n<p>Your lead time must include your packaging and document preperation time. (The goods need to be ready: packaged, documented and ready for pick up by the end of your lead time given)</p>\n<p>Quote must include actual pick up address of the order * (*applicable to international orders under FCA term)</p>\n<p>Please include Oyu Tolgoi stock code/ Material number** to your quote (each item has individual code), if there is no stock code in the Request For Quote you can leave it blank.</p>\n<p>Please send your quote before the bid end time as we do not consider the bids received after bid closing time valid for evaluation.</p>\n<p>Currency should be in MNT from Mongolian companies and USD from International vendors.</p>\n<p>If you offer alternative product (brand, make, model etc) with alternative technical specifications, please send technical data sheet (picture or link from the internet) with your quotation so they can be evaluated.</p>\n<p>Oyu Tolgoi (OT) General Conditions for Services and Supply of Goods can be accessed at:</p>\n<p></p>\n<p>These changes would mean that:</p>\n<p>Our payment terms will be 45 days from the end of the calendar month (accumulation period) in which the invoice is received.</p>\n<p>Our current weekly payment runs schedule will be replaced by twice-monthly payment runs, occurring on the 1st and 15th day (or next business day) of each month.</p>\n<p>All payments will be made in the payment run immediately following the end of the payment term.</p>\n<p></p>\n<p>Oyu Tolgoi LLC. values our relationship with your company and we ask for your help in implementing these changes. We believe this change will increase the efficiency and predictability in our accounts payable process and help provide cash flow certainty to our companies.</p>\n<p></p>\n<p>This letter is notice to you that our new standard payment policy and processing arrangements will be applied to all invoices dated and received from you from 1 June 2015. Please update your records to reflect this change.</p>\n';

export const rfqEmailTemplate =
  '<p>Dears Supplier,</p>\n<p></p>\n<p>You are kindly invited to quote for following items.</p>\n<p>Bid closing time: 14:00 PM , May 2017 Local time (Ulaanbaatar) .,</p>\n<p></p>\n<p>NOTE: please ensure the pricing to be valid for partial purchase.</p>\n<p></p>\n<p>Please submit Quotation only in MS Excel format, all other formats will not be accepted. Additional information can be attached.</p>\n<p>Please send your quote for this RFQ just replying to the email it came from, do not change the email subject line.</p>\n<p></p>\n<p>Your lead time must include your packaging and document preperation time. (The goods need to be ready: packaged, documented and ready for pick up by the end of your lead time given)</p>\n<p>Quote must include actual pick up address of the order * (*applicable to international orders under FCA term)</p>\n<p>Please include Oyu Tolgoi stock code/ Material number** to your quote (each item has individual code), if there is no stock code in the Request For Quote you can leave it blank.</p>\n<p>Please send your quote before the bid end time as we do not consider the bids received after bid closing time valid for evaluation.</p>\n<p>Currency should be in MNT from Mongolian companies and USD from International vendors.</p>\n<p>If you offer alternative product (brand, make, model etc) with alternative technical specifications, please send technical data sheet (picture or link from the internet) with your quotation so they can be evaluated.</p>\n<p>Oyu Tolgoi (OT) General Conditions for Services and Supply of Goods can be accessed at:</p>\n<p></p>\n<p>These changes would mean that:</p>\n<p>Our payment terms will be 45 days from the end of the calendar month (accumulation period) in which the invoice is received.</p>\n<p>Our current weekly payment runs schedule will be replaced by twice-monthly payment runs, occurring on the 1st and 15th day (or next business day) of each month.</p>\n<p>All payments will be made in the payment run immediately following the end of the payment term.</p>\n<p></p>\n<p>Oyu Tolgoi LLC. values our relationship with your company and we ask for your help in implementing these changes. We believe this change will increase the efficiency and predictability in our accounts payable process and help provide cash flow certainty to our companies.</p>\n<p></p>\n<p>This letter is notice to you that our new standard payment policy and processing arrangements will be applied to all invoices dated and received from you from 1 June 2015. Please update your records to reflect this change.</p>\n';

export const rfqDisclaimer = {
  title: 'Disclaimer',
  description: [
    '*Lead time quoted will be taken seriously and treated as final.',
    '*Quotes will be rejected with different formats than this template.',
    "*Please don't delete the lines you cannot quote just leave with a value of '0' and don't  change the sequence of lines.",
    '*Quoted price must include all expenses including packaging and delivery to OT warehouse'
  ]
};
