import { TenderMessages } from 'modules/tender_messages/components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from 'modules/tender_messages/graphql/';

export default compose(
  graphql(gql(queries.tenderMessages), {
    name: 'tenderMessagesQuery',
    options: ({ tenderDetail }) => {
      return {
        variables: { tenderId: tenderDetail._id }
      };
    }
  })
)(TenderMessages);
