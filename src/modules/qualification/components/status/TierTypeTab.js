import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Radio, Form, Alert } from 'antd';
import { BaseForm } from 'modules/common/components';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    this.state = {
      value: ''
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
    const { enName, isPrequalified } = statusData;

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
          <Radio.Group
            onChange={this.onChange}
            value={this.state.value}
            className="radio-vertical"
          >
            <Radio value="national">National supplier</Radio>
            <Radio value="umnugobi">Umnugobi supplier</Radio>
            <Radio value="tier1">Tier 1 supplier</Radio>
            <Radio value="tier2">Tier 2 supplier</Radio>
            <Radio value="tier3">Tier 3 supplier</Radio>
          </Radio.Group>
        </Card>

        {!this.viewMode && (
          <div>
            {this.renderGoBack()}
            {this.renderSubmit('Save', this.save)}
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
