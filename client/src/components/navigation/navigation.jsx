import React from 'react';

import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router';

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
      defaultSelectedKeys={['/dashboard']}
      theme="dark"
      mode="inline"
    >
      <Menu.Item key="/dashboard">
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
        <Menu.Item key="/equipment-list">
          <span className="submenu-item">Equipment List</span>
        </Menu.Item>
        <Menu.Item key="/tanker-list">
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
        <Menu.Item key="/base-products">
          <span className="submenu-item">Base Products</span>
        </Menu.Item>
        <Menu.Item key="/tank-configurations">
          <span className="submenu-item">Tank Configuration</span>
        </Menu.Item>
        <Menu.Item key="/transactions">
          <span className="submenu-item">Transactions</span>
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
        <Menu.Item key="/journal">
          <span className="submenu-item">Journal</span>
        </Menu.Item>
        <Menu.Item key="/report-profile">
          <span className="submenu-item">Report Profile</span>
        </Menu.Item>
        <Menu.Item key="/report-configuration">
          <span className="submenu-item">Report Configuration</span>
        </Menu.Item>
        <Menu.Item key="/folio-summary">
          <span className="submenu-item">Folio Summary</span>
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
        <Menu.Item key="/personnel">
          <span className="submenu-item">Personnel</span>
        </Menu.Item>
        <Menu.Item key="/area">
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
        <Menu.Item key="/metering">
          <span className="submenu-item">Metering</span>
        </Menu.Item>
        <Menu.Item key="/site-balance">
          <span className="submenu-item">Site Balance</span>
        </Menu.Item>

        <Menu.Item key="/tank-inventory">
          <span className="submenu-item">Tank Inventory</span>
        </Menu.Item>

        <Menu.Item key="/product-inventory">
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
        <Menu.Item key="/tank-view">
          <span className="submenu-item">Tank View</span>
        </Menu.Item>
        <Menu.Item key="/adaptive-flow-control">
          <span className="submenu-item">Adaptive Flow Control</span>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default withRouter(Navigation);
