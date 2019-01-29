import React from 'react';
import { readFileUrl } from 'modules/common/utils';

export const renderFile = value => {
  if (!value) {
    return 'No';
  }

  return (
    <span>
      file:
      <a href={readFileUrl(value.url)} target="__blank">
        {value.name}
      </a>
    </span>
  );
};

export const renderBoolean = value => {
  return value ? 'Yes' : 'No';
};
