import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Validation } from '../../components';
import { mutations } from '../../graphql';
import generator from './generator';

class ValidationContainer extends React.Component {
  render() {
    const { companiesQuery, addValidationMutation } = this.props;

    const addValidation = reports => {
      const Validations = Object.keys(reports).map(supplierId => ({
        supplierId,
        file: reports[supplierId]
      }));

      addValidationMutation({
        variables: { Validations }
      })
        .then(() => {
          message.success('Successfully imported');
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

const WithData = graphql(gql(mutations.addDueDiligence), {
  name: 'addValidationMutation'
})(ValidationContainer);

export default generator(WithData, 'validation');
