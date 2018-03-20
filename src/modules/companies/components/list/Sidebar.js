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
    const statusQuery = query.status ? query.status.split(',') : null;
    const productCodesQuery = query.productCodes
      ? query.productCodes.split(',')
      : null;

    this.state = {
      productCodes: productCodesQuery || [],
      region: regionQuery || [],
      status: statusQuery || [],
      difotRange: query.difotRange || '76-100'
    };

    this.handleChange = this.handleChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleChange(filter) {
    this.setState({ ...filter });
    this.filter(filter);
  }

  filter(filter) {
    const { history } = this.props;
    const { region, status, productCodes, difotRange } = this.state;

    let regionString = '';
    let statusString = '';
    let productCodesString = '';

    region.forEach(i => {
      regionString += i + ',';
    });
    status.forEach(i => {
      statusString += i + ',';
    });
    productCodes.forEach(i => {
      productCodesString += i + ',';
    });

    const filterValues = {
      region: regionString.replace(/.$/, ''),
      status: statusString.replace(/.$/, ''),
      productCodes: productCodesString.replace(/.$/, ''),
      ...filter
    };

    if (status.includes('byDifotScore')) {
      filterValues.difotRange = difotRange;
    }

    router.setParams(history, filterValues);
  }

  render() {
    const { productCodes, status, region, difotRange } = this.state;
    const { suppliersCount, checkedCount } = this.props;

    const statusOptions = () => {
      return [
        { label: 'Pre-qualified', value: 'isPrequalified' },
        { label: 'Qualified', value: 'isQualified' },
        { label: 'Validated', value: 'isProductsInfoValidated' },
        { label: 'Include blocked suppliers', value: 'includeBlocked' },
        {
          label: [
            <span key={0}>By DIFOT score - </span>,
            <Select
              key={1}
              value={difotRange}
              disabled={!status.includes('byDifotScore')}
              onChange={this.onDifotRangeChange}
              size="small"
            >
              <Option value="0-25">0% - 25%</Option>
              <Option value="26-50">26% - 50%</Option>
              <Option value="51-75">51% - 75%</Option>
              <Option value="76-100">76% - 100%</Option>
            </Select>
          ],
          value: 'byDifotScore'
        }
      ];
    };

    return (
      <Col span={5}>
        <Card title="Suppliers">
          <div className="suppliers-count">
            {suppliersCount}
            <small>/</small>
            {checkedCount}
          </div>
        </Card>

        <Card title="Products & services code" className="margin">
          <TreeSelect
            treeData={productsTree}
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
          <CheckboxGroup
            options={statusOptions()}
            value={status}
            className="horizontal"
            onChange={value => this.handleChange({ status: value })}
          />
        </Card>
      </Col>
    );
  }
}

Sidebar.propTypes = propTypes;

export default withRouter(Sidebar);
