import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { notification } from 'antd';
import { Loading, exportFile } from 'modules/common/components';
import { alert } from 'modules/common/utils';
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

    if (
      tenderDetailQuery.loading ||
      tenderResponseByUserQuery.loading
    ) {
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
          alert.success('Successfully saved a tender!', __);
          tenderResponseByUserQuery.refetch();

          shouldSend ? send(doc.tenderId) : redirect(doc.tenderId);
        })

        .catch(error => {
          alert.error(error.message, __);

          if (error.message.includes('Please complete registration stage')) {
            warn();

            setTimeout(() => {
              history.push('/registration');
            }, 3000)
          }

          if (error.message.includes('Please complete prequalification stage')) {
            warn();

            setTimeout(() => {
              history.push('/prequalification');
            }, 3000)
          }
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
          alert.success('Successfully submitted a tender!', __);
          redirect(tenderId);
        })
        .catch(() => {
          alert.error('Required inputs missing', __);
        });
    };

    const warn = () => {
      notification.warn({
        message: __('Notification'),
        description: __(
          'At the time of the Expression of Interest, all suppliers must be registered to the ”Oyu” database, as a minimum, to be able to register its interests through “Oyu” database. Prequalification status will be a critical evaluation criteria and it is highly recommended that you be prequalified.'
        ),
        duration: 60,
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