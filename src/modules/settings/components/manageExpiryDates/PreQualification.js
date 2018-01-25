import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const propTypes = {
  form: PropTypes.object.isRequired,
  onEmailContentChange: PropTypes.func,
  mainAction: PropTypes.func,
  users: PropTypes.array
};

class PreQualification extends React.Component {
  constructor(props, context) {
    super(props);

    const { systemConfig } = context;

    this.state = {
      users: this.props.users,
      preQualification: systemConfig.prequalificationDow || '',
      specificPrequalificationDow:
        systemConfig.specificPrequalificationDow || ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form } = this.props;

    form.validateFieldsAndScroll((err, data) => {
      if (err) {
        return;
      }

      this.props.mainAction({
        common: {
          duration: data.duration,
          amount: parseInt(data.amount, 10)
        },
        specific: {
          supplierIds: data.supplierId,
          duration: data.specificDuration,
          amount: parseInt(data.specificAmount, 10)
        }
      });
    });
  }

  render() {
    const { users, preQualification, specificPrequalificationDow } = this.state;
    const { getFieldDecorator } = this.props.form;

    const children = [];
    users.map(v => children.push(<Option key={v._id}>{v.username}</Option>));

    return (
      <Form>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('duration', {
                    initialValue: preQualification.duration || 'year'
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value="day">Day</Option>
                      <Option value="month">Month</Option>
                      <Option value="quarter">Quarter</Option>
                      <Option value="year">Year</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('amount', {
                    initialValue: preQualification.amount || ''
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <h2>Specific settings</h2>
            <Row
              gutter={16}
              style={{ marginBottom: 10 }}
              type="flex"
              align="middle"
            >
              <Col span={12}>
                <h4>Suppliers:</h4>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('supplierId', {
                    initialValue: specificPrequalificationDow.supplierIds || ''
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select supplier"
                    >
                      {children}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('specificDuration', {
                    initialValue: specificPrequalificationDow.duration || 'year'
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value="day">Day</Option>
                      <Option value="month">Month</Option>
                      <Option value="quarter">Quarter</Option>
                      <Option value="year">Year</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('specificAmount', {
                    initialValue: specificPrequalificationDow.amount || ''
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              style={{ float: 'right', marginTop: 20 }}
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

PreQualification.propTypes = propTypes;

PreQualification.contextTypes = {
  systemConfig: PropTypes.object
};

export default Form.create()(PreQualification);
