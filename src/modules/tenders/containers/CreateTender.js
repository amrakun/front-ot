import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CreateRfq, CreateEoi } from '../components';
import { mutations, queries } from '../graphql';
import { message } from 'antd';

const CreateTenderContainer = props => {
  const { tendersAdd, companiesQuery, location, history } = props;

  if (companiesQuery.loading) {
    return <div>loading</div>;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;
    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(() => {
        message.success('Successfully sent a tender!');
        history.push('/');
      })
      .catch(error => {
        message.error('Error occured: CreateTender');
        console.log(error);
      });
  };

  const requestingSuppliers = companiesQuery;

  const updatedProps = {
    save,
    data: { requestingSuppliers: requestingSuppliers }
  };

  let form = <CreateRfq {...updatedProps} />;

  if (location.pathname.includes('eoi')) form = <CreateEoi {...updatedProps} />;

  return form;
};

CreateTenderContainer.propTypes = {
  location: PropTypes.object,
  tendersAdd: PropTypes.func,
  companiesQuery: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  }),

  graphql(gql(queries.companiesByIds), {
    name: 'companiesQuery',
    options: ({ location }) => {
      console.log(location.state.supplierIds);
      return {
        variables: {
          page: 200,
          perPage: 20
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(CreateTenderContainer);
