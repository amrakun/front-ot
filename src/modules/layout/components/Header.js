import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import consts from 'consts';
import PropTypes from 'prop-types';
import { colors } from 'modules/common/colors';

const SubMenu = Menu.SubMenu;

function logout() {
  const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;
  localStorage.removeItem(LOGIN_TOKEN_KEY);
  localStorage.removeItem(LOGIN_REFRESH_TOKEN_KEY);

  window.location.href = '/';
}

function getColor(username) {
  let length = username.length;
  if (length > 10) length = length - 10;
  return colors[length];
}

const HeaderBar = (props, context) => {
  const { currentUser } = context || {};
  const username = currentUser && currentUser.username;

  return (
    <Menu
      mode="horizontal"
      className={!currentUser ? 'landing' : ''}
      selectable={false}
    >
      {!currentUser && (
        <Menu.Item className="logo landing">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + '/images/logo_mn.png'}
              alt="logo"
            />
          </Link>
        </Menu.Item>
      )}

      {currentUser ? (
        <SubMenu
          className="right header-submenu"
          title={
            <span>
              <Avatar style={{ backgroundColor: getColor(username) }}>
                {username.charAt(0)}
              </Avatar>
              {username}
            </span>
          }
        >
          <Menu.Item key="profile">
            <Link to="/my-profile">My profile</Link>
          </Menu.Item>
          <Menu.Item disabled key="delegate">
            Delegation
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logout}>Sign out</a>
          </Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item className="right">
          <Link to="/sign-in">Sign in</Link>
        </Menu.Item>
      )}

      <Menu.Item className="right" disabled key="lang">
        <span className="bordered">EN</span>
      </Menu.Item>
    </Menu>
  );
};

HeaderBar.contextTypes = {
  currentUser: PropTypes.object
};

export default HeaderBar;
