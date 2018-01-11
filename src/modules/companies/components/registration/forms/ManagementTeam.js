import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Button, Icon } from 'antd';
import Field from 'modules/common/components/Field';
import BaseForm from 'modules/common/components/BaseForm';
import { labels } from '../constants';

const groups = [
  'managingDirector',
  'executiveOfficer',
  'salesDirector',
  'financialDirector',
  'otherMember1',
  'otherMember2',
  'otherMember3'
];

class ManagementTeam extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyAbove = this.copyAbove.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const doc = {};

    const { getFieldValue } = this.props.form;

    groups.forEach(group => {
      doc[group] = {};

      doc[group].name = getFieldValue(`${group}Name`);
      doc[group].jobTitle = getFieldValue(`${group}JobTitle`);
      doc[group].phone = getFieldValue(`${group}Phone`);
      doc[group].email = getFieldValue(`${group}Email`);
    });

    return this.saveDirect(doc);
  }

  copyAbove(prefix) {
    const { getFieldValue, setFieldsValue } = this.props.form;

    const group = groups[groups.indexOf(prefix) - 1];
    let values = {};

    values[`${prefix}Name`] = getFieldValue(`${group}Name`);
    values[`${prefix}JobTitle`] = getFieldValue(`${group}JobTitle`);
    values[`${prefix}Phone`] = getFieldValue(`${group}Phone`);
    values[`${prefix}Email`] = getFieldValue(`${group}Email`);

    setFieldsValue(values);
  }

  renderItem(prefix, optional = false) {
    const data = this.props.data[prefix] || {};

    return (
      <Card
        title={labels[prefix]}
        extra={
          prefix !== 'managingDirector' ? (
            <Button onClick={() => this.copyAbove(prefix)}>
              <Icon type="copy" />Copy above
            </Button>
          ) : (
            ''
          )
        }
      >
        <Field
          label="Full name"
          name={`${prefix}Name`}
          initialValue={data.name}
          optional={optional}
          control={<Input placeholder="First name + Last name" />}
        />

        <Field
          label="Job title"
          name={`${prefix}JobTitle`}
          initialValue={data.jobTitle}
          optional={optional}
          control={<Input />}
        />

        <Field
          label="Phone"
          name={`${prefix}Phone`}
          initialValue={data.phone}
          optional={optional}
          control={<Input type="number" />}
        />

        <Field
          label="E-mail"
          name={`${prefix}Email`}
          validation="email"
          initialValue={data.email}
          optional={optional}
          control={<Input />}
        />
      </Card>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderItem('managingDirector')}
        {this.renderItem('executiveOfficer')}
        {this.renderItem('salesDirector')}
        {this.renderItem('financialDirector')}

        {this.renderItem('otherMember1', true)}
        {this.renderItem('otherMember2', true)}
        {this.renderItem('otherMember3', true)}
        {this.renderSubmit()}
      </Form>
    );
  }
}

const ManagementTeamForm = Form.create()(ManagementTeam);

export default withRouter(ManagementTeamForm);
