import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SubmitRfq, SubmitEoi } from '../components';
import { queries, mutations } from '../graphql';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const PublishContainer = (
  {
    tenderDetailQuery,
    tendersResponsesAdd,
    tendersResponsesEdit,
    tenderResponsesSend,
    tenderResponseByUserQuery,
    history
  },
  context
) => {
  if (tenderDetailQuery.loading || tenderResponseByUserQuery.loading) {
    return <Loading />;
  }

  const tenderDetail = tenderDetailQuery.tenderDetail || {};
  const tenderResponseByUser = tenderResponseByUserQuery.tenderResponseByUser;

  if (tenderResponseByUser.isSent) history.push('/'); //already sent

  const save = (doc, shouldSend) => {
    const mutation = tenderResponseByUser
      ? tendersResponsesEdit
      : tendersResponsesAdd;

    mutation({
      variables: { tenderId: tenderDetail._id, ...doc }
    })
      .then(() => {
        message.success('Successfully saved a tender!');
        tenderResponseByUserQuery.refetch();
        if (shouldSend) send(doc.tenderId);
        else redirect(doc.tenderId);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const send = tenderId => {
    const { currentUser } = context;
    console.log({
      tenderId: tenderDetail._id,
      supplierId: currentUser.companyId
    });
    tenderResponsesSend({
      variables: {
        tenderId: tenderDetail._id,
        supplierId: currentUser.companyId
      }
    })
      .then(() => {
        message.success('Successfully submitted a tender!');
        redirect(tenderId);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const redirect = tenderId => {
    history.push('/rfq-and-eoi?refetch', {
      newTenderId: tenderId
    });
  };

  const updatedProps = {
    save,
    send,
    data: tenderDetail,
    response: tenderResponseByUser
  };

  let form = <SubmitRfq {...updatedProps} />;

  if (tenderDetailQuery.tenderDetail.type === 'eoi')
    form = <SubmitEoi {...updatedProps} />;

  return form;
};

PublishContainer.propTypes = {
  location: PropTypes.object,
  tenderDetailQuery: PropTypes.object,
  tenderResponseByUserQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  tendersResponsesEdit: PropTypes.func,
  tenderResponsesSend: PropTypes.func,
  history: PropTypes.object
};

PublishContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(queries.tenderResponseByUser), {
    name: 'tenderResponseByUserQuery',
    options: ({ match }) => {
      return {
        variables: { tenderId: match.params.id }
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  }),

  graphql(gql(mutations.tendersResponsesEdit), {
    name: 'tendersResponsesEdit'
  }),

  graphql(gql(mutations.tenderResponsesSend), {
    name: 'tenderResponsesSend'
  })
)(PublishContainer);
