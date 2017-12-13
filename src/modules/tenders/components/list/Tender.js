import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Input } from 'antd';
import { tenderColumns } from '../../constants';
import { newRfqPath, newEoiPath } from 'modules/common/constants';

const Search = Input.Search;

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
      selectedCompanies: []
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
    const { selectedCompanies } = this.state;

    return (
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
        </div>

        <Table
          rowSelection={{
            selectedCompanies,
            onChange: this.onSelectedCompaniesChange
          }}
          columns={tenderColumns}
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
    );
  }
}

CompaniesList.propTypes = propTypes;

export default withRouter(CompaniesList);
