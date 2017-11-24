import React from 'react'
import { NavLink } from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidenav extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{background: '#fff', boxShadow: '4px 4px 20px 0 rgba(0, 0, 0, 0.01)'}}
      >
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/images/logo_mn.png'} />
        </div>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="desktop" />
            <NavLink to='/'>Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <NavLink to='/roster'>Suppliers</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="bars" />
            <NavLink to='/rfq'>RFQ responses</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bars" />
            <NavLink to='/eoi'>EOI responses</NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="mail" />
            <NavLink to='/feedback'>Success feedback</NavLink>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="swap" /><span>Actions</span></span>}
          >
            <Menu.Item key="6">
              <NavLink to='/dipot'>Dipot</NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to='/audit'>Audit</NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to='/validation'>Validation</NavLink>
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to='/blocking'>Blocking</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10">
            <Icon type="file" />
            <NavLink to='/report'>Report</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidenav
