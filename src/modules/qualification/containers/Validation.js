import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Validation } from '../components';
import { mutations } from '../graphql';
import { generator } from 'modules/companies/containers';

class ValidationContainer extends React.Component {
  render() {
    const { companiesQuery, addValidationMutation } = this.props;

    const addValidation = validation => {
      addValidationMutation({
        variables: validation
      })
        .then(() => {
          message.success('Successfully validated');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      addValidation
    };

    return <Validation {...extendedProps} />;
  }
}

ValidationContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addValidationMutation: PropTypes.func
};

const WithData = graphql(gql(mutations.addValidation), {
  name: 'addValidationMutation'
})(ValidationContainer);

export default generator(WithData, 'validation');
