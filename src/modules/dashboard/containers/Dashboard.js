import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import { Loading } from 'modules/common/components';
import { Dashboard } from '../components';

const DashboardContainer = props => {
  const { companiesCountByTierTypeQuery } = props;

  if (companiesCountByTierTypeQuery.loading) {
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

  const updatedProps = {
    ...props,
    companiesByTierType
  };

  return <Dashboard {...updatedProps} />;
};

DashboardContainer.propTypes = {
  companiesCountByTierTypeQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companiesCountByTierType), {
    name: 'companiesCountByTierTypeQuery'
  })
)(DashboardContainer);
