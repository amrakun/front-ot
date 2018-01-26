import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Templates } from '../../components';
import { Loading } from '../../../common/components';
import { mutations } from '../../graphql';
import { message } from 'antd';

const TemplatesContainer = ({ configsSaveTemplateMutation }) => {
  if (configsSaveTemplateMutation.loading) {
    return <Loading />;
  }

  const updatedProps = {
    configsSaveTemplate: (name, content) => {
      configsSaveTemplateMutation({ variables: { name, content } })
        .then(() => {
          message.success('Template Saved');
        })
        .catch(error => {
          message.error(error.message);
        });
    }
  };

  return <Templates {...updatedProps} />;
};

TemplatesContainer.propTypes = {
  configsSaveTemplateMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(mutations.configsSaveTemplate), {
    name: 'configsSaveTemplateMutation'
  })
)(withRouter(TemplatesContainer));
