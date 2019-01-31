import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { compose, gql, graphql } from 'react-apollo';
import { Loading, exportFile } from 'modules/common/components';
import { SubmitRfq, SubmitEoi } from '../components';
import { queries, mutations } from '../graphql';

class SubmitContainer extends React.Component {
  render() {
    const {
      tenderDetailQuery,
      tendersResponsesAdd,
      tendersResponsesEdit,
      tenderResponsesSend,
      tenderResponseByUserQuery,
      history,
      queryParams,
    } = this.props;

    const { currentUser, __ } = this.context;

    if (tenderDetailQuery.loading || tenderResponseByUserQuery.loading) {
      return <Loading />;
    }

    if (tenderDetailQuery.error || tenderResponseByUserQuery.error) {
      return null;
    }

    const tenderDetail = tenderDetailQuery.tenderDetailSupplier || {};
    const tenderResponseByUser = tenderResponseByUserQuery.tenderResponseByUser;

    const save = (doc, shouldSend) => {
      const mutation = tenderResponseByUser ? tendersResponsesEdit : tendersResponsesAdd;

      mutation({ variables: { tenderId: tenderDetail._id, ...doc } })
        .then(() => {
          message.success(__('Successfully saved a tender!'));

          tenderResponseByUserQuery.refetch();

          shouldSend ? send(doc.tenderId) : redirect(doc.tenderId);
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const send = tenderId => {
      tenderResponsesSend({
        variables: {
          tenderId: tenderDetail._id,
          supplierId: currentUser.companyId,
        },
      })
        .then(() => {
          message.success(__('Successfully submitted a tender!'));
          redirect(tenderId);
        })
        .catch(() => {
          message.error(__('Required inputs missing'));
        });
    };

    const redirect = tenderId => {
      history.push('/rfq-and-eoi?refetch', {
        newTenderId: tenderId,
      });
    };

    const generateTemplate = () => {
      exportFile({
        query: queries.generateMaterialsTemplate,
        variables: { tenderId: tenderDetail._id },
      });
    };

    const updatedProps = {
      save,
      send,
      generateTemplate,
      data: tenderDetail,
      response: tenderResponseByUser,
      queryParams,
    };

    if (tenderDetail.type === 'eoi') {
      return <SubmitEoi {...updatedProps} />;
    }

    return <SubmitRfq {...updatedProps} />;
  }
}

SubmitContainer.propTypes = {
  location: PropTypes.object,
  tenderDetailQuery: PropTypes.object,
  tenderResponseByUserQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  tendersResponsesEdit: PropTypes.func,
  tenderResponsesSend: PropTypes.func,
  history: PropTypes.object,
};

SubmitContainer.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func,
};

export default compose(
  graphql(gql(queries.tenderDetailSupplier), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id },
      };
    },
  }),

  graphql(gql(queries.tenderResponseByUser), {
    name: 'tenderResponseByUserQuery',
    options: ({ match }) => {
      return {
        variables: { tenderId: match.params.id },
      };
    },
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd',
  }),

  graphql(gql(mutations.tendersResponsesEdit), {
    name: 'tendersResponsesEdit',
  }),

  graphql(gql(mutations.tenderResponsesSend), {
    name: 'tenderResponsesSend',
  })
)(SubmitContainer);
