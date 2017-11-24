import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RfqRoutes from './modules/rfq/routes';
import EoiRoutes from './modules/eoi/routes';
import DashboardRoutes from './modules/dashboard/routes';

const Routes = () => (
  <Router>
    <div>
      <RfqRoutes />
      <EoiRoutes />
      <DashboardRoutes />
    </div>
  </Router>
);

export default Routes;
