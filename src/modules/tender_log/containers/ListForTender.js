import { List } from '../components';
import { graphql, compose } from 'react-apollo';
import { queries } from '../graphql';
import { withRouter } from 'react-router-dom';

export default compose(
  withRouter,
  graphql(queries.listForTender, {
    options: ({ match }) => {
      return {
        variables: { tenderId: match.params.id },
      };
    },
  })
)(List);
