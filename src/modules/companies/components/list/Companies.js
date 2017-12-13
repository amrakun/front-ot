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
import { newRfqPath, newEoiPath } from '../../../common/constants';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.func
};

class CompaniesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCompanies: [],
      productCodes: [],
      region: ['Umnugovi'],
      status: statusOptions
    };

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  onProductCodesChange(value) {
    this.setState({ productCodes: value });
  }

  onSelectedCompaniesChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  onRegionChange(values) {
    this.region = values;
  }

  onStatusChange(values) {
    this.status = values;
  }

  filter() {
    const { region, status, productCodes } = this.state;
    this.props.filter({
      region,
      status,
      productCodes
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
                onSearch={value => console.log(value)}
              />
              <Link
                to={{
                  pathname: newEoiPath,
                  state: { companies: selectedCompanies }
                }}
                className="ant-btn"
              >
                Send EOI
              </Link>
              <Link
                to={{
                  pathname: newRfqPath,
                  state: { companies: selectedCompanies }
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
              rowKey={record => record}
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
