const generateVariables = queryParams => {
  const {
    search,
    region,
    productCodes,
    difotRange,
    sortField,
    sortDirection,
    page,
    perPage,
    includeBlocked,
    prequalifiedStatus,
    qualifiedStatus,
    productsInfoStatus
  } = queryParams;

  const status = queryParams.status || '';

  let difotScore = '';

  if (status && status.includes('byDifotScore')) {
    difotScore = difotRange;
  }

  const getBoolean = filter => {
    if (filter === undefined) return undefined;

    return filter === '' ? undefined : filter === 'true';
  };

  return {
    page: page || 1,
    perPage: perPage || 15,
    search,
    region,
    productCodes,
    difotScore,
    sortField,
    sortDirection,
    includeBlocked: getBoolean(includeBlocked),
    prequalifiedStatus,
    qualifiedStatus,
    productsInfoStatus
  };
};

export default generateVariables;
