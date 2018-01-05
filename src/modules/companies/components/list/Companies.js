import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Table,
  Card,
  Row,
  Col,
  TreeSelect,
  Checkbox,
  Button,
  Icon,
  Input,
  message
} from 'antd';
import { columns, regionOptions, statusOptions } from '../../constants';
import productsTree from '../../productsTree';
import AddMore from './AddMore';
import queryString from 'query-string';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const initialRegion = ['umnugovi'];
const initialStatus = [
  'preQualified',
  'qualifiedAndAudited',
  'validated',
  'byDifotScore',
  'includeBlockedCompanies'
];

const propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.func,
  history: PropTypes.object
};

class CompaniesList extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const regionQuery = query.region ? query.region.split(',') : null;
    const statusQuery = query.status ? query.status.split(',') : null;
    const productCodesQuery = query.productCodes
      ? query.productCodes.split(',')
      : null;
    const searchQuery = query.search;

    this.state = {
      selectedCompanies: [],
      productCodes: productCodesQuery || [],
      region: regionQuery || initialRegion,
      status: statusQuery || initialStatus,
      search: searchQuery || ''
    };

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.filter = this.filter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  onProductCodesChange(value) {
    this.setState({ productCodes: value });
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  onRegionChange(values) {
    this.setState({ region: values });
  }

  onStatusChange(values) {
    this.setState({ status: values });
  }

  handleSend(path) {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier to continue!')
      : this.props.history.push(path, { supplierIds: selectedCompanies });
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      pathname: '/companies',
      search: queryString.stringify(query)
    });
  }

  filter() {
    const { history } = this.props;
    const { region, status, productCodes } = this.state;

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

    const stringified = queryString.stringify({
      region: regionString.replace(/.$/, ''),
      status: statusString.replace(/.$/, ''),
      productCodes: productCodesString.replace(/.$/, '')
    });

    history.push({
      pathname: '/companies',
      search: stringified
    });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    const {
      selectedCompanies,
      productCodes,
      status,
      region,
      search
    } = this.state;

    return (
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Products & services">
            <TreeSelect
              treeData={productsTree}
              value={productCodes}
              onChange={this.onProductCodesChange}
              treeCheckable={true}
              searchPlaceholder="Please select"
              style={{ width: '100%' }}
            />
          </Card>

          <Card title="Select supplier tier type" className="margin">
            <CheckboxGroup
              options={regionOptions}
              defaultValue={region}
              className="horizontal"
              onChange={this.onRegionChange}
            />
          </Card>

          <Card title="Status" className="margin">
            <CheckboxGroup
              options={statusOptions}
              defaultValue={status}
              className="horizontal"
              onChange={this.onStatusChange}
            />
          </Card>

          <Button
            style={{ width: '100%', marginTop: '16px' }}
            onClick={this.filter}
          >
            Apply filters<Icon type="right" />
          </Button>
        </Col>
        <Col span={18}>
          <Card title="Companies">
            <div className="table-operations">
              <Search
                defaultValue={search}
                placeholder="Supplier name or SAP number"
                style={{ width: 200, float: 'left' }}
                onSearch={value => this.handleSearch(value)}
              />
              <Button onClick={() => this.handleSend('/eoi/publish')}>
                Send EOI
              </Button>
              <Button onClick={() => this.handleSend('/rfq/publish')}>
                Send RFQ
              </Button>
              <AddMore />
            </div>

            <Table
              rowSelection={{
                selectedCompanies,
                onChange: this.onSelectedCompaniesChange
              }}
              columns={columns}
              rowKey={record => record._id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              scroll={{ x: 1600 }}
              onChange={(pagination, filters, sorter) =>
                onChange(pagination, filters, sorter)
              }
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

CompaniesList.propTypes = propTypes;

export default withRouter(CompaniesList);
