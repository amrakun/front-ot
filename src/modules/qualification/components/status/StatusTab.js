import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { labels } from 'modules/companies/components/prequalification/constants';
import { Card, Checkbox, List, Form, Alert } from 'antd';
import { BaseForm } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

    this.viewMode = props.location.search === '?view';

    this.renderItem = this.renderItem.bind(this);
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

    if (moment(value).isValid()) return moment(value).format(dateFormat);

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
          control: (
            <Checkbox
              style={{ minWidth: '80px', marginLeft: '24px' }}
              defaultChecked={checked}
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
    const { title, statusData } = this.props;
    const { supplierInputs, enName, isPrequalified } = statusData;

    const items = this.createItems(supplierInputs);

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
          <List
            itemLayout="horizontal"
            dataSource={items}
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
  title: PropTypes.string
};

const StatusTabForm = Form.create()(StatusTab);

export default withRouter(StatusTabForm);
