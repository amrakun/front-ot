import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Audit } from '../../components';
import { mutations } from '../../graphql';
import { generator } from 'modules/companies/containers';

class AuditContainer extends React.Component {
  render() {
    const { companiesQuery, addAuditMutation } = this.props;

    const addAudit = variables => {
      console.log(variables);
      addAuditMutation({ variables })
        .then(() => {
          message.success('Successfully sent audit');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      addAudit
    };

    return <Audit {...extendedProps} />;
  }
}

AuditContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addAuditMutation: PropTypes.func
};

const WithData = graphql(gql(mutations.addAudit), {
  name: 'addAuditMutation'
})(AuditContainer);

export default generator(WithData, 'audit');
