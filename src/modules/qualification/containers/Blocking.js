import React from 'react';
import PropTypes from 'prop-types';
import { Blocking } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message } from 'antd';

class BlockingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination) {
    this.setState({ pagination });
  }

  render() {
    const {
      blockedCompaniesQuery,
      blockCompaniesMutation,
      unblockCompaniesMutation
    } = this.props;

    if (blockedCompaniesQuery.loading) {
      return <Blocking loading={true} />;
    }

    const blockCompanies = variables => {
      blockCompaniesMutation({ variables })
        .then(() => {
          message.success('Successfully blocked');
          blockedCompaniesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const unblockCompanies = variables => {
      unblockCompaniesMutation({ variables })
        .then(() => {
          message.success('Successfully unblocked');
          blockedCompaniesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const { pagination } = this.state;
    const blockedCompanies = blockedCompaniesQuery.blockedCompanies || [];

    const updatedProps = {
      ...this.props,
      blockCompanies,
      unblockCompanies,
      data: blockedCompanies,
      pagination: {
        total: blockedCompanies.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <Blocking {...updatedProps} />;
  }
}

BlockingContainer.propTypes = {
  blockedCompaniesQuery: PropTypes.object,
  blockCompaniesMutation: PropTypes.func,
  unblockCompaniesMutation: PropTypes.func
};

export default compose(
  graphql(gql(queries.blockedCompanies), {
    name: 'blockedCompaniesQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          search: queryParams.search
        }
      };
    }
  }),

  graphql(gql(mutations.blockCompanies), {
    name: 'blockCompaniesMutation'
  }),

  graphql(gql(mutations.unblockCompanies), {
    name: 'unblockCompaniesMutation'
  })
)(BlockingContainer);
