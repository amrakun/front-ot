import { gql } from 'react-apollo';
import consts from 'consts';
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
      const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;

      localStorage.removeItem(LOGIN_TOKEN_KEY);
      localStorage.removeItem(LOGIN_REFRESH_TOKEN_KEY);
      localStorage.removeItem('locale');

      window.location.href = '/';
    });
};
