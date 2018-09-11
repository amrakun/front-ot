import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Select, Row, Col, Card } from 'antd';
import { booleanData, countryData, groupLabels } from '../constants';
import { BaseForm, Field, Uploader } from 'modules/common/components';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasParent: data.hasParent || false,
      role: data.role || [],
      isExclusiveDistributor: data.isExclusiveDistributor || false,
      isParentExistingSup: data.isParentExistingSup || false,
      factories: (data.factories || ['']).map(f => ({
        _id: Math.random(),
        ...f
      })),
      distributionRights: data.authorizedDistributions || ['']
    };

    this.onHasParentChange = this.onHasParentChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onIsExcChange = this.onIsExcChange.bind(this);
    this.addFactory = this.addFactory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onParentExists = this.onParentExists.bind(this);
    this.addRightName = this.addRightName.bind(this);
  }

  onHasParentChange(value) {
    this.setState({ hasParent: value === 'true' });
  }

  onRoleChange(value) {
    let updatedValue = value;

    if (value.includes('None')) {
      updatedValue = ['None'];
    }

    this.setState({ role: updatedValue });
  }

  onIsExcChange(value) {
    this.setState({ isExclusiveDistributor: value === 'true' });
  }

  onParentExists(value) {
    this.setState({ isParentExistingSup: value === 'true' });
  }

  addFactory() {
    const { factories } = this.state;

    factories.push({
      _id: Math.random(),
      name: '',
      townOrCity: '',
      country: '',
      productCodes: []
    });

    this.setState({ factories });
  }

  addRightName() {
    const { distributionRights } = this.state;

    distributionRights.push('');

    this.setState({ distributionRights });
  }

  handleSubmit(e) {
    e.preventDefault();

    const factories = [];
    const authorizedDistributions = [];

    this.state.factories.forEach(factory => {
      const _id = factory._id;

      factories.push({
        name: this.getFieldValue(`name${_id}`),
        townOrCity: this.getFieldValue(`townOrCity${_id}`),
        country: this.getFieldValue(`country${_id}`),
        productCodes: this.getFieldValue(`productCodes${_id}`)
      });
    });

    if (this.state.isExclusiveDistributor) {
      this.state.distributionRights.forEach((right, index) => {
        authorizedDistributions.push(
          this.getFieldValue(`distributionRightName${index}`)
        );
      });
    }

    this.save({ factories, authorizedDistributions });
  }

  renderFactory(factory, index) {
    const _id = factory._id;
    const { __ } = this.context;

    return (
      <FormItem
        className="multiple-wrapper"
        label={__('Factory') + ` ${index + 1}`}
        key={_id}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Field
              name={`name${_id}`}
              initialValue={factory.name}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder={__('Name')} />}
              canBeCryllic={false}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`townOrCity${_id}`}
              initialValue={factory.townOrCity}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder={__('Town or city')} />}
              canBeCryllic={false}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`country${_id}`}
              initialValue={factory.country}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder={__('Country')} />}
              canBeCryllic={false}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`productCodes${_id}`}
              hasFeedback={false}
              initialValue={factory.productCodes}
              optional={true}
              control={<Input placeholder={__('Product codes')} />}
              canBeCryllic={false}
            />
          </Col>
        </Row>
      </FormItem>
    );
  }

  renderDistrubutionRightInput(value, index) {
    const _index = index > 0 ? index.toString() : '';

    return (
      <Field
        key={index}
        name={`distributionRightName${index}`}
        initialValue={value}
        label={'Distribution right name ' + _index}
        labelIndex={_index}
        labelIgnoreIndex
        hasFeedback={false}
        optional={true}
        control={<Input />}
      />
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const countryOptions = this.renderOptions(countryData);

    const {
      hasParent,
      role,
      factories,
      isExclusiveDistributor,
      distributionRights
    } = this.state;

    const roleNone = role.includes('None');

    const factoryItems = factories.map((factory, index) =>
      this.renderFactory(factory, index)
    );

    const distributionRightItems = distributionRights.map((value, index) =>
      this.renderDistrubutionRightInput(value, index)
    );

    const { __ } = this.context;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title={__(groupLabels.head)}>
          {this.renderField({
            name: 'hasParent',
            label: groupLabels.hasParent,
            dataType: 'boolean',
            control: (
              <Select onChange={this.onHasParentChange}>
                {booleanOptions}
              </Select>
            )
          })}
          {this.renderField({
            name: 'isParentExistingSup',
            label: groupLabels.isParentExistingSup,
            isVisible: hasParent,
            optional: !hasParent,
            control: (
              <Select onChange={this.onParentExists}>{booleanOptions}</Select>
            )
          })}
          {this.renderField({
            name: 'parentName',
            label: groupLabels.parentName,
            isVisible: hasParent,
            optional: !hasParent,
            canBeCryllic: false,
            control: <Input />
          })}
          {this.renderField({
            name: 'parentAddress',
            label: groupLabels.parentAddress,
            isVisible: hasParent,
            optional: !hasParent,
            canBeCryllic: false,
            control: <Input />
          })}

          {this.renderField({
            name: 'parentRegistrationNumber',
            label: groupLabels.parentRegistrationNumber,
            isVisible: hasParent,
            optional: !hasParent,
            canBeCryllic: false,
            control: <Input type="number" />
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'role',
            label: groupLabels.role,
            control: (
              <Select onChange={this.onRoleChange} mode="multiple">
                <Option value="EOM" disabled={roleNone}>
                  {__('Original Equipment Manufacturer (OEM)')}
                </Option>
                <Option value="Service Provider" disabled={roleNone}>
                  {__('Service Provider')}
                </Option>
                <Option value="Distributor" disabled={roleNone}>
                  {__('Distributor')}
                </Option>
                <Option value="None" disabled={role.length > 0 && !roleNone}>
                  {__('None of above')}
                </Option>
              </Select>
            )
          })}

          <div className={role.includes('EOM') ? '' : 'hidden'}>
            {factoryItems}
            <FormItem>
              <Button type="dashed" onClick={this.addFactory}>
                <Icon type="plus" /> {__('Add factory')}
              </Button>
            </FormItem>
          </div>

          {this.renderField({
            name: 'isExclusiveDistributor',
            label: groupLabels.isExclusiveDistributor,
            dataType: 'boolean',
            isVisible: role.includes('Distributor'),
            optional: !role.includes('Distributor'),
            control: (
              <Select onChange={this.onIsExcChange}>{booleanOptions}</Select>
            )
          })}

          <div
            className={
              role.includes('Distributor') && isExclusiveDistributor
                ? ''
                : 'hidden'
            }
          >
            {this.renderField({
              label: groupLabels.attachments,
              name: 'attachments',
              attachmentType: 'Group',
              description: `Please upload your authorized distribution rights files`,
              optional: !isExclusiveDistributor,
              dataType: 'file-multiple',
              control: <Uploader multiple={true} />
            })}

            {distributionRightItems}
            <FormItem>
              <Button type="dashed" onClick={this.addRightName}>
                <Icon type="plus" /> {__('Add distribution right name')}
              </Button>
            </FormItem>
          </div>
        </Card>

        <Card className={role !== 'Distributor' && 'hidden'}>
          {this.renderField({
            name: 'primaryManufacturerName',
            label: groupLabels.primaryManufacturerName,
            optional: role !== 'Distributor',
            canBeCryllic: false,
            control: <Input />
          })}

          {this.renderField({
            name: 'countryOfPrimaryManufacturer',
            label: groupLabels.countryOfPrimaryManufacturer,
            optional: role !== 'Distributor',
            control: (
              <Select showSearch filterOption={this.filterOption}>
                {countryOptions}
              </Select>
            )
          })}
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

RegistrationForm.contextTypes = {
  __: PropTypes.func
};

const GroupForm = Form.create()(RegistrationForm);

export default withRouter(GroupForm);
