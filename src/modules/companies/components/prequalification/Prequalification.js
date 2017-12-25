import React from 'react';
import { Tabs, Col } from 'antd';

import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import Panes from '../Panes';

class PrequalificationForms extends Panes {
  render() {
    return (
      <Col md={24} lg={20} xl={{ span: 14, offset: 1 }}>
        <Tabs tabPosition="left" className="supplier-forms">
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
            'environmentalInfo',
            EnvironmentalForm
          )}
          {this.renderPane(
            '4',
            'Health & safety management system',
            'healthInfo',
            HealthForm
          )}
        </Tabs>
      </Col>
    );
  }
}

export default PrequalificationForms;
