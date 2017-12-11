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
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
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

    this.regionValues = ['Umnugovi'];
    this.statusValues = statusOptions;

    this.state = {
      treeValue: ['0-0-0'],
      selectedRowKeys: []
    };

    this.onTreeChange = this.onTreeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onRegionCheck = this.onRegionCheck.bind(this);
    this.onStatusCheck = this.onStatusCheck.bind(this);
    this.filter = this.filter.bind(this);
  }

  onTreeChange(value) {
    this.setState({ treeValue: value });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  onRegionCheck(checkedValues) {
    this.regionValues = checkedValues;
  }

  onStatusCheck(checkedValues) {
    this.statusValues = checkedValues;
  }

  filter() {
    const { filter } = this.props;
    filter({
      region: this.regionValues,
      status: this.statusValues
    });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const selectedCompanies = selectedRowKeys;
    const tProps = {
      treeData,
      value: this.state.treeValue,
      onChange: this.onTreeChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%'
      }
    };

    return (
      <Row gutter={16}>
        <Col span={4}>
          <Card bordered={false} title="Products & services">
            <TreeSelect {...tProps} />
          </Card>
          <Card bordered={false} title="Region" className="margin">
            <CheckboxGroup
              options={regionOptions}
              defaultValue={this.regionValues}
              className="horizontal"
              onChange={this.onRegionCheck}
            />
          </Card>
          <Card bordered={false} title="Status" className="margin">
            <CheckboxGroup
              options={statusOptions}
              defaultValue={this.statusValues}
              className="horizontal"
              onChange={this.onStatusCheck}
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
              rowSelection={rowSelection}
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
