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
    tenderCountByStatus
  } = props;

  if (
    companiesCountByTierTypeQuery.loading ||
    ccbrvpQuery.loading ||
    tenderCountByStatus.loading
  ) {
    return <Loading />;
  }

  console.log(tenderCountByStatus);
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

  // product & service code chart data ===============
  const productData = [];
  const ccb = ccbrvpQuery.companiesCountByRegisteredVsPrequalified;

  Object.keys(ccb).forEach(key => {
    productData.push({ name: key, ...ccb[key] });
  });

  const updatedProps = {
    ...props,
    companiesByTierType,
    productData
  };

  return <Dashboard {...updatedProps} />;
};

DashboardContainer.propTypes = {
  companiesCountByTierTypeQuery: PropTypes.object,
  ccbrvpQuery: PropTypes.object,
  tenderCountByStatus: PropTypes.object
};

export default compose(
  graphql(gql(queries.companiesCountByTierType), {
    name: 'companiesCountByTierTypeQuery',
    options: () => ({
      variables: {
        startDate: new Date('1900-01-01'),
        endDate: new Date('2040-09-26')
      }
    })
  }),

  graphql(gql(queries.companiesCountByRegisteredVsPrequalified), {
    name: 'ccbrvpQuery',
    options: () => ({
      variables: {
        startDate: new Date('1900-01-01'),
        endDate: new Date('2040-09-26'),
        productCodes: 'code1'
      }
    })
  }),

  graphql(gql(queries.tenderCountByStatus), {
    name: 'tenderCountByStatus',
    options: () => ({
      variables: {
        startDate: new Date('1900-01-01'),
        endDate: new Date('2040-09-26'),
        type: 'eoi'
      }
    })
  })
)(DashboardContainer);
