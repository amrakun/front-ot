import React from 'react';
import { withRouter } from 'react-router';
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
      role: data.role,
      isExclusiveDistributor: data.isExclusiveDistributor || false,
      isParentExistingSup: data.isParentExistingSup || false,
      factories: (data.factories || []).map(f => ({
        _id: Math.random(),
        ...f
      }))
    };

    this.onHasParentChange = this.onHasParentChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onIsExcChange = this.onIsExcChange.bind(this);
    this.addFactory = this.addFactory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onParentExists = this.onParentExists.bind(this);
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
      authorizedDistributions.push(
        this.getFieldValue('distributionRightName0')
      );
      authorizedDistributions.push(
        this.getFieldValue('distributionRightName1')
      );
      authorizedDistributions.push(
        this.getFieldValue('distributionRightName2')
      );
    }

    this.save({ factories, authorizedDistributions });
  }

  renderFactory(factory, index) {
    const _id = factory._id;

    return (
      <FormItem
        className="multiple-wrapper"
        label={`Factory ${index + 1}`}
        key={_id}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Field
              name={`name${_id}`}
              initialValue={factory.name}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder="Name" />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`townOrCity${_id}`}
              initialValue={factory.townOrCity}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder="Town or city" />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`country${_id}`}
              initialValue={factory.country}
              hasFeedback={false}
              optional={true}
              control={<Input placeholder="Country" />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`productCodes${_id}`}
              hasFeedback={false}
              initialValue={factory.productCodes}
              optional={true}
              control={<Input placeholder="Product codes" />}
            />
          </Col>
        </Row>
      </FormItem>
    );
  }

  renderDistrubutionRightInput(index) {
    const initValues = this.props.data.authorizedDistributions || {};

    return (
      <Field
        name={`distributionRightName${index}`}
        initialValue={initValues[index]}
        label={`Distribution right name ${index + 1}`}
        hasFeedback={false}
        optional={true}
        control={<Input />}
      />
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const countryOptions = this.renderOptions(countryData);

    const { hasParent, role, factories, isExclusiveDistributor } = this.state;

    const roleNone = role.includes('None');

    const factoryItems = factories.map((factory, index) =>
      this.renderFactory(factory, index)
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title={groupLabels.head}>
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
            control: <Input />
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
                  Original Equipment Manufacturer (OEM)
                </Option>
                <Option value="Service Provider" disabled={roleNone}>
                  Service Provider
                </Option>
                <Option value="Distributor" disabled={roleNone}>
                  Distributor
                </Option>
                <Option value="None" disabled={role.length > 0 && !roleNone}>
                  None of above
                </Option>
              </Select>
            )
          })}

          <div className={role.includes('EOM') ? '' : 'hidden'}>
            {factoryItems}
            <FormItem>
              <Button type="dashed" onClick={this.addFactory}>
                <Icon type="plus" /> Add factory
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
            {this.renderDistrubutionRightInput(0)}
            {this.renderDistrubutionRightInput(1)}
            {this.renderDistrubutionRightInput(2)}

            {this.renderField({
              label: groupLabels.attachments,
              name: 'attachments',
              description: `Please upload your authorized distribution rights files`,
              optional: !isExclusiveDistributor,
              dataType: 'file-multiple',
              control: <Uploader multiple={true} />
            })}
          </div>
        </Card>

        <Card className={role !== 'Distributor' && 'hidden'}>
          {this.renderField({
            name: 'primaryManufacturerName',
            label: groupLabels.primaryManufacturerName,
            optional: role !== 'Distributor',
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

const GroupForm = Form.create()(RegistrationForm);

export default withRouter(GroupForm);
