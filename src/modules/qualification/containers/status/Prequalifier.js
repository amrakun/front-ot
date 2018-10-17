import React from 'react';
import { Prequalifier } from '../../components/status';
import { mutations, queries } from '../../graphql';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { message } from 'antd';

const PrequalifierContainer = props => {
  const { supplierId, prequalifyMutation, replacerQuery } = props;

  if (replacerQuery.loading) {
    return null;
  }

  const prequalify = (qualified, templateObject) => {
    prequalifyMutation({
      variables: { supplierId, qualified, templateObject }
    })
      .then(() => {
        message.success('Pre-qualified!');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  return (
    <Prequalifier
      {...props}
      prequalify={prequalify}
      template={replacerQuery.qualificationPrequalificationReplacer}
    />
  );
};

PrequalifierContainer.propTypes = {
  supplierId: PropTypes.string,
  replacerQuery: PropTypes.object,
  prequalifyMutation: PropTypes.func
};

export default compose(
  graphql(gql(queries.qualificationPrequalificationReplacer), {
    name: 'replacerQuery',
    options: ({ supplierId }) => ({
      variables: {
        supplierId
      }
    })
  }),

  graphql(gql(mutations.qualificationsPrequalify), {
    name: 'prequalifyMutation',
    options: () => ({
      refetchQueries: ['companyDetail']
    })
  })
)(PrequalifierContainer);
