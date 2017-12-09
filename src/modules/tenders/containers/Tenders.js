import React from 'react';
import { Tenders } from '../components';

const mockData = [
  {
    status: 'open',
    tender_number: 197,
    tender_name: 'Allen Ward',
    publish_date: '2017-11-25',
    close_date: '2017-11-25',
    suppliers: 77,
    submitted: 8,
    not_interested: 2,
    not_responded: 1,
    regret_letter: true
  },
  {
    status: 'closed',
    tender_number: 945,
    tender_name: 'Devon McCullough',
    publish_date: '2017-11-25',
    close_date: '2017-11-25',
    suppliers: 59,
    submitted: 14,
    not_interested: 8,
    not_responded: 9,
    regret_letter: false
  }
];

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    const { type } = props;

    this.title = '(RFQ)';
    if (type === 'eoi') this.title = '(EOI)';

    this.state = {
      data: [],
      pagination: {},
      loading: false
    };
  }

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
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = 200;
    this.setState({
      loading: false,
      data: mockData,
      pagination
    });
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Tenders
        title={this.title}
        data={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={(pagination, filters, sorter) =>
          this.handleTableChange(pagination, filters, sorter)
        }
      />
    );
  }
}

export default TendersContainer;
