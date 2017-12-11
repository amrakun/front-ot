import React from 'react';
import PropTypes from 'prop-types';
import { Tenders } from '../components';

const mockData = [
  {
    status: 'open',
    number: 197,
    name: 'Allen Ward',
    publishDate: '2017-11-25',
    closeDate: '2017-11-25',
    suppliers: 77,
    submitted: 8,
    notInterested: 2,
    notResponded: 1,
    regretLetterSent: true
  }
];

const propTypes = {
  type: PropTypes.string,
  location: PropTypes.object
};

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    const { type, location = '' } = props;

    this.title = '(RFQ)';
    if (type === 'eoi' || (location && location.pathname === '/eoi'))
      this.title = '(EOI)';

    this.state = {
      data: [],
      pagination: {},
      loading: false
    };

    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
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
  }
  //params = {}
  fetch() {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = 200;
    this.setState({
      loading: false,
      data: mockData,
      pagination
    });
  }
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

TendersContainer.propTypes = propTypes;

export default TendersContainer;
