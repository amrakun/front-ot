import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Card, Col, TreeSelect, Checkbox, Button, Icon, Select } from 'antd';
import { regionOptions } from '../../constants';
import productsTree from '../../productsTree';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const propTypes = {
  history: PropTypes.object,
  suppliersCount: PropTypes.number
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

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onDifotRangeChange = this.onDifotRangeChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  onProductCodesChange(value) {
    this.setState({ productCodes: value });
  }

  onRegionChange(values) {
    this.setState({ region: values });
  }

  onStatusChange(values) {
    this.setState({ status: values });
  }

  onDifotRangeChange(value) {
    this.setState({ difotRange: value });
  }

  filter() {
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
      productCodes: productCodesString.replace(/.$/, '')
    };

    if (status.includes('byDifotScore')) {
      filterValues.difotRange = difotRange;
    }

    history.push({ search: queryString.stringify(filterValues) });
  }

  render() {
    const { productCodes, status, region, difotRange } = this.state;
    const { suppliersCount } = this.props;

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
          <div style={{ fontSize: '30px', textAlign: 'center' }}>
            {suppliersCount}
          </div>
        </Card>

        <Card title="Products & services code" className="margin">
          <TreeSelect
            treeData={productsTree}
            allowClear={true}
            value={productCodes}
            onChange={this.onProductCodesChange}
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
            onChange={this.onRegionChange}
          />
        </Card>

        <Card title="Select supplier by status" className="margin">
          <CheckboxGroup
            options={statusOptions()}
            value={status}
            className="horizontal"
            onChange={this.onStatusChange}
          />
        </Card>

        <Button
          style={{ width: '100%', marginTop: '16px' }}
          type="primary"
          onClick={this.filter}
        >
          Apply filters<Icon type="right" />
        </Button>
      </Col>
    );
  }
}

Sidebar.propTypes = propTypes;

export default withRouter(Sidebar);
