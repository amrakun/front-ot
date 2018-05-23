/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { labels } from 'modules/companies/components/prequalification/constants';
import { Card, Popconfirm, Checkbox, List, Form, Alert } from 'antd';
import { BaseForm } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    const { supplierInputs } = props.statusData;

    this.items = this.createItems(supplierInputs);

    this.state = {
      checkAll: false
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
    const items = [];

    if (Array.isArray(data)) {
      data.forEach(data => items.push(this.createItems(data)));
    } else {
      Object.keys(data).forEach(name => {
        const value = this.createItem(name, data[name]);
        value &&
          items.push({
            name: name,
            value: value
          });
      });
    }

    return items;
  }

  createItem(name, value) {
    if (value === null || name === '__typename' || value.length < 1)
      return null;

    if (typeof value === 'boolean') return value ? 'Yes' : 'No';

    if (value.url) return <a href={value.url}>{value.name}</a>;

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

    if (moment(value).isValid() && value.length > 16)
      return moment(value).format(dateFormat);

    return value;
  }

  renderItem(item) {
    const name = item.name;
    const checked = this.props.data[name];

    return (
      <List.Item>
        <List.Item.Meta
          title={labels[name] ? labels[name] : 'File for above'}
          description={item.value}
        />
        {this.renderField({
          name: name,
          hasFeedback: false,
          optional: true,
          initialValue: checked,
          control: (
            <Checkbox
              style={{ minWidth: '80px', marginLeft: '24px' }}
              disabled={this.viewMode}
            >
              Qualified
            </Checkbox>
          )
        })}
      </List.Item>
    );
  }

  render() {
    const { title, statusData, prequalifySupplier } = this.props;
    const { checkAll } = this.state;
    const { enName, isPrequalified, tabQualified } = statusData;

    return (
      <Form>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>{enName}</h2>

        {isPrequalified && (
          <Alert
            message="This supplier is pre-qualified"
            type="success"
            showIcon
          />
        )}

        <Alert
          message={`${title} is ${
            tabQualified ? 'qualified' : 'not qualified'
          }`}
          className="margin"
          type={tabQualified ? 'success' : 'error'}
          style={{ marginBottom: '16px' }}
          showIcon
        />

        {isPrequalified === false && (
          <Alert
            message={
              <span>
                This supplier is not pre-qualfied. Click&nbsp;
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => prequalifySupplier(true)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>here</a>
                </Popconfirm>
                &nbsp;to pre-qualify
              </span>
            }
            type="error"
            showIcon
          />
        )}

        {isPrequalified === null && (
          <Alert
            message={
              <span>
                This supplier is not evaluated. Click&nbsp;
                <Popconfirm
                  title="Evaluation"
                  onConfirm={() => prequalifySupplier(true)}
                  onCancel={() => prequalifySupplier(false)}
                  okText="Qualified"
                  cancelText="Unqualified"
                >
                  <a>here</a>
                </Popconfirm>
                &nbsp;to evaluate
              </span>
            }
            type="warning"
            showIcon
          />
        )}

        <p style={{ height: '8px' }} />
        <Card
          title={title}
          bodyStyle={{ paddingBottom: '24px' }}
          extra={
            <Checkbox
              checked={checkAll}
              onChange={this.handleCheckAll}
              disabled={this.viewMode}
            >
              Check all
            </Checkbox>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={this.items}
            renderItem={this.renderItem}
          />
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
  prequalifySupplier: PropTypes.func
};

const StatusTabForm = Form.create()(StatusTab);

export default withRouter(StatusTabForm);
