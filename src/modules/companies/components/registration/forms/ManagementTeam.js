import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Row, Col } from 'antd';
import Field from 'modules/common/components/Field';
import BaseForm from 'modules/common/components/BaseForm';

class ManagementTeam extends BaseForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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

  renderItem(prefix) {
    const data = this.props.data[prefix] || {};

    return (
      <div>
        <Field
          label="Name"
          name={`${prefix}Name`}
          initialValue={data.name}
          control={<Input placeholder="Title. First name + Last name" />}
        />

        <Field
          label="Job title"
          name={`${prefix}JobTitle`}
          initialValue={data.jobTitle}
          control={<Input />}
        />

        <Field
          label="Phone"
          name={`${prefix}Phone`}
          initialValue={data.phone}
          control={<Input />}
        />

        <Field
          label="E-mail"
          name={`${prefix}Email`}
          validation="email"
          initialValue={data.email}
          control={<Input />}
        />
      </div>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={24} sm={12}>
            <label>15. Managing director</label>
            {this.renderItem('managingDirector')}
            <label>16. Executive officer</label>
            {this.renderItem('executiveOfficer')}
            <label>17. Sales director</label>
            {this.renderItem('salesDirector')}
            <label>18. Financial director</label>
            {this.renderItem('financialDirector')}
          </Col>
          <Col xs={24} sm={12}>
            <label>19. Other management team member</label>
            {this.renderItem('otherMember1')}
            <label>Other management team member 2</label>
            {this.renderItem('otherMember2')}
            <label>Other management team member 3</label>
            {this.renderItem('otherMember3')}
          </Col>
        </Row>

        {this.renderSubmit()}
      </Form>
    );
  }
}

const ManagementTeamForm = Form.create()(ManagementTeam);

export default withRouter(ManagementTeamForm);
