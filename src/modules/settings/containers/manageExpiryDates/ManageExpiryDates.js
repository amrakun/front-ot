import React from 'react';
import { withCurrentUser } from 'modules/auth/containers';
import { ManageExpiryDates } from '../../components';

const ManageExpiryDatesContainer = props => {
  const { currentUser } = props;

  if (currentUser.isSupplier) {
    return null;
  }

  return <ManageExpiryDates {...props} />;
};

export default withCurrentUser(ManageExpiryDatesContainer);
