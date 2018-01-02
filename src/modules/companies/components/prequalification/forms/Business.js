import React from 'react';
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

    return (
      <FormItem
        {...formItemLayout}
        className="multiple-wrapper"
        label={`Investigation ${index}`}
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
              control={<Input placeholder="Name" />}
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
              control={<Input placeholder="Status" />}
            />
          </Col>
          <Col span={6}>
            <Field
              name={`statusDate${_id}`}
              initialValue={moment(investigation.statusDate)}
              optional={true}
              control={<DatePicker format={dateFormat} placeholder="Close" />}
            />
          </Col>
        </Row>
      </FormItem>
    );
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);

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
        <h2>Human resource management</h2>
        <Card>
          {this.renderField({
            label: labels.organisationChart,
            name: 'organisationChart',
            dataType: 'file',
            control: (
              <Uploader
                initialFile={this.props.data.organisationChart}
                onReceiveFile={(...args) =>
                  this[`organisationChartUpload`](...args)
                }
              />
            )
          })}
        </Card>

        {this.renderConditionalField('doesMeetMinimumStandarts')}
        {this.renderConditionalField('doesHaveJobDescription')}

        <Card>
          {this.renderBoolean('doesConcludeValidContracts')}
          {this.renderField({
            name: 'employeeTurnoverRate',
            label: labels.employeeTurnoverRate,
            control: <Input type="number" />
          })}
        </Card>

        {this.renderConditionalField('doesHaveLiabilityInsurance')}

        <h2>Company business integrity</h2>
        {this.renderConditionalField('doesHaveCodeEthics')}
        {this.renderConditionalField('doesHaveResponsiblityPolicy')}

        <Card>
          {this.renderField({
            name: 'hasConvictedLabourLaws',
            label: labels.hasConvictedLabourLaws,
            description: descriptions.hasConvictedLabourLaws,
            dataType: 'boolean',
            control: <Select>{booleanOptions}</Select>
          })}

          {this.renderField({
            name: 'hasConvictedForHumanRights',
            label: labels.hasConvictedForHumanRights,
            description: descriptions.hasConvictedForHumanRights,
            dataType: 'boolean',
            control: <Select>{booleanOptions}</Select>
          })}
        </Card>

        <Card>
          {this.renderField({
            name: 'hasConvictedForBusinessIntegrity',
            label: labels.hasConvictedForBusinessIntegrity,
            description: descriptions.hasConvictedForBusinessIntegrity,
            dataType: 'boolean',
            control: (
              <Select onChange={this.onHasConvictedChange}>
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
              <Select onChange={this.onLeaderConvictedChange}>
                {booleanOptions}
              </Select>
            )
          })}

          <div style={!hasLeadersConvicted ? { display: 'none' } : {}}>
            {investigationItems}
            <FormItem {...formItemLayout}>
              <Button
                type="dashed"
                onClick={this.addInvestigation}
                style={{ width: '60%' }}
              >
                <Icon type="plus" /> Add investigation
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
              <Select onChange={this.onHasPEPCHange}>{booleanOptions}</Select>
            )
          })}

          {this.renderField({
            name: 'PEPName',
            label: labels.PEPName,
            isVisible: doesEmployeePoliticallyExposed,
            optional: !doesEmployeePoliticallyExposed,
            control: <Input />
          })}
        </Card>

        {this.renderSubmit()}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
