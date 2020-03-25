import strip from 'strip';
import xlsx from 'read-excel-file';
import { message } from 'antd';
import productsTree from 'modules/common/components/productsTree/constants';
import consts from 'consts';

export const xlsxHandler = ({ e, success, parse = true }) => {
  const reader = new FileReader();

  reader.onload = async e => {
    const data = e.target.result;
    const rows = await xlsx(data);

    if (rows.length <= 1) {
      return success([]);
    }

    const [headers, ...dataRows] = rows;

    if (!parse) {
      return success(dataRows);
    }

    const results = [];

    dataRows.forEach(row => {
      const mapper = {};

      row.forEach((cell, index) => {
        mapper[headers[index]] = cell;
      });

      results.push(mapper);
    });

    return success(results);
  };

  reader.readAsBinaryString(e.target.files[0]);
};

export const alert = {
  error: (error, __) => {
    const fixedMessage = (error.message || error).replace('GraphQL error: ', '');

    return message.error(__ ? __(fixedMessage) : fixedMessage);
  },

  success: (msg, __) => {
    return message.success(__ ? __(msg) : msg);
  },
};

const flattenProductsTree = (map, item) => {
  if (item.value) {
    map[item.value] = item.label;
  }

  if (item.children) {
    for (const child of item.children) {
      flattenProductsTree(map, child);
    }
  }
};

export const getFlatProductsTree = locale => {
  const flatProductsInfo = {};

  for (const item of productsTree[locale]) {
    flattenProductsTree(flatProductsInfo, item);
  }

  return flatProductsInfo;
};

export const generateTemplateUrl = name => {
  const { REACT_APP_API_URL } = process.env;
  const { LOGIN_TOKEN_KEY } = consts;
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);

  return `${REACT_APP_API_URL}/static/templates/${name}.xlsx?token=${token}`;
};

function ieVersion() {
  var ua = window.navigator.userAgent;

  if (ua.indexOf('Trident/7.0') > -1) return 11;
  else if (ua.indexOf('Trident/6.0') > -1) return 10;
  else if (ua.indexOf('Trident/5.0') > -1) return 9;
  else return 0; // not IE9, 10 or 11
}

export const readFileUrl = url => {
  const { REACT_APP_API_URL } = process.env;

  let key = url;

  if (ieVersion()) {
    key = encodeURI(url);
  }

  return `${REACT_APP_API_URL}/read-file?key=${key}`;
};

export const roundNumber = number => {
  if (!number) {
    return number;
  }

  return Math.round(number).toLocaleString();
};

export const clearContent = content => {
  return strip(content || '').trim();
};
