/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import { Card, Form, Alert, Button, Icon, List, Checkbox } from 'antd';
import { labels } from 'modules/companies/components/prequalification/constants';

class CommonTab extends React.Component {
  constructor(props) {
    super(props);

    const { items, data } = props;

    const checkboxValues = {};
    let checkAll = true;

    for (const item of items) {
      checkboxValues[item] = data[item];

      if (!data[item]) {
        checkAll = false;
      }
    }

    this.state = {
      checkAll,
      checkboxValues,
    };

    this.renderItem = this.renderItem.bind(this);
    this.nextTab = this.nextTab.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  handleCheckAll(e) {
    const { items } = this.props;
    const isChecked = e.target.checked;

    const checkboxValues = {};

    for (const item of items) {
      checkboxValues[item] = isChecked;
    }

    this.setState({ checkAll: isChecked, checkboxValues });
  }

  onCheckChange(item, e) {
    const { checkboxValues } = this.state;

    checkboxValues[item] = e.target.checked;

    this.setState({ checkboxValues });
  }

  nextTab() {
    const { nextTab, save } = this.props;
    const { checkboxValues } = this.state;

    save(checkboxValues);
    nextTab();
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
    const { checkboxValues } = this.state;
    const { renderDescription, data, companyInfo } = this.props;

    const description = renderDescription({ item, companyInfo, data });

    return (
      <List.Item>
        <List.Item.Meta style={{ maxWidth: 450 }} title={labels[item]} description={description} />

        <Form.Item>
          <Checkbox
            style={{ minWidth: '80px', marginLeft: '24px' }}
            checked={checkboxValues[item]}
            onChange={this.onCheckChange.bind(this, item)}
          >
            Qualified
          </Checkbox>
        </Form.Item>
      </List.Item>
    );
  }

  render() {
    const { checkAll } = this.state;
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

        <Card
          title={title}
          bodyStyle={{ paddingBottom: '24px' }}
          extra={
            <Checkbox checked={checkAll} onChange={this.handleCheckAll}>
              Check all
            </Checkbox>
          }
        >
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

export default CommonTab;
