import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Form,
  Select,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Icon,
  Card
} from 'antd';
import { booleanData, labels, descriptions } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { Field, Uploader } from 'modules/common/components';
import moment from 'moment';
import PreqForm from './PreqForm';

const FormItem = Form.Item;
const { TextArea } = Input;

class PrequalificationForm extends PreqForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasConvictedForBusinessIntegrity:
        data.hasConvictedForBusinessIntegrity || false,
      hasLeadersConvicted: data.hasLeadersConvicted || false,
      doesEmployeePoliticallyExposed:
        data.doesEmployeePoliticallyExposed || false,
      doesMeetMinimumStandarts: data.doesMeetMinimumStandarts || false,
      doesHaveJobDescription: data.doesHaveJobDescription || false,
      doesHaveLiabilityInsurance: data.doesHaveLiabilityInsurance || false,
      doesHaveCodeEthics: data.doesHaveCodeEthics || false,
      doesHaveResponsiblityPolicy: data.doesHaveResponsiblityPolicy || false,
      hasConvictedLabourLaws: data.hasConvictedLabourLaws || false,
      hasConvictedForHumanRights: data.hasConvictedForHumanRights || false,
      investigations: (data.investigations || []).map(i => ({
        _id: Math.random(),
        ...i
      }))
    };

    this.onHasConvictedChange = this.onHasConvictedChange.bind(this);
    this.onLeaderConvictedChange = this.onLeaderConvictedChange.bind(this);
    this.addInvestigation = this.addInvestigation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHasPEPCHange = this.onHasPEPCHange.bind(this);
    this.onConditionalChange = this.onConditionalChange.bind(this);
  }

  onHasConvictedChange(value) {
    this.setState({ hasConvictedForBusinessIntegrity: value === 'true' });
  }

  onLeaderConvictedChange(value) {
    this.setState({ hasLeadersConvicted: value === 'true' });
  }

  onHasPEPCHange(value) {
    this.setState({ doesEmployeePoliticallyExposed: value === 'true' });
  }

  addInvestigation() {
    const { investigations } = this.state;

    investigations.push({
      _id: Math.random(),
      name: '',
      date: moment(),
      status: '',
      statusDate: moment()
    });

    this.setState({ investigations });
  }

  onConditionalChange(value, name) {
    this.state[name] = value === 'true';
  }

  handleSubmit(e) {
    e.preventDefault();

    const investigations = [];

    this.state.investigations.forEach(investigation => {
      const _id = investigation._id;

      investigations.push({
        name: this.getFieldValue(`name${_id}`),
        date: this.getFieldValue(`date${_id}`),
        status: this.getFieldValue(`status${_id}`),
        statusDate: this.getFieldValue(`statusDate${_id}`)
      });
    });

    this.save({ investigations });
  }

  renderInvestigation(investigation, index) {
    const _id = investigation._id;
    const { __ } = this.context;

    return (
      <FormItem
        className="multiple-wrapper"
        label={`${index + 1}-р ` + __('Investigation')}
        key={_id}
        hasFeedback
      >
        <Row gutter={16}>
          <Col span={6}>
            <Field
              name={`name${_id}`}
              initialValue={investigation.name}
              hasFeedback={false}
              optional={true}
              control={
                <Input
                  {...this.common}
                  placeholder={__('Investigation name')}
                />
              }
            />
          </Col>
          <Col span={6}>
            <Field
              name={`date${_id}`}
              initialValue={moment(investigation.date)}
              hasFeedback={false}
              optional={true}
              control={<DatePicker format={dateFormat} placeholder="Start" />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`status${_id}`}
              initialValue={investigation.status}
              hasFeedback={false}
              optional={true}
              control={
                <Input
                  {...this.common}
                  placeholder={__('Investigation status')}
                />
              }
            />
          </Col>
          <Col span={6}>
            <Field
              name={`statusDate${_id}`}
              initialValue={moment(investigation.statusDate)}
              hasFeedback={false}
              optional={true}
              control={
                <DatePicker format={dateFormat} placeholder={__('Close')} />
              }
            />
          </Col>
        </Row>
      </FormItem>
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const { __ } = this.context;

    const {
      hasConvictedForBusinessIntegrity,
      hasLeadersConvicted,
      investigations,
      doesEmployeePoliticallyExposed
    } = this.state;

    const investigationItems = investigations.map((investigation, index) =>
      this.renderInvestigation(investigation, index)
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>{__('Human resource management')}</h2>
        <Card>
          {this.renderField({
            label: labels.organisationChart,
            name: 'organizationChartFile',
            dataType: 'file',
            control: <Uploader />
          })}
        </Card>

        {this.renderConditionalField('doesMeetMinimumStandarts')}
        {this.renderConditionalField('doesHaveJobDescription')}

        <Card>
          {this.renderBoolean('doesConcludeValidContracts')}
          {this.renderField({
            name: 'employeeTurnoverRate',
            label: labels.employeeTurnoverRate,
            description: descriptions.employeeTurnoverRate,
            control: <Input {...this.common} type="number" />
          })}
        </Card>

        {this.renderConditionalField('doesHaveLiabilityInsurance')}

        <h2>{__('Company business integrity')}</h2>
        {this.renderConditionalField('doesHaveCodeEthics')}
        {this.renderConditionalField('doesHaveResponsiblityPolicy')}
        {this.renderConditionalField('hasConvictedLabourLaws', true)}
        {this.renderConditionalField('hasConvictedForHumanRights', true)}

        <Card>
          {this.renderField({
            name: 'hasConvictedForBusinessIntegrity',
            label: labels.hasConvictedForBusinessIntegrity,
            description: descriptions.hasConvictedForBusinessIntegrity,
            dataType: 'boolean',
            control: (
              <Select {...this.common} onChange={this.onHasConvictedChange}>
                {booleanOptions}
              </Select>
            )
          })}

          {this.renderField({
            name: 'proveHasNotConvicted',
            label: labels.proveHasNotConvicted,
            isVisible: hasConvictedForBusinessIntegrity,
            optional: !hasConvictedForBusinessIntegrity,
            control: <TextArea />
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'hasLeadersConvicted',
            label: labels.hasLeadersConvicted,
            description: descriptions.hasLeadersConvicted,
            dataType: 'boolean',
            control: (
              <Select {...this.common} onChange={this.onLeaderConvictedChange}>
                {booleanOptions}
              </Select>
            )
          })}

          <div style={!hasLeadersConvicted ? { display: 'none' } : {}}>
            {investigationItems}
            <FormItem>
              <Button
                type="dashed"
                onClick={this.addInvestigation}
                style={{ width: '100%' }}
              >
                <Icon type="plus" /> {__('Add investigation')}
              </Button>
            </FormItem>
          </div>
        </Card>

        <Card>
          {this.renderField({
            name: 'doesEmployeePoliticallyExposed',
            label: labels.doesEmployeePoliticallyExposed,
            description: descriptions.doesEmployeePoliticallyExposed,
            dataType: 'boolean',
            control: (
              <Select {...this.common} onChange={this.onHasPEPCHange}>
                {booleanOptions}
              </Select>
            )
          })}

          {this.renderField({
            name: 'pepName',
            label: labels.PEPName,
            isVisible: doesEmployeePoliticallyExposed,
            optional: !doesEmployeePoliticallyExposed,
            control: <Input {...this.common} />
          })}

          {this.renderField({
            label: labels.isSubContractor,
            description: descriptions.isSubContractor,
            name: 'isSubContractor',
            control: (
              <Select
                {...this.common}
                placeholder={__('Please select an option')}
              >
                {booleanOptions}
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

const BusinessForm = Form.create()(PrequalificationForm);

PrequalificationForm.contextTypes = {
  __: PropTypes.func
};

export default withRouter(BusinessForm);
