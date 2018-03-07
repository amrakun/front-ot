import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { PreQualification } from '../../components';
import { mutations } from '../../graphql';
import { message } from 'antd';

const PreQualificatoinContainer = ({
  configsSavePrequalificationDowMutation
}) => {
  const mainAction = doc => {
    configsSavePrequalificationDowMutation({ variables: { doc } }).then(() => {
      message.success('Saved Successfully');
    });
  };

  const updatedProps = {
    ...this.props,
    mainAction
  };

  return <PreQualification {...updatedProps} />;
};

PreQualificatoinContainer.propTypes = {
  configsSavePrequalificationDowMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(mutations.configsSavePrequalificationDow), {
    name: 'configsSavePrequalificationDowMutation'
  })
)(withRouter(PreQualificatoinContainer));
