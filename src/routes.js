import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MainLayout } from './modules/layout/containers';
import DashboardRoutes from './modules/dashboard/routes';
import CompaniesRoutes from './modules/companies/routes';
import TendersRoutes from './modules/tenders/routes';
import AuthRoutes from './modules/auth/routes';
import UsersRoutes from './modules/settings/routes';
import QualificationRoutes from './modules/qualification/routes';
import TenderMessageRoutes from './modules/tender_messages/routes';

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        {DashboardRoutes}
        {AuthRoutes}
        {CompaniesRoutes}
        {TendersRoutes}
        {QualificationRoutes}
        {UsersRoutes}
        {TenderMessageRoutes}
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default Routes;
