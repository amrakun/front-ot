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
    const fixedMessage = (error.message || error).replace(
      'GraphQL error: ',
      ''
    );

    return message.error(__ ? __(fixedMessage) : fixedMessage);
  },

  success: (msg, __) => {
    return message.success(__ ? __(msg) : msg);
  }
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

export const installErxes = (brandId, user) => {
  const settings = window.erxesSettings;

  if (settings && settings.messenger.brand_id === brandId) {
    return;
  }

  window.erxesSettings = {
    messenger: {
      brand_id: brandId,
      email: user.email,
      phone: user.phone
    }
  };

  if (document.getElementById('erxes-messenger-iframe')) {
    document.getElementById('erxes-messenger-iframe').remove();
  }

  (() => {
    const script = document.createElement('script');

    script.src = 'http://erxes.ot.mn:3002/build/messengerWidget.bundle.js';
    script.async = true;

    const entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);
  })();
};

export const generateTemplateUrl = name => {
  const { REACT_APP_API_URL } = process.env;
  const { LOGIN_TOKEN_KEY } = consts;
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);

  return `${REACT_APP_API_URL}/static/templates/${name}.xlsx?token=${token}`;
};

export const readFileUrl = url => {
  const { REACT_APP_API_URL } = process.env;

  return `${REACT_APP_API_URL}/read-file?key=${url}`;
};
