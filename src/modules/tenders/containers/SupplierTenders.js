import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { SupplierTenders } from '../components';
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
    const { tendersTableQuery, tendersCountQuery } = this.props;

    const { currentUser } = this.context;

    if (tendersTableQuery.loading || tendersCountQuery.loading) {
      return <SupplierTenders {...{ ...this.props, loading: true }} />;
    }

    const tenders = tendersTableQuery.tendersSupplier || [];
    const totalCount = tendersCountQuery.tendersSupplierTotalCount || 1;

    const updatedProps = {
      ...this.props,
      data: tenders,
      currentUser: currentUser,
      exportTenders: this.exportTenders,
      totalCount,
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
  tendersCountQuery: PropTypes.object,
};

TendersContainer.contextTypes = {
  __: PropTypes.func,
  currentUser: PropTypes.object,
};

export default compose(...listCommonQueriesGenerator('tendersSupplier', 'totalSupplierTenders'))(
  TendersContainer
);
