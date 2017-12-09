import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Col, TreeSelect, Checkbox } from 'antd';
import {
  columns,
  treeData,
  regionOptions,
  statusOptions
} from '../../constants';
import AddMore from './AddMore';
import { newRfqPath, newEoiPath } from '../../../common/constants';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const CheckboxGroup = Checkbox.Group;
const propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

class CompaniesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValue: ['0-0-0'],
      selectedRowKeys: []
    };
    this.onTreeChange = this.onTreeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  onTreeChange(value) {
    console.log('onTreeChange ', value, arguments);
    this.setState({ treeValue: value });
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    // const selectedCompanies = selectedRowKeys.map((el) => (
    //   data[el]
    // ));
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
              defaultValue={['Umnugovi']}
              className="horizontal"
            />
          </Card>
          <Card bordered={false} title="Status" className="margin">
            <CheckboxGroup
              options={statusOptions}
              defaultValue={statusOptions}
              className="horizontal"
            />
          </Card>
        </Col>
        <Col span={20}>
          <Card bordered={false} title="Companies">
            <div className="table-operations">
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
