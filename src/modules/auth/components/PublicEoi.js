import React from 'react';
import { Tenders } from 'modules/tenders/containers';
import { withRouter } from 'react-router';

const Dashboard = () => (
  <Tenders type="eoi" queryParams={{ status: ['open'] }} />
);

export default withRouter(Dashboard);
