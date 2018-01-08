import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Difot } from '../../components';
import { mutations } from '../../graphql';
import generator from './generator';

class DifotContainer extends React.Component {
  render() {
    const { companiesQuery, addDifotScoresMutation } = this.props;

    const addDifotScores = difotScores => {
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

    const extendedProps = {
      ...this.props,
      addDifotScores
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
