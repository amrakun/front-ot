import React from 'react'
import Sidenav from './Sidenav'
import Main from './Main'

import { Layout } from 'antd';

const MainLayout = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sidenav />
    <Main />
  </Layout>
)

export default MainLayout
