import { gql } from 'react-apollo';
import client from 'apolloClient';

export const logout = () => {
  client
    .mutate({
      mutation: gql`
        mutation {
          logout
        }
      `
    })

    .then(() => {
      localStorage.removeItem('locale');

      window.location.href = '/';
    });
};
