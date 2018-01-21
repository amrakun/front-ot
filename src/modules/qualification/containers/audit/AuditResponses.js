import React from 'react';
import PropTypes from 'prop-types';
import { AuditResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';

class AuditResponsesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination) {
    this.setState({ pagination });
  }

  render() {
    const { auditsQuery } = this.props;

    if (auditsQuery.loading) {
      return <AuditResponses loading={true} />;
    }

    const { pagination } = this.state;
    const audits = auditsQuery.audits || [];

    const updatedProps = {
      ...this.props,
      data: audits,
      pagination: {
        total: audits.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <AuditResponses {...updatedProps} />;
  }
}

AuditResponsesContainer.propTypes = {
  auditsQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.audits), {
    name: 'auditsQuery'
  })
)(AuditResponsesContainer);
