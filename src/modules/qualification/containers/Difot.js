import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Difot } from '../components';
import { mutations, queries } from '../graphql';
import { generator } from 'modules/companies/containers';
import { exportFile } from 'modules/common/components';

class DifotContainer extends React.Component {
  render() {
    const { companiesQuery, addDifotScoresMutation } = this.props;

    const addDifotScores = scores => {
      const difotScores = [];

      for (const score of scores) {
        const supplierName = score['Supplier name'];
        const date = score['Month/Year'];
        const amount = score['DIFOT score'];

        if (supplierName && date && amount) {
          difotScores.push({
            supplierName,
            date,
            amount
          });
        }
      }

      addDifotScoresMutation({
        variables: { difotScores }
      })
        .then(() => {
          message.success('Successfully imported');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const generate = _ids => {
      exportFile({
        query: queries.companiesGenerateDifotScoreList,
        variables: companiesQuery
          ? {
              ...companiesQuery.variables,
              _ids
            }
          : null
      });
    };

    const extendedProps = {
      ...this.props,
      addDifotScores,
      generate
    };

    return <Difot {...extendedProps} />;
  }
}

DifotContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addDifotScoresMutation: PropTypes.func
};

const WithData = graphql(gql(mutations.addDifotScores), {
  name: 'addDifotScoresMutation'
})(DifotContainer);

export default generator(WithData, 'difot');
