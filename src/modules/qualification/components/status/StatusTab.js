import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { labels } from 'modules/companies/prequalification/constants';
import { Card, Checkbox, List, Form } from 'antd';
import { BaseForm } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class StatusTab extends BaseForm {
  constructor(props) {
    super(props);

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
    return (
      <List.Item>
        <List.Item.Meta
          title={labels[name] ? labels[name] : 'File for above'}
          description={item.value}
        />
        {this.renderField({
          name: `${name}Qualified`,
          hasFeedback: false,
          optional: true,
          control: (
            <Checkbox style={{ minWidth: '80px', marginLeft: '24px' }}>
              Qualified
            </Checkbox>
          )
        })}
      </List.Item>
    );
  }

  render() {
    const { data, title } = this.props;

    const items = this.createItems(data);

    return (
      <Form>
        <Card title={title} bodyStyle={{ paddingBottom: '24px' }}>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={this.renderItem}
          />
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

StatusTab.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  previousTab: PropTypes.func
};

const StatusTabForm = Form.create()(StatusTab);

export default withRouter(StatusTabForm);
