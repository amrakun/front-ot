import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../graphql';
import TenderMessage from '../components/TenderMessage';
import qs from 'query-string';

export default compose(
  graphql(gql(queries.tenderMessageDetail), {
    name: 'tenderMessageDetailQuery',
    options: ({ location, match }) => {
      const variables = qs.parse(location.search);
      variables._id = match.params._id;
      return {
        variables
      };
    }
  })
)(TenderMessage);
