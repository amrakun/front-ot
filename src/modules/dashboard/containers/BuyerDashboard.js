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

    tendersTotalCounttrfq,
    tenderCountByStatustrfq,
    tendersAverageDurationtrfq,
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
    tendersTotalCounttrfq.error ||
    tenderCountByStatustrfq.error ||
    tendersAverageDurationtrfq.error
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
    tendersTotalCounttrfq.loading ||
    tenderCountByStatustrfq.loading ||
    tendersAverageDurationtrfq.loading
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

    trfqTotalCount: tendersTotalCounttrfq.tendersTotalCountReport,
    trfqData: byMonthOrNot(tenderCountByStatustrfq.tenderCountByStatus),
    trfqAverageDuration: tendersAverageDurationtrfq.tendersAverageDuration
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

  tenderCountByStatustrfq: PropTypes.object,
  tendersTotalCounttrfq: PropTypes.object,
  tendersAverageDurationtrfq: PropTypes.object,

  queryParams: PropTypes.object
};

const generateDateVariables = ({ startDate, endDate }) => {
  return {
    startDate: startDate
      ? new Date(startDate)
      : moment()
          .subtract(30, 'days')
          .format('YYYY-MM-DD'),
    endDate: endDate ? new Date(endDate) : moment().format('YYYY-MM-DD')
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
  ...generateCountQueries('trfq')
)(DashboardContainer);
