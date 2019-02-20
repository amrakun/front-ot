import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { queries as companyQueries } from 'modules/companies/graphql';
import { alert } from 'modules/common/utils';
import { Loading } from 'modules/common/components';
import { RfqForm, EoiForm } from '../components';
import { mutations, queries } from '../graphql';

const CreateTenderContainer = props => {
  const { type, tendersAdd, simpleCompaniesQuery, buyersQuery, history } = props;

  if (simpleCompaniesQuery.error) {
    return null;
  }

  if (simpleCompaniesQuery.loading) {
    return <Loading />;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;

    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(tender => {
        alert.success('Successfully created a tender!');

        history.push(`/${type}?refetch`, {
          newTenderId: tender.data.tendersAdd._id
        });
      })
      .catch(error => {
        alert.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    tenderCreation: true,
    data: { suppliers: simpleCompaniesQuery.companies || [] },
    buyers: buyersQuery.users || [],
  };

  if (type === 'eoi') {
    return <EoiForm {...updatedProps} />;
  }

  return <RfqForm {...updatedProps} />;
};

CreateTenderContainer.propTypes = {
  type: PropTypes.string,
  tendersAdd: PropTypes.func,
  simpleCompaniesQuery: PropTypes.object,
  buyersQuery: PropTypes.object,
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
          _ids: (location.state || {}).supplierIds
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries.buyers), {
    name: 'buyersQuery',
  })
)(CreateTenderContainer);
