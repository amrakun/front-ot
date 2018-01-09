const dateFormat = 'YYYY/MM/DD';
const dateTimeFormat = 'YYYY/MM/DD HH:mm';

const uploadDisclaimer = `You may upload &quot;jpg,jpeg,png,rtf,pdf&quot;
  files, or simple Adobe PDF files. Files that have the ability to contain
  macros or other types of active code are not acceptable. Maximum file size is
  30mb.`;

const noLabelLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 }
  }
};

const booleanData = [
  { text: 'Yes', value: 'true' },
  { text: 'No', value: 'false' }
];

const days = [
  { text: '1 day before', value: '1' },
  { text: '3 days before', value: '3' },
  { text: '7 days before', value: '7' }
];

export {
  dateFormat,
  dateTimeFormat,
  uploadDisclaimer,
  noLabelLayout,
  days,
  booleanData
};
