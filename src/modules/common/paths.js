const supDash = {
  path: '/rfq-and-eoi',
  breadcrumb: ['Tenders & EOI']
};
const newRfq = {
  path: '/rfq/publish',
  breadcrumb: ['Request For Quotation', 'Publish']
};
const newEoi = {
  path: '/eoi/publish',
  breadrcumb: ['Expression of Interest', 'Publish']
};
const editTender = {
  path: '/tender/edit',
  breadrcumb: ['Tenders and EOI', 'Edit']
};
const submitTender = {
  path: '/tender/submit',
  breadcrumb: ['Tenders and EOI', 'Submit']
};
const rfq = {
  path: '/rfq',
  breadcrumb: ['Request for quoatation']
};
const eoi = {
  path: '/eoi',
  breadcrumb: ['Tenders and EOI']
};
const viewTender = {
  path: '/tender',
  breadcrumb: ['Tenders and EOI', 'View']
};
const reg = {
  path: '/registration',
  breadcrumb: ['Registration']
};
const preq = {
  path: '/prequalification',
  breadcrumb: ['Pre-qualification']
};

const buyerPaths = [newEoi, newEoi, editTender, rfq, eoi, viewTender];

const paths = [
  submitTender,
  supDash,
  newRfq,
  newEoi,
  editTender,
  rfq,
  eoi,
  viewTender,
  reg,
  preq
];

export {
  newRfq,
  newEoi,
  editTender,
  submitTender,
  rfq,
  eoi,
  viewTender,
  supDash,
  reg,
  preq,
  buyerPaths,
  paths
};
