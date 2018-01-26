import React from 'react';
import PropTypes from 'prop-types';
import { AuditRequests } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';

class AuditRequestsContainer extends React.Component {
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
    const { auditRequestsQuery, location, history } = this.props;

    if (auditRequestsQuery.loading) {
      return <AuditRequests loading={true} />;
    }

    if (location.search === '?refetch') {
      auditRequestsQuery.refetch();
      history.push({ location: null });
    }

    const { pagination } = this.state;
    const audits = auditRequestsQuery.companyByUser.audits || [];

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

    return <AuditRequests {...updatedProps} />;
  }
}

AuditRequestsContainer.propTypes = {
  auditRequestsQuery: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditRequests), {
    name: 'auditRequestsQuery'
  })
)(AuditRequestsContainer);
