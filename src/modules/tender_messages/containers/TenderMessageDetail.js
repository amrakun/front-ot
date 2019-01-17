import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../graphql';
import { TenderMessageDetail } from '../components';
import qs from 'query-string';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const TenderMessageDetailContainer = ({ tenderMessageDetailQuery }) => {
  if (tenderMessageDetailQuery.loading) return <Icon type="loading" />;

  return (
    <TenderMessageDetail
      tenderMessageDetail={tenderMessageDetailQuery.tenderMessageDetail}
    />
  );
};

TenderMessageDetailContainer.propTypes = {
  tenderMessageDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderMessageDetail), {
    name: 'tenderMessageDetailQuery',
    options: ({ location, match }) => {
      return {
        variables: { _id: match.params._id }
      };
    }
  })
)(TenderMessageDetailContainer);
