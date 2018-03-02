import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Formatted = (props, context) => {
  const { id, children } = props;
  const { currentUser } = context;
  const isSupplier = (currentUser && currentUser.isSupplier) || false;

  return isSupplier ? (
    <FormattedMessage id={id} defaultMessage={children} />
  ) : (
    children
  );
};

Formatted.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string
};

Formatted.contextTypes = {
  currentUser: PropTypes.object
};

export default Formatted;
