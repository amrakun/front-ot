import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import { message } from 'antd';
import { Template } from '../../components';
import { mutations } from '../../graphql';

const TemplateContainer = props => {
  const { saveMutation } = props;

  const onSubmit = doc => {
    const { kind, parentName } = props;

    const variables = { name: parentName, kind, ...doc };

    saveMutation({ variables })
      .then(() => {
        message.success('Template Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = { ...props, onSubmit };

  return <Template {...updatedProps} />;
};

TemplateContainer.propTypes = {
  saveMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(mutations.configsSaveTemplate), {
    name: 'saveMutation'
  })
)(withRouter(TemplateContainer));
