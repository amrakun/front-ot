import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker, Row, Col, Button, Icon } from 'antd';
import { booleanData, labels, descriptions } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { BaseForm, Field } from 'modules/common/components';
import moment from 'moment';

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

class PrequalificationForm extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      hasConvictedForBusinessIntegrity:
        data.hasConvictedForBusinessIntegrity || false,
      hasLeadersConvicted: data.hasLeadersConvicted || false,
      investigations: (data.investigations || []).map(i => ({
        _id: Math.random(),
        ...i
      }))
    };

    this.onHasConvictedChange = this.onHasConvictedChange.bind(this);
    this.onLeaderConvictedChange = this.onLeaderConvictedChange.bind(this);
    this.addInvestigation = this.addInvestigation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onHasConvictedChange(value) {
    this.setState({ hasConvictedForBusinessIntegrity: value === 'true' });
  }

  onLeaderConvictedChange(value) {
    this.setState({ hasLeadersConvicted: value === 'true' });
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
      investigations
    } = this.state;

    const investigationItems = investigations.map((investigation, index) =>
      this.renderInvestigation(investigation, index)
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderField({
          name: 'doesMeetMinimumStandarts',
          label: labels.doesMeetMinimumStandarts,
          description: descriptions.doesMeetMinimumStandarts,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveJobDescription',
          label: labels.doesHaveJobDescription,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesConcludeValidContracts',
          label: labels.doesConcludeValidContracts,
          description: descriptions.doesConcludeValidContracts,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'employeeTurnoverRate',
          label: labels.employeeTurnoverRate,
          description: descriptions.employeeTurnoverRate,
          dataType: 'number',
          control: <Input />
        })}

        {this.renderField({
          name: 'doesHaveLiabilityInsurance',
          label: labels.doesHaveLiabilityInsurance,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveCodeEthics',
          label: labels.doesHaveCodeEthics,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'doesHaveResponsiblityPolicy',
          label: labels.doesHaveResponsiblityPolicy,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

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
          optional: hasConvictedForBusinessIntegrity,
          isVisible: hasConvictedForBusinessIntegrity,
          control: <TextArea />
        })}

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

        {this.renderField({
          name: 'doesEmployeePoliticallyExposed',
          label: labels.doesEmployeePoliticallyExposed,
          description: descriptions.doesEmployeePoliticallyExposed,
          dataType: 'boolean',
          control: <Select>{booleanOptions}</Select>
        })}

        {this.renderField({
          name: 'additionalInformation',
          label: labels.additionalInformation,
          description: descriptions.additionalInformation,
          control: <TextArea />
        })}

        {this.renderSubmit()}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
