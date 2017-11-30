import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Button, Input, DatePicker, Row, Col } from 'antd';
import { booleanData, dateFormat } from '../../constants'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 12,
    },
    lg: {
      span: 14,
      offset: 10,
    },
  },
};
const booleanOptions = booleanData.map((el, i) => <Option key={i}>{el}</Option>);

class PrequalificationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  renderBooleanItem(id, label, extra) {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        hasFeedback
        extra={extra}
      >
        {getFieldDecorator(`${id}`, {
          rules: [{
            required: true,
            message: 'Please select one'
          }]
        })(
          <Select placeholder="Select one">
            {booleanOptions}
          </Select>
        )}
      </FormItem>
    )
  }

  componentDidMount() {
    const data = this.props.data;
    data.invStartDate1 ? data.invStartDate1 = moment(data.invStartDate1) : '';
    data.invCloseDate1 ? data.invCloseDate1 = moment(data.invCloseDate1) : '';
    this.props.form.setFieldsValue(data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderBooleanItem('minimumStandards', 'Does your company meet minimum standards of fair employment practice required by Mongolian labor laws and regulations', 'Fair employment practice includes disabled ethnic groups, anti-discrimination etc.')}
        {this.renderBooleanItem('inPlace', 'Does the Company have a job description procedure in place?')}
        {this.renderBooleanItem('validContracts', 'Does the company conclude valid contracts with all employees. (include skilled/unskilled, temporary and permanent, and underage workers, etc)', 'Include skilled/unskilled manufacturing employees, temporary employees, underage workers etc.')}
        <FormItem
          {...formItemLayout}
          label='Please provide the employee turnover rate within your company in the last 12 months'
          hasFeedback
        >
          {getFieldDecorator('canProvide', {
            rules: [{
              required: true,
              message: 'Please enter a number'
            }]
          })(
            <Input />
          )}
        </FormItem>
        {this.renderBooleanItem('liability', 'Does the organisation have Liability insurance which meets Oyu Tolgoi’s minimum requirements and valid worker compensation insurance or enrolment in an applicable occupational injury/illness insurance programme?')}


        {this.renderBooleanItem('ethics', 'Does your company have a documented code of ethics/conduct?')}
        {this.renderBooleanItem('socialResp', 'Does your company have a documented Corporate Social Responsibility policy?')}
        {this.renderBooleanItem('labourLaws', 'Has your company ever been convicted for a breach of any labour laws in the countries you operate within the last five years?', 'The five years is based on the date of your declaration and submission of your questionnaire compared to the date of conviction. You may remove any breaches older than five years.')}
        {this.renderBooleanItem('humanRights', 'Has your company ever been convicted for a breach of any human rights in the countries you operate within the last five years?', 'The five years is based on the date of your declaration and submission of your questionnaire compared to the date of conviction. You may remove any breaches older than five years.')}
        {this.renderBooleanItem('businessInteg', 'Has your company ever been convicted for a breach of any business integrity in the countries you operate within the last five years?', 'The five years is based on the date of your declaration and submission of your questionnaire compared to the date of conviction. You may remove any breaches older than five years.')}
        <FormItem
          {...formItemLayout}
          label='If Yes, what steps have you taken to ensure this does not happen again? '
          hasFeedback
        >
          {getFieldDecorator('stepsTaken', {
            rules: [{
              required: false,
              message: 'Please enter an input'
            }]
          })(
            <TextArea />
          )}
        </FormItem>
        {this.renderBooleanItem('isInvestigated', 'Has your company or any of its directors been investigated or convicted of any other legal infringement not described above within the last five years?', 'The five years is based on the date of your declaration and submission of your questionnaire compared to the date of conviction. You may remove any breaches older than five years.')}

        <FormItem className="multiple-wrapper"
          {...formItemLayout}
          label='Investigation 1'
          hasFeedback
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('inv1', {
                  rules: [{ required: false, message: 'Please enter an input!' }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('invStartDate1', {
                  rules: [{ required: false, message: 'Please select an year!' }]
                })(
                  <DatePicker
                    format={dateFormat}
                    placeholder="Start date"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('invStatus1', {
                  rules: [{ required: false, message: 'Please enter an input!' }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('invCloseDate1', {
                  rules: [{ required: false, message: 'Please select an year!' }]
                })(
                  <DatePicker
                    format={dateFormat}
                    placeholder="Close date"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        {this.renderBooleanItem('PEP', 'Does your company employ any politically exposed person? If yes, provide list of PEP name', 'PEP - Individuals who are or have been entrusted with prominent public functions either domestically or by a foreign country, for example Heads of state or Heads of government, senior politicians, senior government, judicial or military officials, senior executives of state owned corporations, important political party officials')}
        <FormItem
          {...formItemLayout}
          label='Additional Information'
          extra='Please use this space to provide additional information regarding your Corporate Social Responsibility'
          hasFeedback
        >
          {getFieldDecorator('additional', {
            rules: [{
              required: true,
              message: 'Please enter an input'
            }]
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const BusinessForm = Form.create()(PrequalificationForm);

export default withRouter(BusinessForm);
