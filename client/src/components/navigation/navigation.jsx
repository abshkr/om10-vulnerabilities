import React from 'react';

import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router';

import { ROUTES } from '../../constants';

import './navigation.css';

const { SubMenu } = Menu;

const Navigation = ({ history }) => {
  const handleNavigation = event => {
    const { key } = event;

    history.push(key);
  };

  return (
    <Menu
      onClick={handleNavigation}
      defaultSelectedKeys={[ROUTES.DASHBOARD]}
      theme="dark"
      mode="inline"
    >
      <Menu.Item key={ROUTES.DASHBOARD}>
        <Icon className="menu-icon" type="fire" />
        <span className="menu-item">Dashboard</span>
      </Menu.Item>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="clock-circle" />
            <span className="menu-item">Schedules</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.EQUIPMENT_LIST}>
          <span className="submenu-item">Equipment List</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.TANKER_LIST}>
          <span className="submenu-item">Tanker List</span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="monitor" />
            <span className="menu-item">Gantry</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.TANK_CONFIGURATIONS}>
          <span className="submenu-item">Tank Configuration</span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="file-done" />
            <span className="menu-item">Reports</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.JOURNAL}>
          <span className="submenu-item">Journal</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.REPORT_PROFILE}>
          <span className="submenu-item">Report Profile</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.REPORT_CONFIGURATION}>
          <span className="submenu-item">Report Configuration</span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="file-protect" />
            <span className="menu-item">Access Control</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.PERSONNEL}>
          <span className="submenu-item">Personnel</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.AREA}>
          <span className="submenu-item">Area</span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="experiment" />
            <span className="menu-item">Stock Management</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.METERING}>
          <span className="submenu-item">Metering</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.SITE_BALANCE}>
          <span className="submenu-item">Site Balance</span>
        </Menu.Item>

        <Menu.Item key={ROUTES.TANK_INVENTORY}>
          <span className="submenu-item">Tank Inventory</span>
        </Menu.Item>

        <Menu.Item key={ROUTES.PRODUCT_INVENTORY}>
          <span className="submenu-item">Product Inventory</span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span>
            <Icon className="menu-icon" type="cluster" />
            <span className="menu-item">Operations</span>
          </span>
        }
      >
        <Menu.Item key={ROUTES.TANK_VIEW}>
          <span className="submenu-item">Tank View</span>
        </Menu.Item>
        <Menu.Item key={ROUTES.ADAPTIVE_FLOW_CONTROL}>
          <span className="submenu-item">Adaptive Flow Control</span>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default withRouter(Navigation);
