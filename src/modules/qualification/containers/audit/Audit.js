import React from 'react';
import { message } from 'antd';
import { gql, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Audit } from '../../components';
import { mutations } from '../../graphql';
import { generator } from 'modules/companies/containers';

class AuditContainer extends React.Component {
  render() {
    const { companiesQuery, physicalAuditsAdd } = this.props;

    const addPhysicalAudit = variables => {
      physicalAuditsAdd({ variables })
        .then(() => {
          message.success('Successfully inserted physical audit');
          companiesQuery.refetch();
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      addPhysicalAudit,
    };

    return <Audit {...extendedProps} />;
  }
}

AuditContainer.propTypes = {
  companiesQuery: PropTypes.object,
  physicalAuditsAdd: PropTypes.func,
};

const WithData = compose(
  graphql(gql(mutations.physicalAuditsAdd), {
    name: 'physicalAuditsAdd',
  })
)(AuditContainer);

export default generator(WithData, 'audit');
