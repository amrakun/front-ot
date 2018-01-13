import React from 'react';
import { Tabs } from 'antd';
import StatusTab from './StatusTab';
import Panes from '../Panes';

class Status extends Panes {
  render() {
    const { currentTabKey } = this.state;

    return (
      <Tabs
        activeKey={currentTabKey}
        onTabClick={this.moveToTab}
        tabPosition="left"
        className="supplier-forms"
      >
        {this.renderPane(
          '1',
          'Financial information',
          'financialInfo',
          StatusTab
        )}
        {this.renderPane(
          '2',
          'Business integrity & human resource',
          'businessInfo',
          StatusTab
        )}
        {this.renderPane(
          '3',
          'Environmental management',
          'environmentalInfo',
          StatusTab
        )}
        {this.renderPane(
          '4',
          'Health & safety management system',
          'healthInfo',
          StatusTab
        )}
      </Tabs>
    );
  }
}

export default Status;
