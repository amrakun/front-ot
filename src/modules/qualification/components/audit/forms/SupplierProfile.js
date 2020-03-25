import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Input, Card, List } from 'antd';
import AuditFormsBase from './AuditFormsBase';

const TextArea = Input.TextArea;

class SupplierProfile extends AuditFormsBase {
  constructor(props, context) {
    super(props, context);

    this.renderListItem = this.renderListItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  renderListItem(title, description) {
    return (
      <List.Item>
        <List.Item.Meta description={description} title={this.renderTooltipLabel(title)} />
      </List.Item>
    );
  }

  renderSupplierField(name) {
    const { response, data } = this.props;

    let initialValue = '';

    if (data && data.length > 0) initialValue = data[name];

    if (response) initialValue = response[name];

    return this.renderField({
      name,
      initialValue,
      label: this.renderTooltipLabel(name),
      control: <TextArea disabled={response !== undefined} />,
    });
  }

  render() {
    const { response } = this.props;
    const supplierInfo = this.props.supplierInfo || {};
    const tierType = supplierInfo.tierType || '-';
    const isQualified = supplierInfo.isQualified || {};
    const shareholderInfo = supplierInfo.shareholderInfo || {};
    const shareholders = shareholderInfo.shareholders || [];
    const owner = shareholders[0] || {};
    const basicInfo = supplierInfo.basicInfo || {};
    const renderListItem = this.renderListItem;
    const { __ } = this.context;

    const shareholdersList = shareholders.map(
      (shareholder, i) =>
        `${shareholder.name} ${(shareholder.jobTitle, shareholder.percentage)}%${
          i < shareholders.length - 1 ? ', ' : ''
        }`
    );

    let sqaResult = '-';

    if (isQualified !== null) sqaResult = isQualified ? 'Audited' : 'No';

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderIsQualifiedAlert()}

        <Card title={__('Company information')}>
          <List style={{ marginBottom: '16px' }}>
            {renderListItem('type', tierType)}
            {renderListItem('ownership', owner.name)}
            {renderListItem('shareholder', shareholdersList)}
            {renderListItem('numberOfEmployees', basicInfo.totalNumberOfEmployees)}
            {renderListItem('sqaResult', sqaResult)}
          </List>
        </Card>

        <Card title={__('Oyu Tolgoi LLC (OT) related performance rations')}>
          {this.renderSupplierField('otExperience')}
          {this.renderSupplierField('sotri')}
          {this.renderSupplierField('sotie')}
        </Card>

        {!response ? this.renderSubmit() : ''}
      </Form>
    );
  }
}

const SupplierProfileForm = Form.create()(SupplierProfile);

SupplierProfile.contextTypes = {
  __: PropTypes.func,
};

export default withRouter(SupplierProfileForm);
