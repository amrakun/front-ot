import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { DueDiligence } from '../components';
import { mutations, queries } from '../graphql';
import { generator } from 'modules/companies/containers';
import { exportFile } from 'modules/common/components';

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

    const exportExcel = () => {
      exportFile({
        query: queries.companiesGenerateDueDiligenceList,
        variables: companiesQuery ? companiesQuery.variables : null
      });
    };

    const extendedProps = {
      ...this.props,
      addDueDiligence,
      exportExcel
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
