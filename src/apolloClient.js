import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

const { REACT_APP_API_URL } = process.env;

// Create an http link:
const httpLink = createHttpLink({
  uri: `${REACT_APP_API_URL}/graphql`,
  credentials: 'include'
});

// Network error
const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log('Disconnect ...');
  }
});

// Creating Apollo-client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink)
});

export default client;
