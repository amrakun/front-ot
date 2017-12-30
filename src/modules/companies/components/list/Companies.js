import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Table,
  Card,
  Row,
  Col,
  TreeSelect,
  Checkbox,
  Button,
  Icon,
  Input
} from 'antd';
import {
  columns,
  treeData,
  regionOptions,
  statusOptions
} from '../../constants';
import AddMore from './AddMore';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

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

    this.state = {
      selectedCompanies: [],
      productCodes: [],
      region: ['umnugovi'],
      status: [
        'preQualified',
        'qualifiedAndAudited',
        'validated',
        'byDifotScore',
        'includeBlockedCompanies'
      ]
    };

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.filter = this.filter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onProductCodesChange(value) {
    this.setState({ productCodes: value });
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  onRegionChange(values) {
    this.region = values;
  }

  onStatusChange(values) {
    this.status = values;
  }

  handleSearch(value) {
    const { history } = this.props;

    const searchValue = 'search=' + value;
    let search = history.location.search;

    search.length > 0
      ? (search = search + '&' + searchValue)
      : (search = search + '?' + searchValue);

    history.push({
      pathname: '/companies',
      search: search
    });
  }

  filter() {
    const { history } = this.props;
    const { region, status, productCodes } = this.state;

    let regionString = '?region=';
    let statusString = '&status=';
    let productCodesString = '&productCodes=';

    region.forEach(i => {
      regionString += i + ',';
    });
    status.forEach(i => {
      statusString += i + ',';
    });
    productCodes.forEach(i => {
      productCodesString += i + ',';
    });

    history.push({
      pathname: '/companies',
      search:
        regionString.replace(/.$/, '') +
        statusString.replace(/.$/, '') +
        productCodesString.replace(/.$/, '')
    });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedCompanies, productCodes, status, region } = this.state;

    return (
      <Row gutter={16}>
        <Col span={4}>
          <Card bordered={false} title="Products & services">
            <TreeSelect
              treeData={treeData}
              value={productCodes}
              onChange={this.onProductCodesChange}
              treeCheckable={true}
              searchPlaceholder="Please select"
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              style={{ width: '100%' }}
            />
          </Card>

          <Card bordered={false} title="Region" className="margin">
            <CheckboxGroup
              options={regionOptions}
              defaultValue={region}
              className="horizontal"
              onChange={this.onRegionChange}
            />
          </Card>

          <Card bordered={false} title="Status" className="margin">
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
        <Col span={20}>
          <Card bordered={false} title="Companies">
            <div className="table-operations">
              <Search
                placeholder="Supplier name or SAP number"
                style={{ width: 200, float: 'left' }}
                onSearch={value => this.handleSearch(value)}
              />
              <Link
                to={{
                  pathname: '/eoi/publish',
                  state: { supplierIds: selectedCompanies }
                }}
                className="ant-btn"
              >
                Send EOI
              </Link>
              <Link
                to={{
                  pathname: '/rfq/publish',
                  state: { supplierIds: selectedCompanies }
                }}
                className="ant-btn"
              >
                Send RFQ
              </Link>
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
