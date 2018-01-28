import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { RegistrationForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message, notification, Icon } from 'antd';

const RegistrationContainer = props => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const companyByUser = companyByUserQuery.companyByUser;

  let formsComplete = true;
  Object.keys(companyByUser).forEach(key => {
    if (!companyByUser[key]) formsComplete = false;
  });

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        companyByUserQuery.refetch();
        message.success('Saved');
        if (name === 'productsInfo')
          formsComplete
            ? send()
            : message.error('Please complete all forms before submitting');
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
          message: 'You have successfully completed your registration!',
          description: 'Please submit a pre-qualification form as a next step.',
          icon: <Icon type="smile" style={{ color: 'rgb(0,153,168)' }} />,
          duration: 10
        });
        history.push('/prequalification');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    send,
    company: {
      ...companyByUser
    }
  };
  return <RegistrationForms {...updatedProps} />;
};

RegistrationContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  sendToBuyer: PropTypes.func
};

RegistrationContainer.contextTypes = {
  currentUser: PropTypes.object
};
export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.basicInfo), {
    name: 'basicInfoEdit'
  }),
  graphql(gql(mutations.contactInfo), {
    name: 'contactInfoEdit'
  }),
  graphql(gql(mutations.managementTeam), {
    name: 'managementTeamInfoEdit'
  }),
  graphql(gql(mutations.shareholderInfo), {
    name: 'shareholderInfoEdit'
  }),
  graphql(gql(mutations.groupInfo), {
    name: 'groupInfoEdit'
  }),
  graphql(gql(mutations.productsInfo), {
    name: 'productsInfoEdit'
  }),
  graphql(gql(mutations.certificateInfo), {
    name: 'certificateInfoEdit'
  }),
  graphql(gql(mutations.companiesSendRegistrationInfo), {
    name: 'sendToBuyer'
  })
)(RegistrationContainer);
