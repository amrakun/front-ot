import React from 'react';
import { Icon } from 'antd';

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

const booleanDataReverse = [
  { text: 'No', value: 'true' },
  { text: 'Yes', value: 'false' }
];

const days = [
  { text: '1 day before', value: '1' },
  { text: '3 days before', value: '3' },
  { text: '7 days before', value: '7' }
];

const notifyLoading = {
  message: 'Building an excel...',
  description: 'You will get notified when your report is ready!',
  icon: <Icon type="loading" />,
  duration: 5,
  key: 'loadingNotification'
};

const notifyReady = {
  message: 'Your report is ready to download',
  icon: <Icon type="file-excel" style={{ color: 'rgb(0,153,168)' }} />,
  duration: 0,
  key: 'downloadNotification'
};

const { REACT_APP_API_URL } = process.env;
const uploadUrl = `${REACT_APP_API_URL}/upload-file`;

export {
  dateFormat,
  dateTimeFormat,
  uploadDisclaimer,
  noLabelLayout,
  days,
  booleanData,
  booleanDataReverse,
  notifyLoading,
  notifyReady,
  uploadUrl
};
