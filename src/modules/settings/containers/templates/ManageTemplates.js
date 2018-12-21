import React from 'react';
import { withCurrentUser } from 'modules/auth/containers';
import { ManageTemplates } from '../../components';

const ManageTemplatesContainer = props => {
  const { currentUser } = props;

  if (currentUser.isSupplier) {
    return null;
  }

  return <ManageTemplates {...props} />;
};

export default withCurrentUser(ManageTemplatesContainer);
