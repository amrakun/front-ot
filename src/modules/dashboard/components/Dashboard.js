import React from 'react';
import { Tenders } from '../../tenders/containers';

const Dashboard = () => (
  <div>
    <Tenders type="rfq" />
    <Tenders type="eoi" />
  </div>
);

export default Dashboard;
