import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { supplierSideMenu, buyerSideMenu } from '../consts';
import { PropTypes } from 'prop-types';
import { T } from 'modules/common/components';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const supplier = renderMenu(supplierSideMenu, true);
const buyer = renderMenu(buyerSideMenu);

const Sidenav = (props, context) => {
  const { currentUser } = context;
  const { collapsed, onCollapse, pathname } = props;

  let defaultOpenKeys = [];

  if (
    [
      '/validation',
      '/due-diligence',
      '/audit',
      '/difot',
      '/blocking',
      '/prequalification-status',
      '/capacity-building-status'
    ].includes(pathname)
  ) {
    defaultOpenKeys.push('action');
  }

  if (['/feedback', '/feedback/responses'].includes(pathname)) {
    defaultOpenKeys.push('action', 'feedback');
  }

  if (
    [
      '/audit',
      '/audit/responses',
      '/audit/reports',
      '/audit/responses-physical'
    ].includes(pathname)
  ) {
    defaultOpenKeys.push('action', 'audit');
  }

  if (['/templates', '/manage-expiry-dates', '/user-list'].includes(pathname)) {
    defaultOpenKeys.push('settings');
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={230}
    >
      <NavLink to="/" className="logo">
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
      </NavLink>
      <Menu
        selectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {currentUser.isSupplier ? supplier : buyer}
      </Menu>
    </Sider>
  );
};

Sidenav.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  pathname: PropTypes.string
};
Sidenav.contextTypes = {
  currentUser: PropTypes.object
};

function renderMenu(sideMenu, translate) {
  const menuItems = [];

  sideMenu.forEach(m => {
    if (m.subMenu) {
      menuItems.push(
        <SubMenu
          key={m.url}
          disabled={m.disabled}
          title={
            <span>
              {m.icon ? <Icon type={m.icon} /> : ''}
              <span>{m.title}</span>
            </span>
          }
        >
          {renderMenu(m.subMenu)}
        </SubMenu>
      );
    } else {
      let title = (translate && <T id={m.title}>{m.title}</T>) || m.title;

      menuItems.push(
        <MenuItem key={m.url} disabled={m.disabled} className={m.className}>
          {m.icon ? <Icon type={m.icon} /> : ''}
          <NavLink to={m.url}>{title}</NavLink>
        </MenuItem>
      );
    }
  });

  return menuItems;
}

export default Sidenav;
