import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import Rfq from './Rfq'

import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const Main = () => (
  <Layout>
    <Header style={{ background: '#fff', padding: 0, boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.05)' }} />
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
)

export default Main
