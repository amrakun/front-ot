import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CreateRfq, CreateEoi } from '../components';
import { mutations, queries } from '../graphql';
import { message } from 'antd';
import { Loading } from 'modules/common/components';

const CreateTenderContainer = props => {
  const { tendersAdd, companiesByIdsQuery, location, history } = props;

  if (companiesByIdsQuery.loading) {
    return <Loading />;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;
    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(tender => {
        message.success('Successfully created a tender!');
        history.push(`/tender/${tender.data.tendersAdd._id}`);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const requestingSuppliers = companiesByIdsQuery.companies;

  const updatedProps = {
    save,
    data: { suppliers: requestingSuppliers }
  };

  let form = <CreateRfq {...updatedProps} />;

  if (location.pathname.includes('eoi')) form = <CreateEoi {...updatedProps} />;

  return form;
};

CreateTenderContainer.propTypes = {
  location: PropTypes.object,
  tendersAdd: PropTypes.func,
  companiesByIdsQuery: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  }),

  graphql(gql(queries.companiesByIds), {
    name: 'companiesByIdsQuery',
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
