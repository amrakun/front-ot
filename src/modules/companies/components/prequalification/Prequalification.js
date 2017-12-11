import React from 'react';
import { Tabs } from 'antd';

import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import Panes from '../Panes';

class PrequalificationForms extends Panes {
  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          {this.renderPane(
            '1',
            'Financial Information',
            'financialInfo',
            FinancialForm
          )}
          {this.renderPane(
            '2',
            'Business integrity & human resource',
            'businessInfo',
            BusinessForm
          )}
          {this.renderPane(
            '3',
            'Environmental management',
            'environmentalManagement',
            EnvironmentalForm
          )}
          {this.renderPane(
            '4',
            'Health & safety management system',
            'healthAndSafetyManagement',
            HealthForm
          )}
        </Tabs>
      </div>
    );
  }
}

export default PrequalificationForms;
