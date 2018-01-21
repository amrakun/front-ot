import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Radio, Form, Alert, List } from 'antd';
import { BaseForm } from 'modules/common/components';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    const { statusData, data } = this.props;

    const {
      registeredInCountry,
      registeredInAimag,
      totalNumberOfEmployees,
      totalNumberOfMongolianEmployees
    } = statusData;

    // mongolian employee's percentage
    let mep = 0;

    if (totalNumberOfEmployees && totalNumberOfMongolianEmployees) {
      mep = totalNumberOfMongolianEmployees * 100 / totalNumberOfEmployees;
    }

    // calculate tier type ==============
    let suggestedType = 'tier3';

    if (registeredInCountry === 'Mongolia') {
      suggestedType = 'national';

      if (registeredInAimag === 'Omnogovi') {
        suggestedType = 'umnugobi';
      }

      if (mep >= 75 && mep <= 100) {
        suggestedType = 'tier1';
      }

      if (mep < 75) {
        suggestedType = 'tier2';
      }
    }

    this.state = {
      value: data || suggestedType
    };

    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  save() {
    this.props.saveTierType(this.state.value);
  }

  render() {
    const { title, statusData } = this.props;
    const { value } = this.state;
    const {
      enName,
      isPrequalified,
      registeredInCountry,
      registeredInAimag,
      foreignOwnershipPercentage
    } = statusData;

    const infoList = [
      {
        title: 'Registered country',
        description: registeredInCountry
      },
      {
        title: 'Registered aimag',
        description: registeredInAimag
      },
      {
        title: 'Foreign ownership percentage',
        description: foreignOwnershipPercentage
      },
      {
        title: 'Suggested tier type',
        description: <strong>{value}</strong>
      }
    ];

    return (
      <Form>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>{enName}</h2>

        {isPrequalified ? (
          <Alert
            message="This supplier is pre-qualified"
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message="This supplier is not pre-qualified"
            type="warning"
            showIcon
          />
        )}

        <p style={{ height: '8px' }} />

        <Card title={title} bodyStyle={{ paddingBottom: '24px' }}>
          <List
            key={0}
            itemLayout="horizontal"
            dataSource={infoList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />

          <Radio.Group
            onChange={this.onChange}
            value={this.state.value}
            className="radio-vertical margin"
          >
            <Radio value="national">National supplier</Radio>
            <Radio value="umnugobi">Umnugobi supplier</Radio>
            <Radio value="tier1">International Tier 1 supplier</Radio>
            <Radio value="tier2">International Tier 2 supplier</Radio>
            <Radio value="tier3">International Tier 3 supplier</Radio>
          </Radio.Group>
        </Card>

        {!this.viewMode && (
          <div>
            {this.renderGoBack()}
            {this.renderSubmit('Save & submit', this.save)}
          </div>
        )}
      </Form>
    );
  }
}

StatusTab.propTypes = {
  title: PropTypes.string,
  saveTierType: PropTypes.func
};

const StatusTabForm = Form.create()(StatusTab);

export default withRouter(StatusTabForm);
