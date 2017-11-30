import { ApolloClient, createNetworkInterface } from 'react-apollo';

const { REACT_APP_API_URL } = process.env;

// Create a normal network interface:
const networkInterface = createNetworkInterface({
  uri: `${REACT_APP_API_URL}/graphql`
});

// Attach user credentials
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      const xToken = localStorage.getItem('otLoginToken');
      const xRefreshToken = localStorage.getItem('otLoginRefreshToken');

      req.options.headers['x-token'] = xToken;
      req.options.headers['x-refresh-token'] = xRefreshToken;

      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware({ response: { headers } }, next) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('otLoginToken', token);
      }

      if (refreshToken) {
        localStorage.setItem('otLoginRefreshToken', refreshToken);
      }

      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

export default client;
