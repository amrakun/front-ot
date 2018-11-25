import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import store from './store';
import apolloClient from './apolloClient';

import Routes from './routes';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import './css/main.min.css';

render(
  <ApolloProvider store={store} client={apolloClient}>
    <LocaleProvider locale={enUS}>
      <Routes />
    </LocaleProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
