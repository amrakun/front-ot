import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Paginator } from 'modules/common/components';

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
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  getWrappedColumns(columns) {
    return [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName', fixed: 'left' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber', fixed: 'left' },
      { title: 'Tier type', dataIndex: 'tierType' },
      {
        title: 'Pre-qualification status',
        render: record => (
          <Link to={`/prequalification-status/${record._id}?view`}>
            {record.isPrequalified ? 'Yes' : 'No'}
          </Link>
        )
      },
      ...columns,
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
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
      scroll: { x: 2000 }
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
