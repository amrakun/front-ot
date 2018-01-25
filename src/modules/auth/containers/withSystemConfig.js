import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { queries } from '../graphql';

const withSystemConfig = Component => {
  const Container = props => {
    const { systemConfigQuery } = props;

    const updatedProps = {
      ...props,
      systemConfig: systemConfigQuery.config
    };

    return <Component {...updatedProps} />;
  };

  Container.propTypes = {
    systemConfigQuery: PropTypes.object
  };

  return compose(
    graphql(gql(queries.systemConfig), {
      name: 'systemConfigQuery'
    })
  )(Container);
};

export default withSystemConfig;
