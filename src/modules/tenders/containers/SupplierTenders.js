import React from 'react';
import PropTypes from 'prop-types';
import { Tenders } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message } from 'antd';
import { withTableProps } from 'modules/common/containers';

class TendersContainer extends React.Component {
  componentWillMount() {
    const { tendersQuery } = this.props;
    const location = this.props.location || {};

    if (location.search === '?refetch') {
      tendersQuery.refetch();
    }
  }

  render() {
    const { tendersQuery, tendersResponsesAdd } = this.props;
    const { currentUser } = this.context;

    if (tendersQuery.loading) {
      return <Tenders loading={true} />;
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
          message.success('Not interested tender has been removed');
          tendersQuery.refetch();
        })
        .catch(error => {
          message.error('Error occurred' + error);
        });
    };

    const tenders = tendersQuery.tendersSupplier || [];

    const updatedProps = {
      ...this.props,
      data: tenders,
      type: this.type,
      notInterested: notInterested,
      currentUser: currentUser,
      exportTenders: this.exportTenders
    };

    return <Tenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  tendersQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  queryParams: PropTypes.object,
  supplierId: PropTypes.string
};

TendersContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.tendersSupplier), {
    name: 'tendersQuery',
    options: ({ type, supplierId, queryParams }) => {
      return {
        variables: {
          page: 1,
          perPage: 1,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          supplierId: supplierId,
          ignoreSubmitted: queryParams ? queryParams.ignoreSubmitted : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(withTableProps(TendersContainer));
