import React from 'react';
import { Tooltip } from 'antd';

export const statusIcons = {
  draft: { type: 'edit', color: 'rgb(161,161,164)' },
  participated: { type: 'check-circle-o', color: 'rgb(244,119,33)' },
  notInterested: { type: 'minus-circle', color: 'rgb(173,77,77,1)' },
  open: { type: 'sync', color: 'rgb(0,153,168)' },
  closed: { type: 'lock', color: 'rgb(188, 90, 58)' },
  awarded: { type: 'trophy', color: 'rgb(244,119,33)' },
  canceled: { type: 'close-circle', color: 'rgb(67,83,99)' },
};

export const labels = {
  rfq: 'Request For Quotation',
  trfq: 'Travel request for quotation',
  eoi: 'Expression Of Interest',
};

export const rfqProductsColumns = {
  code: 'PR Number',
  purchaseRequestNumber: 'OT Material number',
  shortText: 'Material Description',
  quantity: 'Quantity',
  uom: 'UOM',
  manufacturer: 'Manufacturer',
  manufacturerPart: 'Manufacturer part number',
  unitPrice: 'Unit Price in MNT (excluding VAT)',
  currency:
    'Currency (Mongolian supplier submits quotes only in MNT, International supplier submits quotes only in USD)',
  leadTime: 'Lead time in Days',
  shippingTerms: 'Shipping terms',
  alternative: 'Alternative (YES/NO)',
  suggestedManufacturer: 'Suggested manufacturer if any',
  suggestedManufacturerPart: 'Suggest manufacturer part number',
  totalPrice: 'Total price',
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
    title: rfqProductsColumns.code,
    width: 150,
    dataIndex: 'code',
    key: '1',
  },
  {
    title: rfqProductsColumns.purchaseRequestNumber,
    dataIndex: 'purchaseRequestNumber',
    key: '2',
  },
  {
    title: rfqProductsColumns.shortText,
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
  { title: rfqProductsColumns.quantity, dataIndex: 'quantity', key: '4' },
  { title: rfqProductsColumns.uom, dataIndex: 'uom', key: '5' },
  { title: rfqProductsColumns.manufacturer, dataIndex: 'manufacturer', key: '6' },
  {
    title: rfqProductsColumns.manufacturerPart,
    dataIndex: 'manufacturerPartNumber',
    key: '7',
  },
];

export const rfqResponseColumns = [
  { title: rfqProductsColumns.unitPrice, dataIndex: 'unitPrice', key: '10' },
  { title: rfqProductsColumns.totalPrice, dataIndex: 'totalPrice', key: '11' },
  { title: rfqProductsColumns.currency, dataIndex: 'currency', key: '12' },
  { title: rfqProductsColumns.leadTime, dataIndex: 'leadTime', key: '13' },
  { title: rfqProductsColumns.shippingTerms, dataIndex: 'shippingTerms', key: '14' },
  {
    title: rfqProductsColumns.suggestedManufacturer,
    dataIndex: 'suggestedManufacturer',
    key: '8',
  },
  {
    title: rfqProductsColumns.purchaseRequestNumber,
    dataIndex: 'suggestedManufacturerPartNumber',
    key: '9',
  },
  { title: rfqProductsColumns.comment, dataIndex: 'comment', key: '15' },
  { title: rfqProductsColumns.picture, dataIndex: 'file', key: '16' },
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
  document__0: 'Scope specific experience',
  document__1: 'Customer reference /atleast 2/',
  document__2: 'Special licences if applicable (copy)',
};
