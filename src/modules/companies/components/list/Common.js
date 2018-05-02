import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Paginator } from 'modules/common/components';
import router from 'modules/common/router';

const propTypes = {
  history: PropTypes.object,
  data: PropTypes.array,
  totalCount: PropTypes.number,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default class Common extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCompanies: [] };

    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination, filter, sorter) {
    const columnKey = sorter.columnKey;
    if (columnKey) {
      router.setParams(this.props.history, {
        sortField: columnKey,
        sortDirection: sorter.order === 'descend' ? -1 : 1
      });
    }
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  getWrappedColumns(middleColumns = [], backColumns = []) {
    return [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName', width: 160 },
      { title: 'Vendor number', dataIndex: 'basicInfo.sapNumber', width: 100 },
      {
        title: 'Tier type',
        dataIndex: 'tierTypeDisplay',
        width: 40
      },
      {
        title: 'Pre-qualification status',
        width: 40,
        render: record => (
          <Link to={`/prequalification-status/${record._id}?view`}>
            {record.prequalificationStatusDisplay}
          </Link>
        )
      },
      ...middleColumns,
      { title: 'Contact person', dataIndex: 'contactInfo.name', width: 60 },
      { title: 'Email address', dataIndex: 'contactInfo.email', width: 60 },
      { title: 'Phone number', dataIndex: 'contactInfo.phone', width: 60 },
      ...backColumns
    ];
  }

  renderTable(extraProps) {
    const { loading, totalCount, data } = this.props;

    const props = {
      ...extraProps,
      dataSource: data,
      rowKey: record => record._id,
      pagination: false,
      loading,
      scroll: { x: 1224 },
      onChange: this.handleTableChange
    };

    return (
      <div>
        <Table {...props} />
        <Paginator total={totalCount} />
      </div>
    );
  }
}

Common.propTypes = propTypes;
