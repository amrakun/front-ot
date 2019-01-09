import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { gql, graphql, compose } from 'react-apollo';
import { SupplierTenders } from '../components';
import { mutations } from '../graphql';
import listCommonQueriesGenerator from './listCommonQueriesGenerator';

class TendersContainer extends React.Component {
  componentDidMount() {
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
      tendersCountQuery
    } = this.props;

    const { __, currentUser } = this.context;

    if (tendersTableQuery.loading || tendersCountQuery.loading) {
      return <SupplierTenders {...{ ...this.props, loading: true }} />;
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
  ...listCommonQueriesGenerator('tendersSupplier', 'totalSupplierTenders'),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(TendersContainer);
