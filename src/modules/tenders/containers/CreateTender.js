import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { queries as companyQueries } from 'modules/companies/graphql';
import { Loading } from 'modules/common/components';
import { RfqForm, EoiForm } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const CreateTenderContainer = props => {
  const { tendersAdd, simpleCompaniesQuery, location, history } = props;

  if (simpleCompaniesQuery.loading) {
    return <Loading />;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;

    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(tender => {
        message.success('Successfully created a tender!');
        history.push(`/${doc.type}`, {
          newTenderId: tender.data.tendersAdd._id,
          refetch: true
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    save,
    data: { suppliers: simpleCompaniesQuery.companies }
  };

  let form = <RfqForm {...updatedProps} />;

  if (location.pathname.includes('eoi')) form = <EoiForm {...updatedProps} />;

  return form;
};

CreateTenderContainer.propTypes = {
  location: PropTypes.object,
  tendersAdd: PropTypes.func,
  simpleCompaniesQuery: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  }),

  graphql(gql(companyQueries.simpleCompanies), {
    name: 'simpleCompaniesQuery',
    options: ({ location }) => {
      return {
        variables: {
          _ids: location.state.supplierIds
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(CreateTenderContainer);
