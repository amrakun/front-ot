import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, Input, Button } from 'antd';
import SupplierSearcher from 'modules/companies/containers/Searcher';

const FormItem = Form.Item;
const Option = Select.Option;

const propTypes = {
  form: PropTypes.object.isRequired,
  onEmailContentChange: PropTypes.func,
  mainAction: PropTypes.func,
};

class PreQualification extends React.Component {
  constructor(props, context) {
    super(props);

    const { systemConfig } = context;
    const { prequalificationDow, specificPrequalificationDow } = systemConfig;

    this.state = {
      preQualification: prequalificationDow ? { ...prequalificationDow } : {},

      specificSuppliers: specificPrequalificationDow.specificSuppliers,
      specificPrequalificationDow: specificPrequalificationDow
        ? { ...specificPrequalificationDow }
        : {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelectSpecificSuppliers = this.onSelectSpecificSuppliers.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { specificSuppliers } = this.state;
    const { form } = this.props;

    form.validateFieldsAndScroll((err, data) => {
      if (err) {
        return;
      }

      this.props.mainAction({
        common: {
          duration: data.duration,
          amount: parseInt(data.amount, 10),
        },
        specific: {
          supplierIds: specificSuppliers.map(s => s._id),
          duration: data.specificDuration,
          amount: parseInt(data.specificAmount, 10),
        },
      });
    });
  }

  onSelectSpecificSuppliers(suppliers) {
    this.setState({ specificSuppliers: suppliers });
  }

  render() {
    const { preQualification, specificPrequalificationDow } = this.state;
    const { getFieldDecorator } = this.props.form;

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
                    initialValue: preQualification.duration || 'year',
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value="day">Day</Option>
                      <Option value="month">Month</Option>
                      <Option value="year">Year</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('amount', {
                    initialValue: preQualification.amount || 0,
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <h2>Specific settings</h2>
            <Row gutter={16} style={{ marginBottom: 10 }} type="flex" align="middle">
              <Col span={12}>
                <h4>Suppliers:</h4>
              </Col>
              <Col span={12}>
                <SupplierSearcher
                  onSelect={this.onSelectSpecificSuppliers}
                  initialChosenSuppliers={specificPrequalificationDow.suppliers}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('specificDuration', {
                    initialValue: specificPrequalificationDow.duration || 'year',
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value="day">Day</Option>
                      <Option value="month">Month</Option>
                      <Option value="year">Year</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('specificAmount', {
                    initialValue: specificPrequalificationDow.amount || 0,
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
  systemConfig: PropTypes.object,
};

export default Form.create()(PreQualification);
