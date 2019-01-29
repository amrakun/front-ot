/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Checkbox, List, Form, Alert } from 'antd';
import { BaseForm } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import { labels } from 'modules/companies/components/prequalification/constants';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    const { supplierInputs } = props;

    this.items = this.createItems(supplierInputs);

    this.state = {
      checkAll: false,
    };

    this.renderItem = this.renderItem.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  handleCheckAll(e) {
    const { setFieldsValue } = this.props.form;
    const value = e.target.checked;
    const values = {};

    this.items.forEach(item => (values[item.name] = value));

    this.setState({ checkAll: value });

    setFieldsValue(values);
  }

  createItems(data) {
    if (Array.isArray(data)) {
      return data.map(item => this.createItems(item));
    }

    const items = [];

    Object.keys(data).forEach(name => {
      const value = this.createItem(name, data[name]);

      value &&
        items.push({
          name: name,
          value: value,
        });
    });

    return items;
  }

  createItem(name, value) {
    if (value === null || name === '__typename' || value.length < 1) return null;

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (value.url) {
      return (
        <a href={readFileUrl(value.url)} target="__blank">
          {value.name}
        </a>
      );
    }

    if (typeof value === 'object') {
      return this.createItems(value).map(item => {
        return Object.keys(item).map(key => {
          return (
            <div key={key}>
              {item[key].name}: {item[key].value}
            </div>
          );
        });
      });
    }

    if (moment(new Date(value)).isValid() && value.length > 16)
      return moment(new Date(value)).format(dateFormat);

    return value;
  }

  renderItem(item) {
    const name = item.name;
    const checked = this.props.data[name];

    return (
      <List.Item>
        <List.Item.Meta title={labels[name]} description={item.value} />
        {this.renderField({
          name: name,
          hasFeedback: false,
          optional: true,
          initialValue: checked,
          control: (
            <Checkbox style={{ minWidth: '80px', marginLeft: '24px' }} disabled={this.viewMode}>
              Qualified
            </Checkbox>
          ),
        })}
      </List.Item>
    );
  }

  render() {
    const { title, tabQualified } = this.props;
    const { checkAll } = this.state;

    return (
      <Form>
        <Alert
          message={`${title} is ${tabQualified ? 'qualified' : 'not qualified'}`}
          className="margin"
          type={tabQualified ? 'success' : 'error'}
          style={{ marginBottom: '16px' }}
          showIcon
        />

        <p style={{ height: '8px' }} />
        <Card
          title={title}
          bodyStyle={{ paddingBottom: '24px' }}
          extra={
            <Checkbox checked={checkAll} onChange={this.handleCheckAll} disabled={this.viewMode}>
              Check all
            </Checkbox>
          }
        >
          <List itemLayout="horizontal" dataSource={this.items} renderItem={this.renderItem} />
        </Card>

        {!this.viewMode && (
          <div>
            {this.renderGoBack()} {this.renderSubmit()}
          </div>
        )}
      </Form>
    );
  }
}

StatusTab.propTypes = {
  title: PropTypes.string,
};

const StatusTabForm = Form.create()(StatusTab);

export default withRouter(StatusTabForm);
