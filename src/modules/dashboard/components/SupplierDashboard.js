import React from 'react';
import { Tenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';

const Dashboard = (props, context) => {
  const { currentUser } = context;

  return (
    <div>
      <Tenders type="rfq" supplierId={currentUser.companyId} />
      <Tenders type="eoi" supplierId={currentUser.companyId} />
    </div>
  );
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object
};

export default Dashboard;
