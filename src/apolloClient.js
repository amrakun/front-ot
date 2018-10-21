import { ApolloClient, createNetworkInterface } from 'react-apollo';

const { REACT_APP_API_URL } = process.env;

// Create a normal network interface:
const networkInterface = createNetworkInterface({
  uri: `${REACT_APP_API_URL}/graphql`,
  opts: {
    credentials: 'include'
  }
});

const client = new ApolloClient({
  networkInterface
});

export default client;
