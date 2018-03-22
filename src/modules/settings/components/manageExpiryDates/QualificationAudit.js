import React from 'react';
import PropTypes from 'prop-types';
import SupplierSearcher from 'modules/companies/containers/Searcher';
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

    this.state = {
      users: this.props.users,
      specificAuditDow: systemConfig.specificAuditDow || {},
      auditDow: systemConfig.auditDow || {},
      specificImprovementPlanDow: systemConfig.specificImprovementPlanDow || {},
      improvementPlanDow: systemConfig.improvementPlanDow || {}
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
          national: {
            duration: data.nationalDuration,
            amount: data.nationalAmount
          },
          umnugobi: {
            duration: data.umnugobiDuration,
            amount: data.umnugobiAmount
          },
          tier1: {
            duration: data.tier1Duration,
            amount: data.tier1Amount
          },
          tier2: {
            duration: data.tier2Duration,
            amount: data.tier2Amount
          },
          tier3: {
            duration: data.tier3Duration,
            amount: data.tier3Amount
          }
        },
        specific: {
          supplierIds: data.specificSupplierId,
          national: {
            duration: data.nationalSpecificDuration,
            amount: data.nationalSpecificAmount
          },
          umnugobi: {
            duration: data.umnugobiSpecificDuration,
            amount: data.umnugobiSpecificAmount
          },
          tier1: {
            duration: data.tier1SpecificDuration,
            amount: data.tier1SpecificAmount
          },
          tier2: {
            duration: data.tier2SpecificDuration,
            amount: data.tier2SpecificAmount
          },
          tier3: {
            duration: data.tier3SpecificDuration,
            amount: data.tier3SpecificAmount
          }
        }
      };

      this.props.mainAction(auditDoc, impDoc);
    });
  }

  improvementPlanRender(type) {
    const { getFieldDecorator } = this.props.form;
    const { improvementPlanDow, specificImprovementPlanDow } = this.state;

    const common = [
      {
        name: 'national',
        duration: 'nationalDuration',
        amount: 'nationalAmount',
        title: 'National supplier'
      },
      {
        name: 'umnugobi',
        duration: 'umnugobiDuration',
        amount: 'umnugobiAmount',
        title: 'Umnugobi supplier'
      },
      {
        name: 'tier1',
        duration: 'tier1Duration',
        amount: 'tier1Amount',
        title: 'International Tier 1 supplier'
      },
      {
        name: 'tier2',
        duration: 'tier2Duration',
        amount: 'tier2Amount',
        title: 'International Tier 2 supplier'
      },
      {
        name: 'tier3',
        duration: 'tier3Duration',
        amount: 'tier3Amount',
        title: 'International Tier 3 supplier'
      }
    ];

    const specific = [
      {
        name: 'national',
        duration: 'nationalSpecificDuration',
        amount: 'nationalSpecificAmount',
        title: 'National supplier'
      },
      {
        name: 'umnugobi',
        duration: 'umnugobiSpecificDuration',
        amount: 'umnugobiSpecificAmount',
        title: 'Umnugobi supplier'
      },
      {
        name: 'tier1',
        duration: 'tier1SpecificDuration',
        amount: 'tier1SpecificAmount',
        title: 'International Tier 1 supplier'
      },
      {
        name: 'tier2',
        duration: 'tier2SpecificDuration',
        amount: 'tier2SpecificAmount',
        title: 'International Tier 2 supplier'
      },
      {
        name: 'tier3',
        duration: 'tier3SpecificDuration',
        amount: 'tier3SpecificAmount',
        title: 'International Tier 3 supplier'
      }
    ];

    const tierTypes = type === 'common' ? common : specific;
    const initials =
      type === 'common' ? improvementPlanDow : specificImprovementPlanDow;

    const improvementPlanRender = [];
    tierTypes.map(tier =>
      improvementPlanRender.push(
        <Row gutter={16} key={tier.name}>
          <Col span={12}>
            <p>{tier.title}</p>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator(tier.duration, {
                initialValue: initials[tier.name]
                  ? initials[tier.name]['duration']
                  : 'year'
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
              {getFieldDecorator(tier.amount, {
                initialValue: initials[tier.name]
                  ? initials[tier.name]['amount']
                  : 0
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      )
    );

    return improvementPlanRender;
  }

  render() {
    const {
      users,
      specificAuditDow,
      auditDow,
      specificImprovementPlanDow
    } = this.state;
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
                    initialValue: auditDow.amount || 0
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
                    initialValue: specificAuditDow.supplierIds || []
                  })(<SupplierSearcher mode="select" />)}
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
                    initialValue: specificAuditDow.amount || 0
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <h2>Improvement Plan</h2>
            {this.improvementPlanRender('common')}
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
                  {getFieldDecorator('specificSupplierId', {
                    initialValue: specificImprovementPlanDow.supplierIds || []
                  })(<SupplierSearcher mode="select" />)}
                </FormItem>
              </Col>
            </Row>

            {this.improvementPlanRender('specific')}
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
