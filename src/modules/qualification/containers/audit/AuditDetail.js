import React from 'react';
import PropTypes from 'prop-types';
import { AuditDetail } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';

class AuditDetailContainer extends React.Component {
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
    const { auditDetailQuery } = this.props;

    if (auditDetailQuery.loading) {
      return <AuditDetail loading={true} />;
    }

    const { pagination } = this.state;
    const auditDetail = auditDetailQuery.auditDetail || [];

    const updatedProps = {
      data: auditDetail,
      pagination: {
        total: auditDetail.responses.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <AuditDetail {...updatedProps} />;
  }
}

AuditDetailContainer.propTypes = {
  auditDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditDetail), {
    name: 'auditDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  })
)(AuditDetailContainer);
