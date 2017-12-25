import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Select, Row, Col, Card } from 'antd';
import { booleanData, roleData, countryData, groupLabels } from '../constants';
import { BaseForm, Field, Uploader } from 'modules/common/components';

const FormItem = Form.Item;

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasParent: data.hasParent || false,
      role: data.role || '',
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
    this.setState({ role: value });
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
        this.getFieldValue('distributionRightName1')
      );
      authorizedDistributions.push(
        this.getFieldValue('distributionRightName2')
      );
      authorizedDistributions.push(
        this.getFieldValue('distributionRightName3')
      );
    }

    this.save({ factories, authorizedDistributions });
  }

  renderFactory(factory, index) {
    const _id = factory._id;

    return (
      <FormItem
        className="multiple-wrapper"
        label={`Factory ${index}`}
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
              control={<Input />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`country${_id}`}
              initialValue={factory.country}
              hasFeedback={false}
              optional={true}
              control={<Input />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`productCodes${_id}`}
              initialValue={factory.productCodes}
              optional={true}
              control={<Input />}
            />
          </Col>
        </Row>
      </FormItem>
    );
  }

  renderDistrubutionRightInput(index) {
    const initValues = this.props.authorizedDistributions || {};
    const { isExclusiveDistributor } = this.state;

    return (
      <Field
        name={`distributionRightName${index}`}
        initialValue={initValues[index]}
        label={`Distribution right name ${index}`}
        hasFeedback={false}
        isVisible={isExclusiveDistributor}
        optional={true}
        control={<Input />}
      />
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const roleOptions = this.renderOptions(roleData);
    const countryOptions = this.renderOptions(countryData);

    const {
      hasParent,
      role,
      factories,
      isExclusiveDistributor,
      isParentExistingSup
    } = this.state;

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
            isVisible: hasParent && isParentExistingSup,
            optional: !hasParent && !isParentExistingSup,
            control: <Select>{booleanOptions}</Select>
            // TODO: companyOptions fetch from db
          })}
          {this.renderField({
            name: 'parentName',
            label: groupLabels.parentName,
            isVisible: hasParent && !isParentExistingSup,
            optional: !hasParent && !isParentExistingSup,
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
            control: <Input />
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'role',
            label: groupLabels.role,
            control: <Select onChange={this.onRoleChange}>{roleOptions}</Select>
          })}

          <div className={role === 'EOM' ? '' : 'hidden'}>
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
            isVisible: role === 'Distributor',
            control: (
              <Select onChange={this.onIsExcChange}>{booleanOptions}</Select>
            )
          })}

          {this.renderDistrubutionRightInput(0)}
          {this.renderDistrubutionRightInput(1)}
          {this.renderDistrubutionRightInput(2)}

          {this.renderField({
            label: groupLabels.attachments,
            name: 'attachments',
            description: `Please upload your authorized distribution rights files`,
            isVisible: isExclusiveDistributor,
            optional: !isExclusiveDistributor,
            dataType: 'file',
            control: (
              <Uploader
                initialFiles={this.props.data.attachments}
                multiple={true}
                onReceiveFile={(...args) => this.attachmentsUpload(...args)}
              />
            )
          })}
        </Card>

        <Card>
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
        </Card>

        {this.renderSubmit()}
      </Form>
    );
  }
}

const GroupForm = Form.create()(RegistrationForm);

export default withRouter(GroupForm);
