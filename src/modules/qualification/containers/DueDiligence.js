import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { DueDiligence } from '../components';
import { mutations } from '../graphql';
import { generator } from 'modules/companies/containers';

class DueDiligenceContainer extends React.Component {
  render() {
    const { companiesQuery, addDueDiligenceMutation } = this.props;

    const addDueDiligence = reports => {
      const dueDiligences = Object.keys(reports).map(supplierId => ({
        supplierId,
        file: reports[supplierId]
      }));

      addDueDiligenceMutation({
        variables: { dueDiligences }
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
      addDueDiligence
    };

    return <DueDiligence {...extendedProps} />;
  }
}

DueDiligenceContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addDueDiligenceMutation: PropTypes.func
};

const WithData = graphql(gql(mutations.addDueDiligence), {
  name: 'addDueDiligenceMutation'
})(DueDiligenceContainer);

export default generator(WithData, 'dueDiligence');
