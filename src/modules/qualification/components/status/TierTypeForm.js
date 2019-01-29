import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Radio, Form, List } from 'antd';

class TierTypeForm extends React.Component {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    const { companyInfo, initialValue } = this.props;

    const {
      registeredInCountry,
      registeredInAimag,
      totalNumberOfEmployees,
      totalNumberOfMongolianEmployees,
    } = companyInfo.basicInfo || {};

    // mongolian employee's percentage
    let mep = 0;

    if (totalNumberOfEmployees && totalNumberOfMongolianEmployees) {
      mep = (totalNumberOfMongolianEmployees * 100) / totalNumberOfEmployees;
    }

    // calculate tier type ==============
    let suggestedType = 'tier3';

    if (registeredInCountry === 'Mongolia') {
      suggestedType = 'national';

      if (registeredInAimag === 'Umnugovi') {
        suggestedType = 'umnugovi';
      }

      if (mep >= 75 && mep <= 100) {
        suggestedType = 'tier1';
      }

      if (mep < 75) {
        suggestedType = 'tier2';
      }
    }

    this.mep = mep;
    this.suggestedType = suggestedType;

    this.state = {
      value: initialValue || suggestedType,
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
    const { title, companyInfo, renderButtons } = this.props;

    const { value } = this.state;

    const { enName, registeredInCountry, registeredInAimag } = companyInfo.basicInfo || {};

    const infoList = [
      {
        title: 'Registered country',
        description: registeredInCountry,
      },
      {
        title: 'Registered aimag',
        description: registeredInAimag,
      },
      {
        title: 'Mongolian employees percentage',
        description: `${this.mep}%`,
      },
      {
        title: 'Suggested tier type',
        description: this.suggestedType,
      },
    ];

    return (
      <Form>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>{enName}</h2>

        <p style={{ height: '8px' }} />

        <Card title={title} bodyStyle={{ paddingBottom: '24px' }}>
          <List
            itemLayout="horizontal"
            dataSource={infoList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />

          <Radio.Group onChange={this.onChange} value={value} className="radio-vertical margin">
            <Radio value="national">National supplier</Radio>
            <Radio value="umnugovi">Umnugovi supplier</Radio>
            <Radio value="tier1">International Tier 1 supplier</Radio>
            <Radio value="tier2">International Tier 2 supplier</Radio>
            <Radio value="tier3">International Tier 3 supplier</Radio>
          </Radio.Group>
        </Card>

        {!this.viewMode && renderButtons(this.save)}
      </Form>
    );
  }
}

TierTypeForm.propTypes = {
  title: PropTypes.string,
  initialValue: PropTypes.string,
  location: PropTypes.object,
  companyInfo: PropTypes.object,
  renderButtons: PropTypes.func,
  saveTierType: PropTypes.func,
};

export default withRouter(TierTypeForm);
