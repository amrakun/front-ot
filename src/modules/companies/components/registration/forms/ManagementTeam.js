import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Button, Icon } from 'antd';
import Field from 'modules/common/components/Field';
import BaseForm from 'modules/common/components/BaseForm';
import { labels } from '../constants';

class ManagementTeam extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyAbove = this.copyAbove.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const groups = [
      'managingDirector',
      'executiveOfficer',
      'salesDirector',
      'financialDirector',
      'otherMember1',
      'otherMember2',
      'otherMember3'
    ];

    const doc = {};

    const { getFieldValue } = this.props.form;

    groups.forEach(group => {
      doc[group] = {};

      doc[group].name = getFieldValue(`${group}Name`);
      doc[group].jobTitle = getFieldValue(`${group}JobTitle`);
      doc[group].phone = getFieldValue(`${group}Phone`);
      doc[group].email = getFieldValue(`${group}Email`);
    });

    return this.props.save(doc);
  }

  copyAbove() {
    const { getFieldValue } = this.props.form;

    console.log(getFieldValue('managingDirectorName'));
  }

  renderItem(prefix, optional = false) {
    const data = this.props.data[prefix] || {};

    return (
      <Card
        title={labels[prefix]}
        extra={
          <Button onClick={this.copyAbove}>
            <Icon type="copy" />Copy above
          </Button>
        }
      >
        <Field
          label="Name"
          name={`${prefix}Name`}
          initialValue={data.name}
          optional={optional}
          control={<Input placeholder="Title. First name + Last name" />}
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
          control={<Input />}
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
