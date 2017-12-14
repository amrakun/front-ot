import React from 'react';
import { NavLink } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidenav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <Sider>
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + '/images/logo_mn.png'}
            alt="logo"
          />
        </div>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="desktop" />
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <NavLink to="/companies">Suppliers</NavLink>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="swap" />
                <span>Actions</span>
              </span>
            }
          >
            <Menu.Item key="7">
              <NavLink to="/audit">Qualification/audit status</NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/validation">Validation status</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/difot">DIFOT</NavLink>
            </Menu.Item>
            <Menu.Item key="11">
              <NavLink to="/due-dillegence">Due dillegence</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/feedback">Success feedback</NavLink>
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to="/blocking">Blocking</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
            <Icon type="bars" />
            <NavLink to="/rfq">RFQ responses</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bars" />
            <NavLink to="/eoi">EOI responses</NavLink>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="file" />
                <span>Report</span>
              </span>
            }
          >
            <Menu.Item key="12">
              <NavLink to="/supplier-profile">Supplier profile</NavLink>
            </Menu.Item>
            <Menu.Item key="13">
              <NavLink to="/report">RFQ/EOI</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="0">
            <Icon type="" />
            <NavLink to="/" />
          </Menu.Item>
          <Menu.Item key="21">
            <Icon type="user" />
            <NavLink to="/registration">Registration</NavLink>
          </Menu.Item>
          <Menu.Item key="22">
            <Icon type="solution" />
            <NavLink to="/prequalification">Prequalification</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidenav;
