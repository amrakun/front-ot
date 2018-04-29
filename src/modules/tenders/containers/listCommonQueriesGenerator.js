import { gql, graphql } from 'react-apollo';
import { queries } from '../graphql';

const generateVariables = ({ type, queryParams }) => {
  const page = queryParams[`${type}page`] || 1;
  const perPage = queryParams[`${type}perPage`] || 15;
  const search = queryParams[`${type}search`] || '';
  const status = queryParams[`${type}status`] || '';
  const month = queryParams[`${type}month`] || null;

  return {
    page,
    perPage,
    search,
    status,
    type: type,
    month
  };
};

const generator = (listName, totalCountName) => [
  graphql(gql(queries[listName]), {
    name: 'tendersTableQuery',
    options: props => {
      return {
        variables: generateVariables(props),
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries[totalCountName]), {
    name: 'tendersCountQuery',
    options: props => {
      return {
        variables: generateVariables(props),
        notifyOnNetworkStatusChange: true
      };
    }
  })
];

export default generator;
