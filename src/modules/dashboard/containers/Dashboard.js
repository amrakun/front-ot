import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import { Loading } from 'modules/common/components';
import { Dashboard } from '../components';

const DashboardContainer = props => {
  const {
    companiesCountByTierTypeQuery,
    ccbrvpQuery,
    tenderCountByStatusRfq,
    tenderCountByStatusEoi,
    tendersTotalCountRfq,
    tendersTotalCountEoi
  } = props;

  if (
    companiesCountByTierTypeQuery.loading ||
    ccbrvpQuery.loading ||
    tenderCountByStatusRfq.loading ||
    tenderCountByStatusEoi.loading ||
    tendersTotalCountRfq.loading ||
    tendersTotalCountEoi.loading
  ) {
    return <Loading />;
  }

  // tier type chart data ===============
  const companiesByTierType = [];

  companiesCountByTierTypeQuery.companiesCountByTierType.forEach(s => {
    if (s._id) {
      companiesByTierType.push({
        name: s._id,
        value: s.count
      });
    }
  });

  const renderData = object => {
    const array = [];

    Object.keys(object).forEach(key => {
      array.push({ name: key, ...object[key] });
    });

    return array;
  };

  const updatedProps = {
    ...props,
    companiesByTierType,
    productData: renderData(
      ccbrvpQuery.companiesCountByRegisteredVsPrequalified
    ),
    eoiData: renderData(tenderCountByStatusEoi.tenderCountByStatus),
    rfqData: renderData(tenderCountByStatusRfq.tenderCountByStatus),

    eoiTotalCount: tendersTotalCountEoi.tendersTotalCount,
    rfqTotalCount: tendersTotalCountRfq.tendersTotalCount
  };

  return <Dashboard {...updatedProps} />;
};

DashboardContainer.propTypes = {
  companiesCountByTierTypeQuery: PropTypes.object,
  ccbrvpQuery: PropTypes.object,
  tenderCountByStatusRfq: PropTypes.object,
  tenderCountByStatusEoi: PropTypes.object,
  tendersTotalCountRfq: PropTypes.object,
  tendersTotalCountEoi: PropTypes.object
};

export default compose(
  graphql(gql(queries.companiesCountByTierType), {
    name: 'companiesCountByTierTypeQuery',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        )
      }
    })
  }),

  graphql(gql(queries.companiesCountByRegisteredVsPrequalified), {
    name: 'ccbrvpQuery',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        ),
        productCodes: queryParams.productCodes ? queryParams.productCodes : ''
      }
    })
  }),

  graphql(gql(queries.tenderCountByStatus), {
    name: 'tenderCountByStatusEoi',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        ),
        type: 'eoi'
      }
    })
  }),

  graphql(gql(queries.tenderCountByStatus), {
    name: 'tenderCountByStatusRfq',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        ),
        type: 'rfq'
      }
    })
  }),

  graphql(gql(queries.tendersTotalCount), {
    name: 'tendersTotalCountRfq',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        ),
        type: 'rfq'
      }
    })
  }),

  graphql(gql(queries.tendersTotalCount), {
    name: 'tendersTotalCountEoi',
    options: ({ queryParams }) => ({
      variables: {
        startDate: new Date(
          queryParams.startDate ? queryParams.startDate : '1900-01-01'
        ),
        endDate: new Date(
          queryParams.endDate ? queryParams.endDate : '2040-09-26'
        ),
        type: 'eoi'
      }
    })
  })
)(DashboardContainer);
