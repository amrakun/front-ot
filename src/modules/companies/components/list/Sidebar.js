import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Card, Col, Checkbox, Select } from 'antd';
import { regionOptions } from '../../constants';
import { ProductsTree } from 'modules/common/components';
import router from 'modules/common/router';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const propTypes = {
  history: PropTypes.object,
  suppliersCount: PropTypes.number,
  checkedCount: PropTypes.number,
  stats: PropTypes.node
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const { region, productCodes } = query;

    const regionQuery = region && region.split(',');
    const productCodesQuery = productCodes && productCodes.split(',');

    this.state = {
      productCodes: productCodesQuery || [],
      region: regionQuery || [],
      difotRange: query.difotRange || '',
      prequalifiedStatus: query.prequalifiedStatus || '',
      qualifiedStatus: query.qualifiedStatus || '',
      productsInfoStatus: query.productsInfoStatus || '',
      includeBlocked: query.includeBlocked || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleChange(filter) {
    this.setState({ ...filter }, () => {
      this.filter(filter);
    });
  }

  handleSelect(value, name) {
    this.setState({ [name]: value }, () => {
      this.filter({ [name]: value });
    });
  }

  filter(filter) {
    const { history } = this.props;

    const {
      region,
      productCodes,
      difotRange,
      prequalifiedStatus,
      qualifiedStatus,
      productsInfoStatus,
      includeBlocked
    } = this.state;

    let regionString = '';
    let productCodesString = '';

    region.forEach(i => {
      regionString += i + ',';
    });

    productCodes.forEach(i => {
      productCodesString += i + ',';
    });

    const filterValues = {
      ...filter,
      region: regionString.replace(/.$/, ''),
      productCodes: productCodesString.replace(/.$/, ''),
      difotRange,
      prequalifiedStatus,
      qualifiedStatus,
      productsInfoStatus,
      includeBlocked
    };

    filterValues.difotRange = difotRange;

    router.setParams(history, filterValues);
  }

  renderDifotSelect() {
    return (
      <tr key="difotRange">
        <td>
          <label>By DIFOT score</label>
        </td>
        <td>
          <Select
            onChange={e => this.handleSelect(e, 'difotRange')}
            size="small"
            value={this.state.difotRange}
          >
            <Option value="">All</Option>
            <Option value="0-25">0% - 25%</Option>
            <Option value="26-50">26% - 50%</Option>
            <Option value="51-74">51% - 74%</Option>
            <Option value="75-100">75% - 100%</Option>
          </Select>
        </td>
      </tr>
    );
  }

  renderBlockSelect() {
    return (
      <tr key="block">
        <td>
          <label>Blocked suppliers</label>
        </td>
        <td>
          <Select
            onChange={e => this.handleSelect(e, 'includeBlocked')}
            size="small"
            value={this.state.includeBlocked}
          >
            <Option value="true">include</Option>
            <Option value="">Not include</Option>
          </Select>
        </td>
      </tr>
    );
  }

  renderSelect({ name, label, included, notIncluded }) {
    return (
      <tr key={name}>
        <td>
          <label>{label}</label>
        </td>
        <td>
          <Select
            onChange={e => this.handleSelect(e, name)}
            size="small"
            value={this.state[name]}
          >
            <Option value="">All</Option>
            <Option value="yes">{included}</Option>
            <Option value="no">{notIncluded}</Option>
            <Option value="undefined">In process</Option>
          </Select>
        </td>
      </tr>
    );
  }

  render() {
    const { productCodes, region } = this.state;
    const { suppliersCount, checkedCount, stats } = this.props;

    return (
      <Col span={5}>
        <Card title="Suppliers">
          <div className="suppliers-count">
            {suppliersCount}
            {checkedCount !== undefined && (
              <span>
                <small>/</small>
                {checkedCount}
              </span>
            )}
          </div>
          {stats}
        </Card>

        <Card title="Select product & service code" className="margin">
          <ProductsTree
            value={productCodes}
            onChange={value => this.handleChange({ productCodes: value })}
            style={{ width: '100%' }}
          />
        </Card>

        <Card title="Select suppliers by tier type" className="margin">
          <CheckboxGroup
            options={regionOptions}
            value={region}
            className="horizontal"
            onChange={value => this.handleChange({ region: value })}
          />
        </Card>

        <Card
          title="Select suppliers by qualification status"
          className="margin"
        >
          <table className="suppliers-filter">
            <tbody>
              {this.renderSelect({
                name: 'prequalifiedStatus',
                label: 'Pre-qualified',
                included: 'Pre-qualified',
                notIncluded: 'Not qualified'
              })}
              {this.renderSelect({
                name: 'qualifiedStatus',
                label: 'Qualified',
                included: 'Qualified',
                notIncluded: 'Not qualified'
              })}
              {this.renderSelect({
                name: 'productsInfoStatus',
                label: 'Validated',
                included: 'Validated',
                notIncluded: 'Not validated'
              })}
              {this.renderBlockSelect()}
              {this.renderDifotSelect()}
            </tbody>
          </table>
        </Card>
      </Col>
    );
  }
}

Sidebar.propTypes = propTypes;

export default withRouter(Sidebar);
