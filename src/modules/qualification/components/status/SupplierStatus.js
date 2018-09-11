import React from 'react';
import { Tabs, Button, Alert } from 'antd';
import { Panes } from 'modules/common/components';
import StatusTab from './StatusTab';
import TierTypeTab from './TierTypeTab';
import TierTypeForm from './TierTypeForm';

class Status extends Panes {
  renderSkipped({ company, saveTierType, supplierInputs, prequalifySupplier }) {
    return (
      <div>
        <Alert
          style={{ marginBottom: '30px' }}
          message="This supplier is skipped prequalification"
          description={supplierInputs.prequalificationSkippedReason}
          type="warning"
          showIcon
        />

        <TierTypeForm
          title={'Select supplier tier type'}
          initialValue={company.tierType}
          saveTierType={saveTierType}
          companyInfo={{
            ...supplierInputs.basicInfo,
            isPrequalified: supplierInputs.isPrequalified,
            isSentPrequalificationInfo:
              supplierInputs.isSentPrequalificationInfo
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
    const {
      company,
      supplierInputs = {},
      saveTierType,
      prequalifySupplier,
      enableSupplierForm
    } = this.props;

    const { currentTabKey } = this.state;

    const prequalifiedStatus = supplierInputs.prequalifiedStatus || {};
    const isPrequalified = supplierInputs.isPrequalified;

    const extraProps = name => ({
      statusData: {
        ...supplierInputs.basicInfo,
        isPrequalified,
        isSentPrequalificationInfo: supplierInputs.isSentPrequalificationInfo,
        supplierInputs: supplierInputs[name] || {},
        tabQualified: prequalifiedStatus[name]
      },
      prequalifySupplier,
      enableSupplierForm,
      saveTierType
    });

    if (supplierInputs.isSkippedPrequalification) {
      return this.renderSkipped({
        company,
        saveTierType,
        supplierInputs,
        prequalifySupplier
      });
    }

    return (
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
          Component: StatusTab,
          data: extraProps('financialInfo')
        })}

        {this.renderPane({
          key: 2,
          title: 'Business integrity & human resource',
          name: 'businessInfo',
          Component: StatusTab,
          data: extraProps('businessInfo')
        })}

        {this.renderPane({
          key: 3,
          title: 'Environmental management',
          name: 'environmentalInfo',
          Component: StatusTab,
          data: extraProps('environmentalInfo')
        })}

        {this.renderPane({
          key: 4,
          title: 'Health & safety management system',
          name: 'healthInfo',
          Component: StatusTab,
          data: extraProps('healthInfo')
        })}

        {this.renderPane({
          key: 5,
          title: 'Select supplier tier type',
          name: 'tierType',
          Component: TierTypeTab,
          data: extraProps('tierType')
        })}
      </Tabs>
    );
  }
}

export default Status;
