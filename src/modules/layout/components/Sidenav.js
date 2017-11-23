import React from 'react'
import { Link } from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidenav extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
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
            <Link to='/'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <Link to='/roster'>Suppliers</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="bars" />
            <Link to='/rfq'>RFQ responses</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bars" />
            <Link to='/eoi'>EOI responses</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="mail" />
            <Link to='/feedback'>Success feedback</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="swap" /><span>Actions</span></span>}
          >
            <Menu.Item key="6">
              <Link to='/dipot'>Dipot</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to='/audit'>Audit</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to='/validation'>Validation</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to='/blocking'>Blocking</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10">
            <Icon type="file" />
            <Link to='/report'>Report</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidenav
