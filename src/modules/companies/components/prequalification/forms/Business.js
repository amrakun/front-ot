import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Input, DatePicker, Row, Col } from 'antd';
import { booleanData, labels, descriptions } from '../constants';
import { dateFormat } from 'modules/common/constants';
import { BaseForm } from 'modules/common/components';
// import moment from 'moment';

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

    this.state = {
      hasConvictedForBusinessIntegrity: false,
      hasLeadersConvicted: false
    };

    this.onHasConvictedChange = this.onHasConvictedChange.bind(this);
    this.onLeaderConvictedChange = this.onLeaderConvictedChange.bind(this);
  }

  onHasConvictedChange(value) {
    value === 'true'
      ? this.setState({ hasConvictedForBusinessIntegrity: true })
      : this.setState({ hasConvictedForBusinessIntegrity: false });
  }

  onLeaderConvictedChange(value) {
    value === 'true'
      ? this.setState({ hasLeadersConvicted: true })
      : this.setState({ hasLeadersConvicted: false });
  }

  render() {
    const booleanOptions = this.renderOptions(booleanData);
    const {
      hasConvictedForBusinessIntegrity,
      hasLeadersConvicted
    } = this.state;

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

        <FormItem
          className="multiple-wrapper"
          {...formItemLayout}
          label="Investigation 1"
          hasFeedback
          style={!hasLeadersConvicted ? { display: 'none' } : {}}
        >
          <Row gutter={16}>
            <Col span={6}>
              {this.renderField({
                name: 'name',
                control: <Input />
              })}
            </Col>
            <Col span={6}>
              {this.renderField({
                name: 'date',
                control: (
                  <DatePicker format={dateFormat} placeholder="Start date" />
                )
              })}
            </Col>
            <Col span={6}>
              {this.renderField({
                name: 'status',
                control: <Input />
              })}
            </Col>
            <Col span={6}>
              {this.renderField({
                name: 'statusDate',
                control: (
                  <DatePicker format={dateFormat} placeholder="Close date" />
                )
              })}
            </Col>
          </Row>
        </FormItem>

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

        {this.renderSubmit('Save & continue', this.handleSubmit)}
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
