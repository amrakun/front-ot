import React from 'react';
import { Tooltip } from 'antd';

export const statusIcons = {
  draft: { type: 'edit', color: 'rgb(161,161,164)' },
  open: { type: 'sync', color: 'rgb(0,153,168)' },
  closed: { type: 'lock', color: 'rgb(188, 90, 58)' },
  awarded: { type: 'trophy', color: 'rgb(244,119,33)' },
  participated: { type: 'check-circle-o', color: 'rgb(244,119,33)' },
  canceled: { type: 'close-circle', color: 'rgb(67,83,99)' },
};

export const labels = {
  rfq: 'Request For Quotation',
  trfq: 'Travel request for quotation',
  eoi: 'Expression Of Interest',
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
  unitPrice: 'Unit price',
  totalPrice: 'Total price',
  currency: 'Currency',
  leadTime: 'Lead time (day)',
  shippingTerms: 'Shipping terms',
  alternative: 'Alternative',
  comment: 'Comment',
  picture: 'Picture (if required)',
};

export const eoiProductsColumns = {
  document: 'Document',
  isSubmitted: 'Submitted',
  documentFileName: 'Document file name',
  notes: 'Notes',
};

export const eoiRequestColumns = [{ title: 'Required document', dataIndex: 'document', key: '1' }];

export const eoiResponseColumns = [
  { title: 'Document file name', dataIndex: 'name', key: '3' },
  { title: 'Submitted', dataIndex: 'isSubmitted', key: '2' },
  { title: 'Picture', dataIndex: 'file', key: '5' },
  { title: 'Notes', dataIndex: 'notes', key: '4' },
];

export const eoiColumns = [...eoiRequestColumns, ...eoiResponseColumns];

export const rfqRequestColumns = [
  {
    title: 'OT material code',
    width: 150,
    dataIndex: 'code',
    key: '1',
  },
  {
    title: 'Purchase request number',
    dataIndex: 'purchaseRequestNumber',
    key: '2',
  },
  {
    title: 'Short text',
    dataIndex: 'shortText',
    key: '3',
    width: 150,
    onCell: () => {
      return {
        style: {
          maxWidth: 150,
        },
      };
    },
    render: shortText => {
      return (
        <Tooltip placement="topLeft" title={shortText}>
          <span>{shortText}</span>
        </Tooltip>
      );
    },
  },
  { title: 'Quantity', dataIndex: 'quantity', key: '4' },
  { title: 'UOM', dataIndex: 'UOM', key: '5' },
  { title: 'Manufacturer', dataIndex: 'manufacturer', key: '6' },
  {
    title: 'Manufacturer part number',
    dataIndex: 'manufacturerPartNumber',
    key: '7',
  },
];

export const rfqResponseColumns = [
  {
    title: 'Suggested manufacturer if any',
    dataIndex: 'suggestedManufacturer',
    key: '8',
  },
  {
    title: 'Suggested manufacturer part number',
    dataIndex: 'suggestedManufacturerPartNumber',
    key: '9',
  },
  { title: 'Unit price (excluding VAT)', dataIndex: 'unitPrice', key: '10' },
  { title: 'Total price', dataIndex: 'totalPrice', key: '11' },
  { title: 'Currency', dataIndex: 'currency', key: '12' },
  { title: 'Lead time', dataIndex: 'leadTime', key: '13' },
  { title: 'Shipping terms', dataIndex: 'shippingTerms', key: '14' },
  { title: 'Comment', dataIndex: 'comment', key: '15' },
  { title: 'Picture (if required)', dataIndex: 'file', key: '16' },
];

export const rfqColumns = [...rfqRequestColumns, ...rfqResponseColumns];

export const rfqDisclaimer = {
  title: 'Disclaimer',
  description:
    'Lead time quoted will be taken seriously and treated as final.  Quotes will be rejected with different formats than this template.  Please dont delete the lines you cannot quote just leave with a value of 0 and dont  change the sequence of lines.  Quoted price must include all expenses including packaging and delivery to OT warehouse.',
};

export const initialDocuments = [
  'Scope specific experience',
  'Customer reference /atleast 2/',
  'Special licences if applicable (copy)',
];

export const initialPerDocuments = {
  document__1: 'Scope specific experience',
  document__2: 'Customer reference /atleast 2/',
  document__3: 'Special licences if applicable (copy)',
};
