import React from 'react';
import { Status } from '../../components';
import { generator } from 'modules/companies/containers';
import { exportFile } from 'modules/common/components';
import { queries } from '../../graphql';
import PropTypes from 'prop-types';

const StatusContainer = props => {
  const { companiesQuery } = props;

  const generate = () => {
    exportFile({
      query: queries.companiesGeneratePrequalificationList,
      variables: companiesQuery ? companiesQuery.variables : null
    });
  };

  return <Status {...props} generate={generate} />;
};

StatusContainer.propTypes = {
  companiesQuery: PropTypes.object
};

export default generator(StatusContainer, 'status');
