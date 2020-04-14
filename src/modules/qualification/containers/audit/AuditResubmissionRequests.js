import React from 'react';
import { gql, graphql } from 'react-apollo';
import { message } from 'antd';
import { AuditResubmissionRequests } from '../../components';
import { mutations } from '../../graphql';
import { generator } from 'modules/companies/containers';

class RequestsContainer extends React.Component {
  render() {
    const { companiesQuery, toggleStateMutation } = this.props;

    const toggleState = (supplierId, editableDate) => {
      toggleStateMutation({ variables: { supplierId, editableDate } })
        .then(() => {
          message.success('Success');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      toggleState,
    };

    return <AuditResubmissionRequests {...extendedProps} />;
  }
}

const WithData = graphql(gql(mutations.toggleAuditState), {
  name: 'toggleStateMutation',
})(RequestsContainer);

export default generator(WithData, 'auditResubmissionRequests');
