import { xlsxHandler } from 'modules/common/utils';

export const controlValueParser = ({ e, dataType }) => {
  let value;

  if (e.target) {
    if (e.target.value) {
      //input
      value = e.target.value;

      if (dataType === 'float') value = parseFloat(value);

      if (dataType === 'eightDigit' && value.length > 8)
        value = value.substring(0, 8);
    }
  } else {
    //file
    value = e;
  }

  return value;
};

export const tableFileHandler = ({ e, state, callback }) => {
  xlsxHandler({
    e,
    success: data => {
      // removing all prev products
      Object.keys(state).forEach(key => {
        if (key.startsWith('product__')) {
          delete state[key];
        }
      });

      const products = [];
      const perProductStates = {};

      data.forEach(product => {
        const key = Math.random();
        const extendedProduct = { key, ...product };

        products.push(extendedProduct);

        perProductStates[`product__${key}`] = extendedProduct;
      });

      callback({ products, ...perProductStates });
    }
  });
};

export const collectProducts = state => {
  const products = [];

  // collect products table values
  Object.keys(state).forEach(key => {
    if (key.startsWith('product__')) {
      products.push({ ...state[key] });
    }
  });

  return products;
};
