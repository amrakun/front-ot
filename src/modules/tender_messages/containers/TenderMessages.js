import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../graphql';
import { TenderMessages } from '../components';
import qs from 'query-string';

export default compose(
  graphql(gql(queries.tenderMessages), {
    name: 'tenderMessagesQuery',
    options: props => {
      const { location } = props;
      const variables = qs.parse(location.search);
      return {
        variables
      };
    }
  })
)(TenderMessages);
