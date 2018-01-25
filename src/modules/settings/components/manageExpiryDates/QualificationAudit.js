import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Select, Input, Button, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object.isRequired,
  onEmailContentChange: PropTypes.func,
  users: PropTypes.array,
  mainAction: PropTypes.func
};

class QualificationAudit extends React.Component {
  constructor(props, context) {
    super(props);

    const { systemConfig } = context;

    console.log(systemConfig);

    this.state = {
      users: this.props.users,
      specificAuditDow: systemConfig.specificAuditDow || '',
      auditDow: systemConfig.auditDow || ''
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

      console.log(data);

      const auditDoc = {
        common: {
          duration: data.duration,
          amount: parseInt(data.amount, 10)
        },
        specific: {
          supplierIds: data.supplierId,
          duration: data.specificDuration,
          amount: parseInt(data.specificAmount, 10)
        }
      };

      const impDoc = {
        common: {
          tierType: data.duration,
          duration: data.duration,
          amount: data.duration
        },
        specific: {
          supplierIds: data.supplierId,
          tierType: data.type,
          duration: data.duration,
          amount: data.amount
        }
      };

      this.props.mainAction(auditDoc, impDoc);
    });
  }

  improvementPlanRender(type) {
    const { getFieldDecorator } = this.props.form;

    const tierTypes = [
      {
        name: 'commonNational',
        title: 'National supplier'
      },
      {
        name: 'umnugobi',
        title: 'Umnugobi supplier'
      },
      {
        name: 'tier1',
        title: 'International Tier 1 supplier'
      },
      {
        name: 'tier2',
        title: 'International Tier 2 supplier'
      },
      {
        name: 'tier3',
        title: 'International Tier 3 supplier'
      }
    ];

    const improvementPlanRender = [];
    tierTypes.map(tier =>
      improvementPlanRender.push(
        <Row gutter={16} key={`${tier.name}${type}`}>
          <Col span={12}>
            <p>{tier.title}</p>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator(`${tier.name}${type}`, {
                initialValue: 'year'
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
                initialValue: ''
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      )
    );

    return improvementPlanRender;
  }

  render() {
    const { users, specificAuditDow, auditDow } = this.state;
    const { getFieldDecorator } = this.props.form;

    const children = [];
    users.map(v =>
      children.push(<Option key={v.username}>{v.username}</Option>)
    );

    return (
      <div>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('duration', {
                    initialValue: auditDow.duration || 'year'
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
                    initialValue: auditDow.amount || ''
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
                    initialValue: specificAuditDow.supplierIds || ''
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
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
                    initialValue: specificAuditDow.duration || 'year'
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
                    initialValue: specificAuditDow.amount || ''
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <h2>Improvement Plan</h2>
            {this.improvementPlanRender('Common')}
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
                  {getFieldDecorator('supplierIds', {
                    initialValue: specificAuditDow.amount || ''
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                    >
                      {children}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            {this.improvementPlanRender('Specific')}
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
      </div>
    );
  }
}

QualificationAudit.propTypes = propTypes;

QualificationAudit.contextTypes = {
  systemConfig: PropTypes.object
};

export default Form.create()(QualificationAudit);
