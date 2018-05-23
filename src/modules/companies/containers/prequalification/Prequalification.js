import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { PrequalificationForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message, notification, Icon } from 'antd';

const PrequalificationContainer = (props, { __ }) => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const companyByUser = companyByUserQuery.companyByUser;
  const disabled = !companyByUser.isPrequalificationInfoEditable;

  let formsComplete = true;

  Object.keys(companyByUser).forEach(key => {
    if (key.includes('Info') && !companyByUser[key] && key !== 'healthInfo') {
      formsComplete = false;
    }
  });

  const save = (name, doc) => {
    if (disabled) {
      return message.error(__('Changes disabled'));
    }

    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        companyByUserQuery.refetch();
        message.success(__('Saved'));

        if (name === 'healthInfo') {
          if (formsComplete) {
            return send();
          }

          return message.error(
            __('Please complete all forms before submitting')
          );
        }
      })

      .catch(error => {
        message.error(error.message);
      });
  };

  const send = () => {
    const { sendToBuyer, history } = props;

    sendToBuyer()
      .then(() => {
        notification.open({
          message: __('Done!'),
          description: __(
            'You have successfully submitted your pre-qualification form.'
          ),
          icon: <Icon type="smile" style={{ color: 'rgb(0,153,168)' }} />,
          duration: 10
        });

        history.push('/capacity-building');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    send,
    disabled,
    company: {
      ...companyByUser
    }
  };

  return <PrequalificationForms {...updatedProps} />;
};

PrequalificationContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  sendToBuyer: PropTypes.func
};

PrequalificationContainer.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func
};

export default compose(
  graphql(gql(queries.companyPrequalificationDetail), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.financialInfo), {
    name: 'financialInfoEdit'
  }),

  graphql(gql(mutations.businessInfo), {
    name: 'businessInfoEdit'
  }),

  graphql(gql(mutations.environmentalInfo), {
    name: 'environmentalInfoEdit'
  }),

  graphql(gql(mutations.healthInfo), {
    name: 'healthInfoEdit'
  }),

  graphql(gql(mutations.companiesSendPrequalificationInfo), {
    name: 'sendToBuyer'
  })
)(PrequalificationContainer);
