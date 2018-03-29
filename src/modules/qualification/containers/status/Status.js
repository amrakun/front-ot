import React from 'react';
import { Status } from '../../components';
import { generator } from 'modules/companies/containers';
import { exportFile } from 'modules/common/components';
import { queries } from '../../graphql';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

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
  companiesQuery: PropTypes.object,
  prequalifiedStatusQuery: PropTypes.object
};

const WithData = graphql(gql(queries.companiesPrequalifiedStatus), {
  name: 'prequalifiedStatusQuery',
  options: ({ queryParams }) => {
    const {
      search,
      region,
      productCodes,
      difotRange,
      includeBlocked,
      isPrequalified,
      isProductsInfoValidated,
      isQualified
    } = queryParams;
    const status = queryParams.status || '';

    let difotScore = '';

    if (status && status.includes('byDifotScore')) {
      difotScore = difotRange;
    }

    return {
      variables: {
        search,
        region,
        productCodes,
        difotScore,
        includeBlocked,
        isPrequalified,
        isProductsInfoValidated,
        isQualified
      },
      notifyOnNetworkStatusChange: true
    };
  }
})(StatusContainer);

export default generator(WithData, 'status');
