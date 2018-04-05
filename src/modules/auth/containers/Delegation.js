import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { Delegation } from '../components';
import { queries, mutations } from '../graphql';
import { message } from 'antd';
import client from 'apolloClient';

class DelegationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.delegate = this.delegate.bind(this);
    this.searchUser = this.searchUser.bind(this);
  }

  delegate(variables) {
    this.props
      .usersDelegate({ variables })
      .then(() => {
        message.success('Delegated successfully!');
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  searchUser(searchValue, callback) {
    client
      .query({
        query: gql(queries.simpleUsers),
        name: 'usersQuery',

        variables: { search: searchValue }
      })
      .then(response => {
        callback && callback(response.data.users);
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  render() {
    const updatedProps = {
      ...this.props,
      delegate: this.delegate,
      searchUser: this.searchUser
    };

    return <Delegation {...updatedProps} />;
  }
}

DelegationContainer.propTypes = {
  usersDelegate: PropTypes.func,
  history: PropTypes.object
};

export default compose(
  graphql(gql(mutations.usersDelegate), {
    name: 'usersDelegate'
  })
)(DelegationContainer);
