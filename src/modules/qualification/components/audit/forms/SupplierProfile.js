import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, List } from 'antd';
import BaseForm from 'modules/common/components/BaseForm';
import { labels } from './constants';

const TextArea = Input.TextArea;

class SupplierProfile extends BaseForm {
  renderListItem(title, description) {
    return (
      <List.Item>
        <List.Item.Meta title={title} description={description} />
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
            {renderListItem('Supplier tier type', '-')}
            {renderListItem('Ownership', shareholderInfo.shareholders[0].name)}
            {renderListItem(
              'Shareholder',
              shareholderInfo.shareholders[0].name
            )}
            {renderListItem(
              'Total number of employees',
              basicInfo.totalNumberOfEmployees
            )}
            {renderListItem('OT experience', '-')}
            {renderListItem('Previous SQA result', '-')}
          </List>
        </Card>
        <Card title="Oyu Tolgoi LLC (OT) related performance rations">
          {this.renderField({
            label: labels.sotri,
            name: 'sotri',
            control: <TextArea />
          })}
          {this.renderField({
            label: labels.sotie,
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
