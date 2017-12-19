import React from 'react';
import { Tenders } from '../../tenders/containers';

const Dashboard = () => (
  <div>
    <Tenders type="rfq" supplier={true} />
    <Tenders type="eoi" supplier={true} />
  </div>
);

export default Dashboard;
