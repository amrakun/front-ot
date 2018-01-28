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
  { title: 'Required document', dataIndex: 'document', key: '1' }
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

export const rfqDisclaimer = {
  title: 'Disclaimer',
  description: [
    '*Lead time quoted will be taken seriously and treated as final.',
    '*Quotes will be rejected with different formats than this template.',
    "*Please don't delete the lines you cannot quote just leave with a value of '0' and don't  change the sequence of lines.",
    '*Quoted price must include all expenses including packaging and delivery to OT warehouse'
  ]
};

export const initialProducts = [
  { key: 1, document: 'Scope specific experience' },
  { key: 2, document: 'Customer reference /atleast 2/' },
  { key: 3, document: 'Special licences if applicable (copy)' },
  { key: 4, document: 'State registration certificate (copy)' },
  { key: 5, document: 'HSE policy & procedures (copy)' },
  { key: 6, document: 'Business code of conduct (copy)' },
  { key: 7, document: 'Brief introduction of company' },
  { key: 8, document: 'Ownership/shareholder information' },
  { key: 9, document: 'Executive team structure/introduction' },
  { key: 10, document: 'Organization structure & total manpower' }
];
export const initialPerProducts = {
  product__1: { document: 'Scope specific experience' },
  product__2: { document: 'Customer reference /atleast 2/' },
  product__3: { document: 'Special licences if applicable (copy)' },
  product__4: { document: 'State registration certificate (copy)' },
  product__5: { document: 'HSE policy & procedures (copy)' },
  product__6: { document: 'Business code of conduct (copy)' },
  product__7: { document: 'Brief introduction of company' },
  product__8: { document: 'Ownership/shareholder information' },
  product__9: { document: 'Executive team structure/introduction' },
  product__10: { document: 'Organization structure & total manpower' }
};
