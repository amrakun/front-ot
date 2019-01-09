import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { gql, graphql, compose } from 'react-apollo';
import { exportFile, Loading } from 'modules/common/components';
import { BuyerTenders } from '../components';
import { queries, mutations } from '../graphql';
import listCommonQueriesGenerator from './listCommonQueriesGenerator';

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tenders: [] };

    this.exportTenders = this.exportTenders.bind(this);
    this.cancelTender = this.cancelTender.bind(this);
  }

  componentDidMount() {
    const { tendersTableQuery, location = {} } = this.props;

    if (location.search === '?refetch') {
      tendersTableQuery.refetch();
    }
  }

  exportTenders() {
    const { queryParams, type, supplierId } = this.props;

    this.setState({ exportLoading: true });

    exportFile({
      query: queries.exportTenders,
      name: 'exportTenders',
      variables: {
        search: queryParams ? queryParams.search : '',
        status: queryParams ? queryParams.status : '',
        type: type,
        supplierId: supplierId,
        ignoreSubmitted: queryParams ? queryParams.ignoreSubmitted : ''
      },
      onFinish: () => this.setState({ exportLoading: false })
    });
  }

  cancelTender(_id) {
    const { tendersCancel, tendersTableQuery } = this.props;

    tendersCancel({
      variables: { _id }
    })
      .then(() => {
        tendersTableQuery.refetch();
        message.success('Canceled a tender');
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  render() {
    const { tendersTableQuery, tendersCountQuery } = this.props;

    if (tendersTableQuery.error || tendersCountQuery.error) {
      return null;
    }

    if (tendersTableQuery.loading || tendersCountQuery.loading) {
      return <Loading />;
    }

    const { exportLoading } = this.state;
    const tenders = tendersTableQuery.tenders || [];
    const totalCount = tendersCountQuery.tendersBuyerTotalCount || 0;

    const updatedProps = {
      ...this.props,
      exportLoading,
      totalCount,
      cancelTender: this.cancelTender,
      data: tenders,
      exportTenders: this.exportTenders
    };

    return <BuyerTenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  tendersTableQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  tendersCancel: PropTypes.func,
  queryParams: PropTypes.object,
  supplierId: PropTypes.string,
  tendersCountQuery: PropTypes.object
};

export default compose(
  ...listCommonQueriesGenerator('tendersBuyer', 'totalBuyerTenders'),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  }),

  graphql(gql(mutations.tendersCancel), {
    name: 'tendersCancel'
  })
)(TendersContainer);
