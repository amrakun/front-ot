import React from 'react';
import { Table, Card } from 'antd';

import reqwest from 'reqwest';

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Open',
        value: 'open'
      },
      {
        text: 'Draft',
        value: 'draft'
      },
      {
        text: 'Closed',
        value: 'closed'
      }
    ]
  },
  {
    title: 'Tender #',
    dataIndex: 'tender_number',
    sorter: true
  },
  {
    title: 'Tender name',
    dataIndex: 'tender_name'
  },
  {
    title: 'Publish date',
    dataIndex: 'publish_date'
  },
  {
    title: 'Close date',
    dataIndex: 'close_date'
  },
  {
    title: 'Suppliers',
    dataIndex: 'suppliers'
  },
  {
    title: 'Sumbitted',
    dataIndex: 'submitted'
  },
  {
    title: 'Not interested',
    dataIndex: 'not_interested'
  },
  {
    title: 'Not responded',
    dataIndex: 'not_responded'
  },
  {
    title: 'Regret letter',
    dataIndex: 'regret_letter'
  },
  {
    title: 'Operation',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="">More</a>
  }
];

class Eoi extends React.Component {
  state = {
    data: [],
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
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      // url: 'https://randomapi.com/api/4883c5396815ac927ac8c8f21f440c7b',
      method: 'get',
      data: {
        results: 10,
        ...params
      },
      type: 'json'
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
      });
    });
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Card title="Expression of interest (EOI)">
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    );
  }
}

export default Eoi;
