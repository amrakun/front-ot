import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from 'modules/common/components';
import { MailDeliveries } from '../components';
import { queries } from '../graphql';

const MailDeliveriesContainer = props => {
  const { deliveriesQuery, deliveriesTotalCountQuery, queryParams } = props;

  if (deliveriesQuery.error || deliveriesTotalCountQuery.error) {
    return null;
  }

  if (deliveriesQuery.loading || deliveriesTotalCountQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    ...props,
    search: queryParams.search,
    deliveries: deliveriesQuery.mailDeliveries || [],
    totalCount: deliveriesTotalCountQuery.mailDeliveriesTotalCount || 0,
  };

  return <MailDeliveries {...updatedProps} />;
};

MailDeliveriesContainer.propTypes = {
  deliveriesQuery: PropTypes.object.isRequired,
  deliveriesTotalCountQuery: PropTypes.object.isRequired,
};

export default compose(
  graphql(gql(queries.mailDeliveries), {
    name: 'deliveriesQuery',
    options: ({ queryParams }) => ({
      variables: {
        old: queryParams.old,
        search: queryParams.search,
        page: queryParams.page ? Number(queryParams.page) : 1,
        perPage: queryParams.perPage ? Number(queryParams.perPage) : 15,
      },
    }),
  }),
  graphql(gql(queries.mailDeliveriesTotalCount), {
    name: 'deliveriesTotalCountQuery',
    options: ({ queryParams }) => ({
      variables: {
        old: queryParams.old,
        search: queryParams.search,
      },
    }),
  })
)(withRouter(MailDeliveriesContainer));
