import React from 'react';
import PropTypes from 'prop-types';
import { SupplierTenders } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message } from 'antd';

class TendersContainer extends React.Component {
  componentWillMount() {
    const { tendersTableQuery } = this.props;
    const location = this.props.location || {};

    if (location.search === '?refetch') {
      tendersTableQuery.refetch();
    }
  }

  render() {
    const {
      tendersTableQuery,
      tendersResponsesAdd,
      type,
      tendersCountQuery
    } = this.props;
    const { __, currentUser } = this.context;

    if (tendersTableQuery.loading || tendersCountQuery.loading) {
      return <SupplierTenders loading={true} />;
    }

    const notInterested = tenderId => {
      tendersResponsesAdd({
        variables: {
          tenderId: tenderId,
          supplierId: currentUser.companyId,
          isNotInterested: true
        }
      })
        .then(() => {
          message.success(__('Not interested tender has been removed'));
          tendersTableQuery.refetch();
        })
        .catch(error => {
          message.error('Error occurred' + error);
        });
    };

    const tenders = tendersTableQuery.tendersSupplier || [];
    const totalCount = tendersCountQuery.tendersSupplierTotalCount || 1;

    const updatedProps = {
      ...this.props,
      data: tenders,
      type: type,
      notInterested: notInterested,
      currentUser: currentUser,
      exportTenders: this.exportTenders,
      totalCount
    };

    return <SupplierTenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  tendersTableQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  queryParams: PropTypes.object,
  supplierId: PropTypes.string,
  tendersCountQuery: PropTypes.object
};

TendersContainer.contextTypes = {
  __: PropTypes.func,
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.tendersSupplier), {
    name: 'tendersTableQuery',
    options: ({ type, queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          month: queryParams ? queryParams.month : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries.totalSupplierTenders), {
    name: 'tendersCountQuery',
    options: ({ type, queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          month: queryParams ? queryParams.month : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(TendersContainer);
