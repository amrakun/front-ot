import { List } from '../components';
import { graphql, compose } from 'react-apollo';
import { queries } from '../graphql';

export default compose(
  graphql(queries.listForTender, {
    options: ({ _id }) => {
      return {
        variables: { tenderId: _id },
      };
    },
  })
)(List);
