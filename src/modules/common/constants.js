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

const days = [{ text: '1 day', value: '1' }];

export { dateFormat, dateTimeFormat, uploadDisclaimer, noLabelLayout, days };
