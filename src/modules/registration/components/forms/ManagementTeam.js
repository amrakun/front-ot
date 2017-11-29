import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    lg: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    lg: { span: 14 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 5
    },
    lg: {
      span: 16,
      offset: 4
    }
  }
};

class RegistrationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.data);
  }

  renderMember(name, isRequired) {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem {...formItemLayout} label="Name" hasFeedback>
          {getFieldDecorator(`${name}Name`, {
            rules: [
              {
                required: isRequired,
                message: 'Please enter your name!'
              }
            ]
          })(<Input placeholder="Title. First name + Last name" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Job title" hasFeedback>
          {getFieldDecorator(`${name}Job`, {
            rules: [
              {
                required: isRequired,
                message: 'Please enter your job title!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone" hasFeedback>
          {getFieldDecorator(`${name}Phone`, {
            rules: [
              {
                required: isRequired,
                message: 'Please enter your phone number!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator(`${name}Email`, {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: isRequired,
                message: 'Please input your company e-mail!'
              }
            ]
          })(<Input />)}
        </FormItem>
      </div>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={24} sm={12}>
            <label>15. Managing director</label>
            {this.renderMember('managing', true)}
            <label>16. Executive officer</label>
            {this.renderMember('executive', true)}
            <label>17. Sales director</label>
            {this.renderMember('sales', true)}
            <label>18. Financial director</label>
            {this.renderMember('financial', true)}
          </Col>
          <Col xs={24} sm={12}>
            <label>19. Other management team member</label>
            {this.renderMember('member1', true)}
            <label>Other management team member 2</label>
            {this.renderMember('member2', false)}
            <label>Other management team member 3</label>
            {this.renderMember('member3', false)}
          </Col>
        </Row>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save & continue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ManagementForm = Form.create()(RegistrationForm);

export default withRouter(ManagementForm);
