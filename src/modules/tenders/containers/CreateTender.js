import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { RfqForm, EoiForm } from '../components';
import { mutations } from '../graphql';

const CreateTebderContainer = ({ tendersAdd, location }) => {
  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;
    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(() => {
        console.log('Saved');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updatedProps = {
    save,
    data: { supplierIds: location.state.supplierIds }
  };

  let form = <RfqForm {...updatedProps} />;

  if (location.pathname.includes('eoi')) form = <EoiForm {...updatedProps} />;

  return form;
};

CreateTebderContainer.propTypes = {
  location: PropTypes.object,
  tendersAdd: PropTypes.func
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  })
)(CreateTebderContainer);
