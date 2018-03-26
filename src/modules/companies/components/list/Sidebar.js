import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Card, Col, TreeSelect, Checkbox, Select } from 'antd';
import { regionOptions } from '../../constants';
import productsTree from '../../productsTree';
import router from 'modules/common/router';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const propTypes = {
  history: PropTypes.object,
  suppliersCount: PropTypes.number,
  checkedCount: PropTypes.number
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const regionQuery = query.region ? query.region.split(',') : null;

    const productCodesQuery = query.productCodes
      ? query.productCodes.split(',')
      : null;

    this.state = {
      productCodes: productCodesQuery || [],
      region: regionQuery || [],
      difotRange: query.difotRange || '',
      isPrequalified: query.isPrequalified || '',
      isQualified: query.isQualified || '',
      isProductsInfoValidated: query.isProductsInfoValidated || '',
      includeBlocked: query.includeBlocked || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleChange(filter) {
    this.setState({ ...filter });
    this.filter(filter);
  }

  handleSelect(value, name) {
    this.setState({ [name]: value });
    this.filter({ [name]: value });
  }

  filter(filter) {
    const { history } = this.props;
    const {
      region,
      productCodes,
      difotRange,
      isPrequalified,
      isQualified,
      isProductsInfoValidated,
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
      region: regionString.replace(/.$/, ''),
      productCodes: productCodesString.replace(/.$/, ''),
      difotRange,
      isPrequalified,
      isQualified,
      isProductsInfoValidated,
      includeBlocked,
      ...filter
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
            <Option value="51-75">51% - 75%</Option>
            <Option value="76-100">76% - 100%</Option>
          </Select>
        </td>
      </tr>
    );
  }

  renderSelect(name, label) {
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
            <Option value="true">Included</Option>
            <Option value="false">Not included</Option>
          </Select>
        </td>
      </tr>
    );
  }

  render() {
    const { productCodes, region } = this.state;
    const { suppliersCount, checkedCount } = this.props;

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
        </Card>

        <Card title="Products & services code" className="margin">
          <TreeSelect
            treeData={productsTree.en}
            allowClear
            value={productCodes}
            onChange={value => this.handleChange({ productCodes: value })}
            treeCheckable={true}
            searchPlaceholder="Please select"
            style={{ width: '100%' }}
          />
        </Card>

        <Card title="Select supplier by tier type" className="margin">
          <CheckboxGroup
            options={regionOptions}
            value={region}
            className="horizontal"
            onChange={value => this.handleChange({ region: value })}
          />
        </Card>

        <Card title="Select supplier by status" className="margin">
          <table className="suppliers-filter">
            <tbody>
              {this.renderSelect('isPrequalified', 'Pre-qualified')}
              {this.renderSelect('isQualified', 'Qualified')}
              {this.renderSelect('isProductsInfoValidated', 'Validated')}
              {this.renderSelect('includeBlocked', 'Blocked suppliers')}
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
