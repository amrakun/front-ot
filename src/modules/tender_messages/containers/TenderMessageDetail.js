import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../graphql';
import { TenderMessageDetail } from '../components';
import qs from 'query-string';

export default compose(
  graphql(gql(queries.tenderMessageDetail), {
    name: 'tenderMessageDetailQuery',
    options: ({ location, match }) => {
      return {
        variables: { _id: match.params._id }
      };
    }
  })
)(TenderMessageDetail);
