import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { SuppliersList } from '../components';

class SuppliersContainer extends React.Component {
  state = {
    data: {},
    pagination: {},
    loading: false
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };
  fetch = (params = {}) => {
    console.log('fetch');
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = 200;
    this.setState({
      loading: false,
      data: this.props.companyDetailQuery.companyDetail,
      pagination
    });
    console.log(this.props.companyDetailQuery);
  };
  componentWillMount() {
    this.fetch();
  }
  render() {
    console.log('render');
    const { data } = this.state.data || {};
    return (
      <SuppliersList
        data={data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={(pagination, filters, sorter) =>
          this.handleTableChange(pagination, filters, sorter)
        }
      />
    );
  }
}

SuppliersContainer.propTypes = {
  companyDetailQuery: PropTypes.object
};

export default graphql(gql(queries.companyDetail), {
  name: 'companyDetailQuery'
})(SuppliersContainer);
