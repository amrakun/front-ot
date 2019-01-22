import React from 'react';
import { TenderMessages } from 'modules/tender_messages/components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from 'modules/tender_messages/graphql/';
import { mutations } from '../graphql';

export default compose(
  graphql(gql(queries.tenderMessages), {
    name: 'tenderMessagesQuery',
    options: ({ tenderDetail, queryParams }) => {
      return {
        variables: {
          tenderId: tenderDetail._id,
          page: queryParams.page ? Number(queryParams.page) : 1,
          perPage: queryParams.perPage ? Number(queryParams.perPage) : 20
        }
      };
    }
  }),
  graphql(gql(mutations.tenderMessageSetAsRead), {
    name: 'tenderMessageSetAsRead',
    options: () => {
      return {
        refetchQueries: ['tenderMessages', 'tenderMessagesQuery']
      };
    }
  }),
  graphql(gql(queries.tenderMessageTotalCount), {
    name: 'tenderMessageTotalCountQuery',
    options: ({ tenderDetail }) => {
      return {
        variables: {
          tenderId: tenderDetail._id
        }
      };
    }
  })
)(TenderMessages);
