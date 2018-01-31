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

    this.state = {
      usersResult: []
    };

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

  searchUser(searchValue) {
    client
      .query({
        query: gql(queries.simpleUsers),
        name: 'usersQuery',

        variables: { search: searchValue }
      })
      .then(response => {
        this.setState({ usersResult: response.data.users });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  render() {
    const { usersResult } = this.state;

    const updatedProps = {
      ...this.props,
      delegate: this.delegate,
      searchUser: this.searchUser,
      usersResult: usersResult || []
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
