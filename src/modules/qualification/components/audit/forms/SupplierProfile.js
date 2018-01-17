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
    const { basicInfo, shareholderInfo } = supplierInfo || {};
    const renderListItem = this.renderListItem;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title="Company information">
          <List style={{ marginBottom: '16px' }}>
            {renderListItem('type', '-')}
            {renderListItem('ownership', shareholderInfo.shareholders[0].name)}
            {renderListItem(
              'shareholder',
              shareholderInfo.shareholders[0].name
            )}
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
            control: <TextArea />
          })}
          {this.renderField({
            label: this.renderTooltipLabel('sotie'),
            name: 'sotie',
            control: <TextArea />
          })}
        </Card>
        {this.renderSubmit()}
      </Form>
    );
  }
}

const SupplierProfileForm = Form.create()(SupplierProfile);

export default withRouter(SupplierProfileForm);
