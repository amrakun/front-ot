import React from 'react';
import { render } from 'react-dom';

import Routes from './routes';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';
import './css/main.min.css';

render((
  <LocaleProvider locale={enUS}>
    <Routes />
  </LocaleProvider>
), document.getElementById('root'));
