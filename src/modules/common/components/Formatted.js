import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const Formatted = props => {
  return <FormattedMessage id={props.id} defaultMessage={props.children} />;
};

export default Formatted;
