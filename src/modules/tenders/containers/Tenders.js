import React from 'react';
import PropTypes from 'prop-types';
import { Tenders } from '../components';
import { gql, graphql } from 'react-apollo';
import { queries } from '../graphql';

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;

    let type = 'rfq';
    if (type === 'eoi' || (location && location.pathname === '/eoi'))
      type = 'eoi';

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      },
      type: type
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  render() {
    const { tendersQuery } = this.props;
    if (tendersQuery.loading) {
      return <Tenders loading={true} />;
    }

    const { pagination } = this.state;

    const updatedProps = {
      ...this.props,
      data: tendersQuery.tenders,
      pagination: {
        total: tendersQuery.tenders.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      type: this.state.type,
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <Tenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  supplier: PropTypes.bool,
  tendersQuery: PropTypes.object
};

export default graphql(gql(queries.tenders), {
  name: 'tendersQuery',
  options: ({ queryParams }) => {
    return {
      variables: {
        page: 200,
        perPage: 20
      },
      notifyOnNetworkStatusChange: true
    };
  }
})(TendersContainer);
