import React from 'react';
import queryString from 'query-string';
/**
 * @requires withRouter
 *
 * @example *
 * import { List } from '../components';
 * import { graphql, compose } from 'react-apollo';
 * import { queries } from '../graphql';
 * import { withRouter } from 'react-router-dom';
 * import withQueryParams from 'modules/common/withQueryParams';
 *
 * export default compose(
 *   withRouter,
 *   withQueryParams,
 *   graphql(queries.listForTender, {
 *     options: ({ match }) => {
 *       return {
 *         variables: { tenderId: match.params.id },
 *       };
 *     },
 *   })
 * )(List);
 */
const HOC = Component => {
  const Wrapped = props => {
    const queryParams = queryString.parse(props.location.search);
    return <Component {...props} queryParams={queryParams} />;
  };

  return Wrapped;
};

export default HOC;
