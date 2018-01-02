import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CreateRfq, CreateEoi } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const CreateTenderContainer = ({ tendersAdd, location, history }) => {
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

  const updatedProps = {
    save,
    data: { supplierIds: location.state.supplierIds }
  };

  let form = <CreateRfq {...updatedProps} />;

  if (location.pathname.includes('eoi')) form = <CreateEoi {...updatedProps} />;

  return form;
};

CreateTenderContainer.propTypes = {
  location: PropTypes.object,
  tendersAdd: PropTypes.func
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  })
)(CreateTenderContainer);
