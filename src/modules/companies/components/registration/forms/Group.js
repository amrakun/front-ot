import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Upload, Select, Row, Col } from 'antd';
import { booleanData, roleData, countryData, groupLabels } from '../constants';
import { BaseForm, Field } from 'modules/common/components';

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      hasParent: false,
      role: '',
      isExclusiveDistributor: false
    };

    this.onHasParentChange = this.onHasParentChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onIsExcChange = this.onIsExcChange.bind(this);
  }

  onHasParentChange(value) {
    this.setState({ hasParent: value === 'true' });
  }

  onRoleChange(value) {
    this.setState({ role: value });
  }

  onIsExcChange(value) {
    this.setState({ isExclusiveDistributor: value === 'true' });
  }

  renderUpload(index) {
    const { isExclusiveDistributor } = this.state;

    return (
      <Row className={isExclusiveDistributor ? '' : 'hidden'}>
        <Col span={12}>
          <Field name={`distributionRightName${index}`} control={<Input />} />
        </Col>
        <Col span={12}>
          <Field
            name={`distributionRight${index}`}
            initialValue="/path"
            control={
              <Upload
                name="certificateOfRegistration"
                action="/upload.do"
                listType="picture"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            }
          />
        </Col>
      </Row>
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const roleOptions = this.renderOptions(roleData);
    const countryOptions = this.renderOptions(countryData);

    const { hasParent, role } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <label>{groupLabels.head}</label>
        {this.renderField({
          name: 'hasParent',
          label: groupLabels.hasParent,
          dataType: 'boolean',
          control: (
            <Select onChange={this.onHasParentChange}>{booleanOptions}</Select>
          )
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
          control: <Select onChange={this.onRoleChange}>{roleOptions}</Select>
        })}

        {this.renderField({
          name: 'isExclusiveDistributor',
          label: groupLabels.isExclusiveDistributor,
          dataType: 'boolean',
          isVisible: role === 'Stockist' || role === 'Distrubotor',
          control: (
            <Select onChange={this.onIsExcChange}>{booleanOptions}</Select>
          )
        })}

        {this.renderUpload(0)}
        {this.renderUpload(1)}
        {this.renderUpload(2)}

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

const GroupForm = Form.create()(RegistrationForm);

export default withRouter(GroupForm);
