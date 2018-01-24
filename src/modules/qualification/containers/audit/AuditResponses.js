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
    const { auditResponsesQuery } = this.props;

    if (auditResponsesQuery.loading) {
      return <AuditResponses loading={true} />;
    }

    const { pagination } = this.state;
    const auditResponses = auditResponsesQuery.auditResponses || [];

    const updatedProps = {
      data: auditResponses,
      pagination: {
        total: auditResponses.length,
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
  auditResponsesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditResponses), {
    name: 'auditResponsesQuery'
  })
)(AuditResponsesContainer);
