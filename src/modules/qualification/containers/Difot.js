import React from 'react';
import { notification, Icon, Button, message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Difot } from '../components';
import { mutations, queries } from '../graphql';
import { generator } from 'modules/companies/containers';
import { notifyReady, notifyLoading } from 'modules/common/constants';
import client from 'apolloClient';

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

    const generate = () => {
      notification.open(notifyLoading);
      this.setState({ exportLoading: true });

      client
        .query({
          query: gql(queries.companiesGenerateDifotScoreList),
          name: `generateQuery`,
          variables: companiesQuery ? companiesQuery.variables : null
        })
        .then(response => {
          notification.close('loadingNotification');
          notification.open({
            ...notifyReady,
            btn: (
              <Button
                type="primary"
                onClick={() => {
                  notification.close('downloadNotification');
                  window.open(response.data[Object.keys(response.data)[0]]);
                }}
              >
                <Icon type="download" /> Download
              </Button>
            )
          });
          this.setState({ exportLoading: false });
        })
        .catch(error => {
          message.error(error.message);
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
