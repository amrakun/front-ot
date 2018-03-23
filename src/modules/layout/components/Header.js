import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { colors } from 'modules/common/constants';
import { logout } from '../utils';
import { T } from 'modules/common/components';

const SubMenu = Menu.SubMenu;

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
            <Link to="/my-profile">
              <T id="My Profile">My Profile</T>
            </Link>
          </Menu.Item>
          <Menu.Item key="change-password">
            <Link to="/change-password">
              <T id="Change Password">Change Password</T>
            </Link>
          </Menu.Item>
          {!currentUser.isSupplier && (
            <Menu.Item key="delegation">
              <Link to="/delegation">Delegation</Link>
            </Menu.Item>
          )}
          <Menu.Item key="logout">
            <a onClick={logout}>
              <T id="Sign out">Sign Out</T>
            </a>
          </Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item className="right">
          <Link to="/sign-in">
            <T id="Sign in">Sign in</T>
          </Link>
        </Menu.Item>
      )}

      {currentUser && currentUser.isSupplier ? (
        <Menu.Item className="right" key="lang">
          <a onClick={props.toggleLang}>
            <span className="bordered">
              {props.langLabel === 'en' ? 'MN' : 'EN'}
            </span>
          </a>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

HeaderBar.contextTypes = {
  currentUser: PropTypes.object
};

HeaderBar.propTypes = {
  toggleLang: PropTypes.func,
  langLabel: PropTypes.string
};

export default HeaderBar;
