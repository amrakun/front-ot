import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { AuditForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const AuditFormsContainer = props => {
  let { basicInfoQuery } = props;

  if (basicInfoQuery.loading) {
    return <Loading />;
  }

  const save = (name, doc) => {
    console.log(doc);
    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...basicInfoQuery
    }
  };
  return <AuditForms {...updatedProps} />;
};

AuditFormsContainer.propTypes = {
  basicInfoQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.qualificationDetail), {
    name: 'basicInfoQuery',
    options: ({ match }) => {
      return {
        variables: {
          supplierId: match.params.id
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(AuditFormsContainer);
