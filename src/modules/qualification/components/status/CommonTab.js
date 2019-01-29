/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import { Card, Form, Alert, Button, Icon, List, Checkbox } from 'antd';
import { labels } from 'modules/companies/components/prequalification/constants';

class CommonTab extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.nextTab = this.nextTab.bind(this);
  }

  nextTab() {
    const { nextTab, save, form } = this.props;

    form.validateFields((err, values) => {
      save(values);

      nextTab();
    });
  }

  renderNextButton() {
    return (
      <Button
        style={{ float: 'right', marginLeft: '8px' }}
        type="primary"
        htmlType="submit"
        onClick={this.nextTab}
      >
        Save & continue
        <Icon type="right" />
      </Button>
    );
  }

  renderPrevButton() {
    return (
      <Button onClick={this.props.previousTab}>
        <Icon type="left" /> Back
      </Button>
    );
  }

  renderItem(item) {
    const { renderDescription, form, data, companyInfo } = this.props;
    const { getFieldDecorator } = form;

    return (
      <List.Item>
        <List.Item.Meta
          style={{ maxWidth: 450 }}
          title={labels[item]}
          description={renderDescription({ item, companyInfo })}
        />

        <Form.Item>
          {getFieldDecorator(item, {
            initialValue: data[item],
          })(
            <Checkbox style={{ minWidth: '80px', marginLeft: '24px' }} defaultChecked={data[item]}>
              Qualified
            </Checkbox>
          )}
        </Form.Item>
      </List.Item>
    );
  }

  render() {
    const { title, isQualified, items } = this.props;

    return (
      <Form>
        <Alert
          message={`${title} is ${isQualified ? 'qualified' : 'not qualified'}`}
          className="margin"
          type={isQualified ? 'success' : 'error'}
          style={{ marginBottom: '16px' }}
          showIcon
        />

        <p style={{ height: '8px' }} />

        <Card title={title} bodyStyle={{ paddingBottom: '24px' }}>
          <List itemLayout="horizontal" dataSource={items} renderItem={this.renderItem} />
        </Card>

        <div>
          {this.renderPrevButton()}
          {this.renderNextButton()}
        </div>
      </Form>
    );
  }
}

export default Form.create()(CommonTab);
