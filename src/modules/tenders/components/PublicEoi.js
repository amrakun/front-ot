import React from 'react';
import { SupplierTenders } from 'modules/tenders/containers';
import { withRouter } from 'react-router';

const Dashboard = () => (
  <div style={{ marginTop: '30px' }}>
    <SupplierTenders type="eoi" queryParams={{ status: ['open'] }} />
  </div>
);

export default withRouter(Dashboard);
