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
    tenderCountByStatusRfq,
    tenderCountByStatusEoi,
    tendersTotalCountRfq,
    tendersTotalCountEoi,
    tendersAverageDurationRfq,
    tendersAverageDurationEoi,
    queryParams
  } = props;

  if (
    companiesCountByTierTypeQuery.loading ||
    companiesCountByProductCodeQuery.loading ||
    ccbrvpQuery.loading ||
    tenderCountByStatusRfq.loading ||
    tenderCountByStatusEoi.loading ||
    tendersTotalCountRfq.loading ||
    tendersTotalCountEoi.loading ||
    tendersAverageDurationRfq.loading ||
    tendersAverageDurationEoi.loading
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
    eoiData: byMonthOrNot(tenderCountByStatusEoi.tenderCountByStatus),
    rfqData: byMonthOrNot(tenderCountByStatusRfq.tenderCountByStatus),

    eoiTotalCount: tendersTotalCountEoi.tendersTotalCountReport,
    rfqTotalCount: tendersTotalCountRfq.tendersTotalCountReport,

    eoiAverageDuration: tendersAverageDurationEoi.tendersAverageDuration,
    rfqAverageDuration: tendersAverageDurationRfq.tendersAverageDuration
  };

  return <BuyerDashboard {...updatedProps} />;
};

DashboardContainer.propTypes = {
  companiesCountByTierTypeQuery: PropTypes.object,
  companiesCountByProductCodeQuery: PropTypes.object,
  ccbrvpQuery: PropTypes.object,
  tenderCountByStatusRfq: PropTypes.object,
  tenderCountByStatusEoi: PropTypes.object,
  tendersTotalCountRfq: PropTypes.object,
  tendersTotalCountEoi: PropTypes.object,
  tendersAverageDurationRfq: PropTypes.object,
  tendersAverageDurationEoi: PropTypes.object,
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

  graphql(gql(queries.tenderCountByStatus), {
    name: 'tenderCountByStatusEoi',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'eoi'
      }
    })
  }),

  graphql(gql(queries.tenderCountByStatus), {
    name: 'tenderCountByStatusRfq',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'rfq'
      }
    })
  }),

  graphql(gql(queries.tendersTotalCountReport), {
    name: 'tendersTotalCountRfq',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'rfq'
      }
    })
  }),

  graphql(gql(queries.tendersTotalCountReport), {
    name: 'tendersTotalCountEoi',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'eoi'
      }
    })
  }),

  graphql(gql(queries.tendersAverageDuration), {
    name: 'tendersAverageDurationEoi',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'eoi'
      }
    })
  }),

  graphql(gql(queries.tendersAverageDuration), {
    name: 'tendersAverageDurationRfq',
    options: ({ queryParams }) => ({
      variables: {
        ...generateDateVariables(queryParams),
        type: 'rfq'
      }
    })
  })
)(DashboardContainer);
