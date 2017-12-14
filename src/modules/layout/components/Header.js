import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import consts from 'consts';

const SubMenu = Menu.SubMenu;

class HeaderBar extends React.Component {
  logout() {
    const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;
    console.log('asf');
    localStorage.removeItem(LOGIN_TOKEN_KEY);
    localStorage.removeItem(LOGIN_REFRESH_TOKEN_KEY);

    window.location.href = '/';
  }
  render() {
    const { currentUser } = this.props;

    return (
      <Menu mode="horizontal">
        {currentUser ? (
          <SubMenu
            title={
              <span>
                <Icon type="user" />
                {currentUser.username}
              </span>
            }
          >
            <Menu.Item key="profile">My profile</Menu.Item>
            <Menu.Item key="delegate">Delegation</Menu.Item>
            <Menu.Item key="logout">
              <a onClick={this.logout}>Sign out</a>
            </Menu.Item>
          </SubMenu>
        ) : (
          <Menu.Item className="right">
            <Link to="/sign-in">Sign in</Link>
          </Menu.Item>
        )}

        <Menu.Item key="lang">
          <span className="bordered">EN</span>
        </Menu.Item>
      </Menu>
    );
  }
}

HeaderBar.propTypes = {
  currentUser: PropTypes.object
};

export default HeaderBar;
