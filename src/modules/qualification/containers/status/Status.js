import React from 'react';
import { Status } from '../../components';
import { generator, generateVariables } from 'modules/companies/containers';
import { exportFile } from 'modules/common/components';
import { queries } from '../../graphql';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

const StatusContainer = props => {
  const generate = _ids => {
    exportFile({
      query: queries.companiesGeneratePrequalificationList,
      variables: { _ids }
    });
  };

  const exportCompany = _id => {
    exportFile({
      query: queries.companyPrequalificationExport,
      variables: { _id }
    });
  };

  return (
    <Status {...props} generate={generate} exportCompany={exportCompany} />
  );
};

StatusContainer.propTypes = {
  companiesQuery: PropTypes.object,
  prequalifiedStatusQuery: PropTypes.object
};

const WithData = graphql(gql(queries.companiesPrequalifiedStatus), {
  name: 'prequalifiedStatusQuery',
  options: generateVariables
})(StatusContainer);

export default generator(WithData, 'status');
