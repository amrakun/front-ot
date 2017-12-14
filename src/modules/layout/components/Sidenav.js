import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import { supplierSideMenu, buyerSideMenu } from '../consts';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const propTypes = {
  currentUser: PropTypes.object
};

class Sidenav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  renderMenu(sideMenu) {
    const menuItems = [];
    sideMenu.forEach(m => {
      if (m.subMenu) {
        menuItems.push(
          <SubMenu
            key={m.url}
            title={
              <span>
                <Icon type={m.icon} />
                <span>{m.title}</span>
              </span>
            }
          >
            {this.renderMenu(m.subMenu)}
          </SubMenu>
        );
      } else {
        menuItems.push(
          <MenuItem key={m.url}>
            {m.icon ? <Icon type={m.icon} /> : ''}
            <NavLink to={m.url}>{m.title}</NavLink>
          </MenuItem>
        );
      }
    });

    return (
      <Sider>
        <NavLink to="/" className="logo">
          <img
            src={process.env.PUBLIC_URL + '/images/logo_mn.png'}
            alt="logo"
          />
        </NavLink>
        <Menu defaultSelectedKeys={['/dashboard']} mode="inline">
          {menuItems}
        </Menu>
      </Sider>
    );
  }

  render() {
    const { currentUser } = this.props;

    let el = <div />;
    if (currentUser) {
      currentUser.isSupplier
        ? (el = this.renderMenu(supplierSideMenu))
        : (el = this.renderMenu(buyerSideMenu));
    }

    return el;
  }
}

Sidenav.propTypes = propTypes;

export default Sidenav;
