import React from 'react';
import { Tabs, Button, Alert } from 'antd';
import { Panes } from 'modules/common/components';
import CommonTab from './CommonTab';
import TierTypeTab from './TierTypeTab';
import TierTypeForm from './TierTypeForm';
import financialInfo from './financialInfo';
import businessInfo from './businessInfo';
import environmentalInfo from './environmentalInfo';
import healthInfo from './healthInfo';
import { Prequalifier } from '../../containers/status';

class Status extends Panes {
  renderSkipped({ company, saveTierType, companyInfo, prequalifySupplier }) {
    return (
      <div>
        <Alert
          style={{ marginBottom: '30px' }}
          message="This supplier is skipped prequalification"
          description={companyInfo.prequalificationSkippedReason}
          type="warning"
          showIcon
        />

        <TierTypeForm
          title={'Select supplier tier type'}
          initialValue={company.tierType}
          saveTierType={saveTierType}
          companyInfo={{
            supplierId: companyInfo._id,
            ...companyInfo.basicInfo,
            isPrequalified: companyInfo.isPrequalified,
            isSentPrequalificationInfo: companyInfo.isSentPrequalificationInfo,
          }}
          prequalifySupplier={prequalifySupplier}
          renderButtons={save => (
            <div>
              <Button
                style={{ float: 'right', marginTop: '8px' }}
                htmlType="submit"
                type="primary"
                onClick={save}
              >
                Save
              </Button>
            </div>
          )}
        />
      </div>
    );
  }

  render() {
    const { company, companyInfo, saveTierType, prequalifySupplier } = this.props;

    const { currentTabKey } = this.state;

    const { _id, prequalifiedStatus = {}, isPrequalified, basicInfo } = companyInfo;

    const extraProps = name => ({
      companyInfo: companyInfo[name] || {},
      isQualified: prequalifiedStatus[name],
    });

    if (companyInfo.isSkippedPrequalification) {
      return this.renderSkipped({
        company,
        saveTierType,
        companyInfo,
        prequalifySupplier,
      });
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>{basicInfo.enName}</h2>

        <Prequalifier supplierId={_id} isPrequalified={isPrequalified} />

        <Tabs
          activeKey={currentTabKey}
          onTabClick={this.moveToTab}
          tabPosition="left"
          className="supplier-forms"
        >
          {this.renderPane({
            key: 1,
            title: 'Financial information',
            name: 'financialInfo',
            Component: CommonTab,
            data: {
              items: financialInfo.generateItems(),
              renderDescription: financialInfo.renderDescription,
              companyInfo,
            },
          })}

          {this.renderPane({
            key: 2,
            title: 'Business integrity & human resource',
            name: 'businessInfo',
            Component: CommonTab,
            data: {
              items: businessInfo.generateItems(),
              renderDescription: businessInfo.renderDescription,
              companyInfo,
            },
          })}

          {this.renderPane({
            key: 3,
            title: 'Environmental management',
            name: 'environmentalInfo',
            Component: CommonTab,
            data: {
              items: environmentalInfo.generateItems(),
              renderDescription: environmentalInfo.renderDescription,
              companyInfo,
            },
          })}

          {this.renderPane({
            key: 4,
            title: 'Health & safety management system',
            name: 'healthInfo',
            Component: CommonTab,
            data: {
              items: healthInfo.generateItems(),
              renderDescription: healthInfo.renderDescription,
              companyInfo,
            },
          })}

          {this.renderPane({
            key: 5,
            title: 'Select supplier tier type',
            name: 'tierType',
            Component: TierTypeTab,
            data: extraProps('tierType'),
          })}
        </Tabs>
      </div>
    );
  }
}

export default Status;
