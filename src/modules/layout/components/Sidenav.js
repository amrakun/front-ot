import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { supplierSideMenu, buyerSideMenu } from '../consts';
import { PropTypes } from 'prop-types';
import { _t } from 'modules/common/components';

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
      '/prequalification-status'
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
      let title =
        (translate && <_t id={'b_' + m.url.replace('/', '')}>{m.title}</_t>) ||
        m.title;

      menuItems.push(
        <MenuItem key={m.url} disabled={m.disabled}>
          {m.icon ? <Icon type={m.icon} /> : ''}
          <NavLink to={m.url}>{title}</NavLink>
        </MenuItem>
      );
    }
  });

  return menuItems;
}

export default Sidenav;
