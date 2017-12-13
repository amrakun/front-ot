import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Button, Select, Row, Col } from 'antd';
import { booleanData, roleData, countryData, groupLabels } from '../constants';
import { BaseForm, Field, Uploader } from 'modules/common/components';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 }
  }
};

class RegistrationForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasParent: data.hasParent || false,
      role: data.role || '',
      isExclusiveDistributor: data.isExclusiveDistributor || false,
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
    const distributionRightNames = [];

    this.state.factories.forEach(factory => {
      const _id = factory._id;

      factories.push({
        name: this.getFieldValue(`name${_id}`),
        townOrCity: this.getFieldValue(`townOrCity${_id}`),
        country: this.getFieldValue(`country${_id}`),
        productCodes: this.getFieldValue(`productCodes${_id}`)
      });
    });

    distributionRightNames.push(this.getFieldValue('distributionRightName1'));
    distributionRightNames.push(this.getFieldValue('distributionRightName2'));
    distributionRightNames.push(this.getFieldValue('distributionRightName3'));

    this.save({ factories });
  }

  renderFactory(factory, index) {
    const _id = factory._id;

    return (
      <FormItem
        {...formItemLayout}
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
    const { data } = this.props;
    const { isExclusiveDistributor } = this.state;

    return (
      <Field
        name={`distributionRightName${index}`}
        // initialValue={}
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

    const { hasParent, role, factories, isExclusiveDistributor } = this.state;

    const factoryItems = factories.map((factory, index) =>
      this.renderFactory(factory, index)
    );

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

        <div className={role === 'EOM' ? '' : 'hidden'}>
          {factoryItems}
          <FormItem {...formItemLayout}>
            <Button
              type="dashed"
              onClick={this.addFactory}
              style={{ width: '60%' }}
            >
              <Icon type="plus" /> Add factory
            </Button>
          </FormItem>
        </div>

        {this.renderField({
          name: 'isExclusiveDistributor',
          label: groupLabels.isExclusiveDistributor,
          dataType: 'boolean',
          isVisible: role === 'Stockist' || role === 'Distrubotor',
          control: (
            <Select onChange={this.onIsExcChange}>{booleanOptions}</Select>
          )
        })}

        {this.renderDistrubutionRightInput(1)}
        {this.renderDistrubutionRightInput(2)}
        {this.renderDistrubutionRightInput(3)}

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

        {this.renderSubmit()}
      </Form>
    );
  }
}

const GroupForm = Form.create()(RegistrationForm);

export default withRouter(GroupForm);
