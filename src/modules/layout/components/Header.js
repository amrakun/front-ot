import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class HeaderBar extends React.Component {
  render() {
    return (
      <Menu mode="horizontal">
        <SubMenu
          title={
            <span>
              <Icon type="user" />Mend-Orshikh
            </span>
          }
        >
          <Menu.Item key="profile">My profile</Menu.Item>
          <Menu.Item key="delegate">Delegation</Menu.Item>
          <Menu.Item key="logout">Log out</Menu.Item>
        </SubMenu>
        <Menu.Item key="lang">
          <span className="bordered">EN</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default HeaderBar;
