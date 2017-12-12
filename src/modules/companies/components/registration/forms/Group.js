import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Upload, Select } from 'antd';
import {
  booleanData,
  groupTypeData,
  countryData,
  groupLabels
} from '../constants';
import { BaseForm } from 'modules/common/components';

class DynamicFieldSet extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      hasParent: false
    };
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const roleOptions = this.renderOptions(groupTypeData);
    const countryOptions = this.renderOptions(countryData);

    const { hasParent } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <label>{groupLabels.head}</label>
        {this.renderField({
          name: 'hasParent',
          label: groupLabels.hasParent,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'parentAddress',
          label: groupLabels.parentAddress,
          isVisible: hasParent,
          optional: !hasParent,
          control: <Input />
        })}

        {this.renderField({
          name: 'parentRegistrationNumber',
          label: groupLabels.parentRegistrationNumber,
          isVisible: hasParent,
          optional: !hasParent,
          control: <Input />
        })}

        {this.renderField({
          name: 'role',
          label: groupLabels.role,
          control: <Select>{roleOptions}</Select>
        })}

        {this.renderField({
          name: 'isExclusiveDistributor',
          label: groupLabels.isExclusiveDistributor,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'primaryManufacturerName',
          label: groupLabels.primaryManufacturerName,
          control: <Input />
        })}

        {this.renderField({
          name: 'countryOfPrimaryManufacturer',
          label: groupLabels.countryOfPrimaryManufacturer,
          control: <Select>{countryOptions}</Select>
        })}
      </Form>
    );
  }
}

const GroupForm = Form.create()(DynamicFieldSet);

export default withRouter(GroupForm);
