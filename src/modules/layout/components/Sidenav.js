import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { supplierSideMenu, buyerSideMenu } from '../consts';
import { PropTypes } from 'prop-types';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const supplier = renderMenu(supplierSideMenu);
const buyer = renderMenu(buyerSideMenu);

const Sidenav = (props, context) => {
  const { currentUser } = context;
  const { collapsed, onCollapse, pathname } = props;

  let defaultOpenKeys = [];
  if (
    ['/validation', '/due-diligence', '/audit', '/difot', '/blocking'].includes(
      pathname
    )
  ) {
    defaultOpenKeys.push('action');
  }
  if (['/feedback', '/feedback/responses'].includes(pathname)) {
    defaultOpenKeys.push('action', 'feedback');
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <NavLink to="/" className="logo">
        <img src={process.env.PUBLIC_URL + '/images/logo_mn.png'} alt="logo" />
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

function renderMenu(sideMenu) {
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
      menuItems.push(
        <MenuItem key={m.url} disabled={m.disabled}>
          {m.icon ? <Icon type={m.icon} /> : ''}
          <NavLink to={m.url}>{m.title}</NavLink>
        </MenuItem>
      );
    }
  });

  return menuItems;
}

export default Sidenav;
