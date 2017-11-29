import React from 'react'
import {withRouter} from 'react-router'

import FinancialForm from './forms/Financial'
import EnvironmentalForm from './forms/Environmental'
import BusinessForm from './forms/Business'
import HealthForm from './forms/Health'

import PropTypes from 'prop-types'
import { Tabs, Icon } from 'antd';

const propTypes = {
  financialData: PropTypes.object,
  businessData: PropTypes.object,
  environmentalData: PropTypes.object,
  healthData: PropTypes.object,
};
const TabPane = Tabs.TabPane;

function isEmpty(data) {
  return Object.keys(data).length === 0 && data.constructor === Object;
}

function PrequalificationForms({
  financialData,
  businessData,
  environmentalData,
  healthData,
}) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab={<span>Financial Information  { isEmpty(financialData) ? '' : <Icon type="check" />}</span>} key="1">
          <FinancialForm data={financialData} />
        </TabPane>
        <TabPane tab={<span>Business integrity & human resource { isEmpty(businessData) ? '' : <Icon type="check" />}</span>} key="3">
          <BusinessForm data={businessData} />
        </TabPane>
        <TabPane tab={<span>Environmental management { isEmpty(environmentalData) ? '' : <Icon type="check" />}</span>} key="2">
          <EnvironmentalForm data={environmentalData} />
        </TabPane>
        <TabPane tab={<span>Health & safety management system { isEmpty(healthData) ? '' : <Icon type="check" />}</span>} key="4">
          <HealthForm data={healthData} />
        </TabPane>
      </Tabs>
    </div>
  );
}

PrequalificationForms.propTypes = propTypes;

export default withRouter(PrequalificationForms);
