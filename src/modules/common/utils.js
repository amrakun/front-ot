import xlsx from 'xlsx';
import { message } from 'antd';

export const xlsxHandler = ({ e, success }) => {
  const reader = new FileReader();

  reader.onload = e => {
    const data = e.target.result;
    const workbook = xlsx.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    success(xlData);
  };

  reader.readAsBinaryString(e.target.files[0]);
};

export const alert = {
  error: (error, __) => {
    const fixedMessage = error.message.replace('GraphQL error: ', '');

    return message.error(__ ? __(fixedMessage) : fixedMessage);
  },

  success: (msg, __) => {
    return message.success(__ ? __(msg) : msg);
  }
};
