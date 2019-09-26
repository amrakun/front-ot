import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';

import { Loading } from 'modules/common/components';
import LogModalContent from '../components/LogModalContent';
import { queries } from '../graphql/index';

class LogModalContainer extends React.Component {
  render() {
    const { fieldLabelsQuery, log } = this.props;

    if (fieldLabelsQuery.loading) {
      return <Loading />;
    }

    if (!log) {
      return null;
    }

    return <LogModalContent log={log} fieldLabelMaps={fieldLabelsQuery.getDbFieldLabels || []} />;
  }
}

LogModalContainer.propTypes = {
  fieldLabelsQuery: PropTypes.object,
  log: PropTypes.object,
};

export default compose(
  graphql(gql(queries.getDbFieldLabels), {
    name: 'fieldLabelsQuery',
    options: ({ log }) => ({
      variables: { type: log && log.type ? log.type : '' },
      fetchPolicy: 'network-only',
    }),
  })
)(withRouter(LogModalContainer));
