import strip from 'strip';

export const controlValueParser = ({ e, dataType }) => {
  let value;

  if (e.target) {
    if (e.target.value) {
      //input
      value = e.target.value;

      if (dataType === 'float') value = parseFloat(value);

      if (dataType === 'eightDigit' && value.length > 8) value = value.substring(0, 8);
    }
  } else {
    //file
    value = e;
  }

  return value;
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

export const clearContent = content => {
  return strip(content || '').trim();
};
