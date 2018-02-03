import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Card, Button, Icon } from 'antd';
import Field from 'modules/common/components/Field';
import { BaseForm, commonMessages } from 'modules/common/components';
import { labels } from '../constants';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const groups = [
  'managingDirector',
  'executiveOfficer',
  'salesDirector',
  'financialDirector',
  'otherMember1',
  'otherMember2',
  'otherMember3'
];

const messages = defineMessages({
  ...commonMessages,
  managingDirector: {
    id: 'managingDirector',
    defaultMessage: '15. Managing director'
  },
  executiveOfficer: {
    id: 'executiveOfficer',
    defaultMessage: '16. Executive officer'
  },
  salesDirector: {
    id: 'salesDirector',
    defaultMessage: '17. Sales director'
  },
  financialDirector: {
    id: 'financialDirector',
    defaultMessage: '18. Financial director'
  },
  otherMember1: {
    id: 'otherMember1',
    defaultMessage: '19. Other management team member'
  },
  otherMember2: {
    id: 'otherMember2',
    defaultMessage: '20. Other management team member 2'
  },
  otherMember3: {
    id: 'otherMember3',
    defaultMessage: '21. Other management team member 3'
  },
  copy: {
    id: 'copyAbove',
    defaultMessage: 'Copy above'
  }
});

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
    const { formatMessage } = this.props.intl;

    return (
      <Card
        title={formatMessage(messages[prefix])}
        extra={
          prefix !== 'managingDirector' ? (
            <Button onClick={() => this.copyAbove(prefix)}>
              <Icon type="copy" />
              {formatMessage(messages.copy)}
            </Button>
          ) : (
            ''
          )
        }
      >
        <Field
          label="Full name"
          name={`${prefix}Name`}
          prefix={prefix}
          initialValue={data.name}
          optional={optional}
          control={
            <Input placeholder={formatMessage(messages.placeholderFullName)} />
          }
        />

        <Field
          label="Job title"
          name={`${prefix}JobTitle`}
          prefix={prefix}
          initialValue={data.jobTitle || labels[prefix]}
          optional={optional}
          control={<Input />}
        />

        <Field
          label="Phone"
          name={`${prefix}Phone`}
          prefix={prefix}
          initialValue={data.phone}
          optional={optional}
          control={<Input type="number" />}
        />

        <Field
          label="E-mail"
          name={`${prefix}Email`}
          prefix={prefix}
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

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

ManagementTeam.propTypes = {
  intl: intlShape.isRequired
};

const ManagementTeamForm = Form.create()(ManagementTeam);

export default injectIntl(withRouter(ManagementTeamForm));
