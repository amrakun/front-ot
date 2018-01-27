import React from 'react';
import PropTypes from 'prop-types';
import { ReportsAndPlans } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class ReportsAndPlansContainer extends React.Component {
  render() {
    const { auditsQuery } = this.props;

    if (auditsQuery.loading) {
      return <ReportsAndPlans loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      data: auditsQuery.audits || []
    };

    return <ReportsAndPlans {...updatedProps} />;
  }
}

ReportsAndPlansContainer.propTypes = {
  auditsQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.audits), {
    name: 'auditsQuery'
  })
)(withTableProps(ReportsAndPlansContainer));
