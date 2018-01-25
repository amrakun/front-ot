import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { Row, Col, Select, Input } from 'antd';
const Option = Select.Option;

const propTypes = {
  onEmailContentChange: PropTypes.func,
  users: PropTypes.array
};

class QualificationAudit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.users
    };

    this.handleChange = this.handleChange.bind();
    this.renderSupplier = this.renderSupplier.bind();
  }

  handleChange(value) {
    console.log('changed', value);
  }

  renderSupplier() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <p>National Supplier</p>
        </Col>
        <Col span={6}>
          <Select
            defaultValue="year"
            style={{ width: 120 }}
            onChange={this.handleChange}
          >
            <Option value="day">Day</Option>
            <Option value="month">Month</Option>
            <Option value="quarter">Quarter</Option>
            <Option value="year">Year</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Input />
        </Col>
      </Row>
    );
  }

  render() {
    console.log(this.state.users);

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      );
    }

    return (
      <div>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <Select
                  defaultValue="year"
                  style={{ width: 120 }}
                  onChange={this.handleChange}
                >
                  <Option value="day">Day</Option>
                  <Option value="month">Month</Option>
                  <Option value="quarter">Quarter</Option>
                  <Option value="year">Year</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Input />
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
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={['a10', 'c12']}
                  onChange={this.handleChange}
                >
                  {children}
                </Select>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <Select
                  defaultValue="year"
                  style={{ width: 120 }}
                  onChange={this.handleChange}
                >
                  <Option value="day">Day</Option>
                  <Option value="month">Month</Option>
                  <Option value="quarter">Quarter</Option>
                  <Option value="year">Year</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Input />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={32} type="flex">
          <Col span={12} style={{ borderRight: 'solid 1px #eee' }}>
            <h2>Improvement Plan</h2>
            {/* {this.renderSupplier} */}
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
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={['a10', 'c12']}
                  onChange={this.handleChange}
                >
                  {children}
                </Select>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <p>Duration of warrantly /after the last verification/</p>
              </Col>
              <Col span={6}>
                <Select
                  defaultValue="year"
                  style={{ width: 120 }}
                  onChange={this.handleChange}
                >
                  <Option value="day">Day</Option>
                  <Option value="month">Month</Option>
                  <Option value="quarter">Quarter</Option>
                  <Option value="year">Year</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Input />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

QualificationAudit.propTypes = propTypes;

export default withRouter(QualificationAudit);
