import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { RegistrationForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message, notification, Icon } from 'antd';
import { exportFile } from 'modules/common/components';

const RegistrationContainer = (props, { __ }) => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const companyByUser = companyByUserQuery.companyByUser || {};

  const basicInfo = companyByUser.basicInfo || {};
  const soleTrader = basicInfo.corporateStructure === 'Sole Trader';

  let formsComplete = true;

  if (!soleTrader) {
    if (
      !companyByUser.basicInfo ||
      !companyByUser.contactInfo ||
      !companyByUser.groupInfo ||
      !companyByUser.managementTeamInfo ||
      !companyByUser.shareholderInfo
    ) {
      formsComplete = false;
    }
  } else {
    if (!companyByUser.basicInfo || !companyByUser.contactInfo) {
      formsComplete = false;
    }
  }

  const exportForm = () => {
    exportFile({
      query: queries.exportCurrentCompanyRegistration,
      name: 'exportCompany'
    });
  };

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    const productsInfo = companyByUser.productsInfo;

    let hasFilledBefore = productsInfo;

    if (productsInfo && productsInfo.length === 0) {
      hasFilledBefore = false;
    }

    mutation({ variables: { [name]: doc } })
      .then(() => {
        message.success(__('Successfully saved'));

        companyByUserQuery.refetch();

        if (name === 'productsInfo') {
          formsComplete
            ? send(hasFilledBefore)
            : message.error(__('Please complete all forms before submitting'));
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const send = hasFilledBefore => {
    const { sendToBuyer, history } = props;

    sendToBuyer()
      .then(() => {
        if (!hasFilledBefore) {
          notification.open({
            message: 'Done!',
            description: __(
              `You have successfully submitted your registration form.`
            ),
            icon: <Icon type="smile" style={{ color: 'rgb(0,153,168)' }} />,
            duration: 10
          });
        }

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
    exportForm,
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
  currentUser: PropTypes.object,
  __: PropTypes.func
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
