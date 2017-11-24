import React from 'react'
import PropTypes from 'prop-types';
import reqwest from 'reqwest';
import { RfqList } from '../components';

class Rfq extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      // url: 'https://randomapi.com/api/4883c5396815ac927ac8c8f21f440c7b',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    // const {
    //   this.state.data,
    //   this.state.pagination,
    // } = this.props;
    return (
      <RfqList data={this.state.data} pagination={this.state.pagination} loading={this.state.loading} onChange={(pagination, filters, sorter) => this.handleTableChange(pagination, filters, sorter)} />
    );
  }
}

export default Rfq;
