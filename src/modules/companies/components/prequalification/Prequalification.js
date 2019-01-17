import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, notification, Icon, Alert } from 'antd';
import { Panes } from 'modules/common/components';
import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import SkipModal from './SkipModal';

class PrequalificationForms extends Panes {
  constructor(props, context) {
    super(props, context);

    this.state.showSkipForm = false;

    this.toggleSkipForm = this.toggleSkipForm.bind(this);
    this.skip = this.skip.bind(this);
  }

  toggleSkipForm(visible) {
    this.setState({ showSkipForm: visible });
  }

  skip(data) {
    this.props.skip(data, () => {
      this.setState({ showSkipForm: false });
    });
  }

  componentDidMount() {
    const { __ } = this.context;
    const { disabled } = this.props;

    if (disabled) {
      notification.open({
        message: __('Changes disabled'),
        description: __(`You have already submitted your
          pre-qualification form and changes are disabled.`),
        icon: <Icon type="warning" style={{ color: '#f47721' }} />,
        duration: 10
      });
    }
  }

  renderSkipModal() {
    const { showSkipForm } = this.state;

    if (!showSkipForm) {
      return null;
    }

    return (
      <SkipModal
        onCancel={() => this.toggleSkipForm(false)}
        onSubmit={this.skip}
      />
    );
  }

  render() {
    const { __ } = this.context;
    const { send, company, disabled } = this.props;
    const { currentTabKey } = this.state;

    const {
      productsInfo,
      prequalifiedStatus,
      isPrequalified,
      isSkippedPrequalification
    } = company || {};

    const basicInfo = (company || {}).basicInfo || {};

    if (isSkippedPrequalification) {
      if (isPrequalified) {
        return <Alert message={__('Pre-qualified')} type="success" showIcon />;
      }

      return (
        <Alert
          message={__('Successfully sent')}
          description={__('We are reviewing your submission')}
          type="info"
          showIcon
        />
      );
    }

    return (
      <div>
        {this.renderSkipModal()}

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
            Component: FinancialForm,
            data: {
              disabled,
              prequalifiedStatus,
              corporateStructure: basicInfo.corporateStructure,
              country: basicInfo.country,
              skip: () => this.toggleSkipForm(true)
            }
          })}

          {this.renderPane({
            key: 2,
            title: 'Business integrity & human resource',
            name: 'businessInfo',
            Component: BusinessForm,
            data: { disabled, prequalifiedStatus }
          })}

          {this.renderPane({
            key: 3,
            title: 'Environmental management',
            name: 'environmentalInfo',
            Component: EnvironmentalForm,
            data: { disabled, prequalifiedStatus }
          })}

          {this.renderPane({
            key: 4,
            title: 'Health & safety management system',
            name: 'healthInfo',
            Component: HealthForm,
            data: {
              productsInfo: productsInfo,
              send: send,
              disabled,
              prequalifiedStatus
            }
          })}
        </Tabs>
      </div>
    );
  }
}

PrequalificationForms.propTypes = {
  skip: PropTypes.func
};

PrequalificationForms.contextTypes = {
  __: PropTypes.func
};

export default PrequalificationForms;
