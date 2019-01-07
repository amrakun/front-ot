import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import moment from 'moment';
import { queries } from '../graphql';
import { Loading } from 'modules/common/components';
import { BuyerDashboard } from '../components';

const DashboardContainer = props => {
  const {
    companiesCountByTierTypeQuery,
    companiesCountByProductCodeQuery,
    ccbrvpQuery,

    tenderCountByStatuseoi,
    tendersTotalCounteoi,
    tendersAverageDurationeoi,

    tendersTotalCountrfq,
    tenderCountByStatusrfq,
    tendersAverageDurationrfq,

    tendersTotalCountsrfq,
    tenderCountByStatussrfq,
    tendersAverageDurationsrfq,
    queryParams
  } = props;

  if (
    companiesCountByTierTypeQuery.error ||
    companiesCountByProductCodeQuery.error ||
    ccbrvpQuery.error ||
    tenderCountByStatuseoi.error ||
    tendersTotalCounteoi.error ||
    tendersAverageDurationeoi.error ||
    tendersTotalCountrfq.error ||
    tenderCountByStatusrfq.error ||
    tendersAverageDurationrfq.error ||
    tendersTotalCountsrfq.error ||
    tenderCountByStatussrfq.error ||
    tendersAverageDurationsrfq.error
  ) {
    return null;
  }

  if (
    companiesCountByTierTypeQuery.loading ||
    companiesCountByProductCodeQuery.loading ||
    ccbrvpQuery.loading ||
    tenderCountByStatuseoi.loading ||
    tendersTotalCounteoi.loading ||
    tendersAverageDurationeoi.loading ||
    tendersTotalCountrfq.loading ||
    tenderCountByStatusrfq.loading ||
    tendersAverageDurationrfq.loading ||
    tendersTotalCountsrfq.loading ||
    tenderCountByStatussrfq.loading ||
    tendersAverageDurationsrfq.loading
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

  const groupData = daysData => {
    const monthsData = {};

    Object.keys(daysData).forEach(key => {
      const day = daysData[key];
      const monthKey = moment(key).format('MMM, YYYY');

      Object.keys(day).forEach(k => {
        if (monthsData[monthKey]) {
          const amount = monthsData[monthKey][k] || 0;
          monthsData[monthKey][k] = amount + day[k];
        } else {
          monthsData[monthKey] = {
            ...monthsData[monthKey],
            [k]: day[k]
          };
        }
      });
    });

    return monthsData;
  };

  const renderData = data => {
    const array = [];

    Object.keys(data).forEach(key => {
      array.push({ name: key, ...data[key] });
    });

    return array;
  };

  const byMonthOrNot = object => {
    const data = queryParams.filter === 'byMonth' ? groupData(object) : object;

    return renderData(data);
  };

  const updatedProps = {
    ...props,
    companiesByTierType,
    productCategory: renderData(
      companiesCountByProductCodeQuery.companiesCountByProductCode
    ),
    productData: byMonthOrNot(
      ccbrvpQuery.companiesCountByRegisteredVsPrequalified
    ),
    eoiTotalCount: tendersTotalCounteoi.tendersTotalCountReport,
    eoiData: byMonthOrNot(tenderCountByStatuseoi.tenderCountByStatus),
    eoiAverageDuration: tendersAverageDurationeoi.tendersAverageDuration,

    rfqTotalCount: tendersTotalCountrfq.tendersTotalCountReport,
    rfqData: byMonthOrNot(tenderCountByStatusrfq.tenderCountByStatus),
    rfqAverageDuration: tendersAverageDurationrfq.tendersAverageDuration,

    srfqTotalCount: tendersTotalCountsrfq.tendersTotalCountReport,
    srfqData: byMonthOrNot(tenderCountByStatussrfq.tenderCountByStatus),
    srfqAverageDuration: tendersAverageDurationsrfq.tendersAverageDuration
  };

  return <BuyerDashboard {...updatedProps} />;
};

DashboardContainer.propTypes = {
  companiesCountByTierTypeQuery: PropTypes.object,
  companiesCountByProductCodeQuery: PropTypes.object,
  ccbrvpQuery: PropTypes.object,

  tendersTotalCounteoi: PropTypes.object,
  tenderCountByStatuseoi: PropTypes.object,
  tendersAverageDurationeoi: PropTypes.object,

  tenderCountByStatusrfq: PropTypes.object,
  tendersTotalCountrfq: PropTypes.object,
  tendersAverageDurationrfq: PropTypes.object,

  tenderCountByStatussrfq: PropTypes.object,
  tendersTotalCountsrfq: PropTypes.object,
  tendersAverageDurationsrfq: PropTypes.object,

  queryParams: PropTypes.object
};

const generateDateVariables = queryParams => {
  const startDate = new Date(queryParams.startDate || '1900-01-01');
  const endDate = new Date(queryParams.endDate || '2040-01-01');

  return {
    startDate: moment(startDate),
    endDate: moment(endDate).endOf('month')
  };
};

const generateCountQueries = type => {
  return [
    graphql(gql(queries.tenderCountByStatus), {
      name: `tenderCountByStatus${type}`,
      options: ({ queryParams }) => ({
        variables: {
          ...generateDateVariables(queryParams),
          type
        }
      })
    }),

    graphql(gql(queries.tendersTotalCountReport), {
      name: `tendersTotalCount${type}`,
      options: ({ queryParams }) => ({
        variables: {
          ...generateDateVariables(queryParams),
          type
        }
      })
    }),

    graphql(gql(queries.tendersAverageDuration), {
      name: `tendersAverageDuration${type}`,
      options: ({ queryParams }) => ({
        variables: {
          ...generateDateVariables(queryParams),
          type
        }
      })
    })
  ];
};

export default compose(
  graphql(gql(queries.companiesCountByTierType), {
    name: 'companiesCountByTierTypeQuery',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams)
      }
    })
  }),

  graphql(gql(queries.companiesCountByProductCode), {
    name: 'companiesCountByProductCodeQuery',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams)
      }
    })
  }),

  graphql(gql(queries.companiesCountByRegisteredVsPrequalified), {
    name: 'ccbrvpQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          ...generateDateVariables(queryParams),
          productCodes: queryParams.productCodes ? queryParams.productCodes : ''
        }
      };
    }
  }),

  ...generateCountQueries('eoi'),
  ...generateCountQueries('rfq'),
  ...generateCountQueries('srfq')
)(DashboardContainer);
