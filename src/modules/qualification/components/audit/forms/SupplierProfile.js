import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, List } from 'antd';
import AuditFormsBase from './AuditFormsBase';

const TextArea = Input.TextArea;

class SupplierProfile extends AuditFormsBase {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save();
  }

  renderListItem(title, description) {
    return (
      <List.Item>
        <List.Item.Meta
          description={description}
          title={this.renderTooltipLabel(title)}
        />
      </List.Item>
    );
  }

  render() {
    const supplierInfo = this.props.supplierInfo || {};
    const shareholderInfo = supplierInfo.shareholderInfo || {};
    const shareholders = shareholderInfo.shareholders || {};
    const shareholder = shareholders[0] || {};
    const basicInfo = supplierInfo.basicInfo || {};
    const renderListItem = this.renderListItem;

    const { response } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Company information">
          <List style={{ marginBottom: '16px' }}>
            {renderListItem('type', '-')}
            {renderListItem('ownership', shareholder.name)}
            {renderListItem('shareholder', shareholder.name)}
            {renderListItem(
              'numberOfEmployees',
              basicInfo.totalNumberOfEmployees
            )}
            {renderListItem('otExperience', '-')}
            {renderListItem('sqaResult', '-')}
          </List>
        </Card>
        <Card title="Oyu Tolgoi LLC (OT) related performance rations">
          {this.renderField({
            label: this.renderTooltipLabel('sotri'),
            name: 'sotri',
            initialValue: response && response.sotri,
            control: <TextArea disabled={response !== undefined} />
          })}
          {this.renderField({
            label: this.renderTooltipLabel('sotie'),
            name: 'sotie',
            initialValue: response && response.sotie,
            control: <TextArea disabled={response !== undefined} />
          })}
        </Card>
        {!response ? this.renderSubmit() : ''}
      </Form>
    );
  }
}

const SupplierProfileForm = Form.create()(SupplierProfile);

export default withRouter(SupplierProfileForm);
