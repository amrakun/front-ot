import { List } from '../components';
import { graphql, compose } from 'react-apollo';
import { queries } from '../graphql';

export default compose(
  graphql(queries.listForTender, {
    name: 'listForTender',
    options: ({ _id, queryParams }) => {
      console.log(queryParams);
      return {
        variables: { tenderId: _id },
        fetchPolicy: 'network-only',
      };
    },
  }),
  graphql(queries.totalCountForTender, {
    name: 'totalCountForTender',
    options: ({ _id }) => {
      return {
        variables: { tenderId: _id },
        fetchPolicy: 'network-only',
      };
    },
  })
)(List);
