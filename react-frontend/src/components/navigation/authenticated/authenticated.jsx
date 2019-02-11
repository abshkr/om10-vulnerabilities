import React, { Component } from "react";
import { stack as BurgerMenu } from "react-burger-menu";
import { Menu, Icon } from "antd";

import * as ROUTES from "../../../constants/routes";

import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

export const smooth = [
  {
    style: {
      opacity: 0
    },
    duration: 200
  },
  {
    style: {
      opacity: 1
    },
    duration: 800
  },
  {
    style: {},
    duration: 1000
  }
];

class Authenticated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  changePath = event => {
    this.setState({ menu: false });
    this.props.history.push(event.key);
  };

  render() {
    return (
      <div>
        <BurgerMenu width={320} isOpen={false}>
          <Menu onClick={this.changePath} mode="inline">
            <Menu.Item key={ROUTES.DASHBOARD}>
              <Icon type="appstore" theme="outlined" style={{ fontSize: 30 }} />
              <span>Dashboard</span>
            </Menu.Item>

            {/* <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="schedule" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Schedules</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.LOAD_SCHEDULES}>Load Schedules</Menu.Item>
              <Menu.Item key={ROUTES.EQUIPMENT_TYPES}>Equipment Types</Menu.Item>
              <Menu.Item key={ROUTES.EQUIPMENT_LIST}>Equipment List</Menu.Item>
              <Menu.Item key={ROUTES.TANKER_LIST}>Tanker List</Menu.Item>
              <Menu.Item key={ROUTES.TRANSACTION_LIST}>Transaction List</Menu.Item>
              <Menu.Item key={ROUTES.SELF_FUEL_TRANSACTION_LIST}>Self Fuel Transaction List</Menu.Item>
            </SubMenu> */}
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="deployment-unit" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Gantry</span>
                </span>
              }
            >
              {/* <Menu.Item key={ROUTES.LOAD_BAYS}>Load Bays</Menu.Item>
              <Menu.Item key={ROUTES.COMPANIES}>Companies</Menu.Item>
              <Menu.Item key={ROUTES.TANK_GROUPS}>Tank Groups</Menu.Item>
              
              <Menu.Item key={ROUTES.DRAWER_PRODUCTS}>Drawer Products</Menu.Item>
              <Menu.Item key={ROUTES.TANK_CONFIGURATIONS}>Tank Configuration</Menu.Item>
              <Menu.Item key={ROUTES.PRODUCT_GROUPS}>Product Groups</Menu.Item>
              <Menu.Item key={ROUTES.ALLOCATIONS}>Allocations</Menu.Item>
              <Menu.Item key={ROUTES.HAZCHEM_CODES}>Hazchem Codes</Menu.Item>
              <Menu.Item key={ROUTES.LOAD_METERS}>Load Meters</Menu.Item> */}
              <Menu.Item key={ROUTES.BASE_PRODUCTS}>Base Products</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="project" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Reports</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.JOURNAL}>Journal</Menu.Item>
              {/* <Menu.Item key={ROUTES.PROFILE}>Profile</Menu.Item> */}
              <Menu.Item key={ROUTES.ON_DEMAND_REPORTS}>On Demand Reports</Menu.Item>
              {/* <Menu.Item key={ROUTES.CONFIGURATION}>Configuration</Menu.Item>
              <Menu.Item key={ROUTES.PERSONNEL_ON_SITE}>Personnel Currently On Site</Menu.Item>
              <Menu.Item key={ROUTES.FOLIO_SUMMARY}>Folio Summary</Menu.Item>
              <Menu.Item key={ROUTES.FOLIO_SCHEDULLING}>Folio Schedulling</Menu.Item>
              <Menu.Item key={ROUTES.HOST_MESSAGING_INTERFACE}>Host Messaging Interface</Menu.Item>
              <Menu.Item key={ROUTES.AUDITING_DATA}>Auditing Data</Menu.Item> */}
            </SubMenu>

            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="file-protect" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Access Control</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.ID_ASSIGNMENT}>Id Assignment</Menu.Item>
              <Menu.Item key={ROUTES.PERSONNEL}>Personnel</Menu.Item>
              {/* <Menu.Item key={ROUTES.ROLE_ACCESS_MANAGEMENT}>Role Access Management</Menu.Item>
              <Menu.Item key={ROUTES.EXPIRY_DATES}>Expiry Dates</Menu.Item>
              <Menu.Item key={ROUTES.AREA}>Area</Menu.Item>
              <Menu.Item key={ROUTES.SITE_ACCESS_DEVICES}>Site Access Devices</Menu.Item>
              <Menu.Item key={ROUTES.GATE_PERMISSION}>Gate Permission</Menu.Item>
              <Menu.Item key={ROUTES.GATE_CONTROL}>Gate Control</Menu.Item>
              <Menu.Item key={ROUTES.TIME_CODES}>Time Codes</Menu.Item> */}
            </SubMenu>

            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="team" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Customers</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.CUSTOMER_CATEGORIES}>Customer Categories</Menu.Item>
              {/* <Menu.Item key={ROUTES.CUSTOMERS}>Customers</Menu.Item>
              <Menu.Item key={ROUTES.ORDER_LISTINGS}>Order Listing</Menu.Item>
              <Menu.Item key={ROUTES.ADDRESSES}>Addresses</Menu.Item>
              <Menu.Item key={ROUTES.DELIVERY_LOCATIONS}>Delivery Locations</Menu.Item> */}
            </SubMenu>

            <SubMenu
              key="sub7"
              title={
                <span>
                  <Icon type="bar-chart" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Stock Management</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.METERING}>Metering</Menu.Item>
              <Menu.Item key={ROUTES.TANK_INVENTORY}>Tank Inventory</Menu.Item>
              <Menu.Item key={ROUTES.SITE_BALANCE}>Site Balance</Menu.Item>
              <Menu.Item key={ROUTES.PRODUCT_INVENTORY}>Product Inventory</Menu.Item>
              {/* <Menu.Item key={ROUTES.TANK_STATUS}>Tank Status</Menu.Item>
              <Menu.Item key={ROUTES.PRODUCT_MOVEMENT}>Product Movement</Menu.Item>
              <Menu.Item key={ROUTES.INVENTORY_REQUESTS}>Inventory Requests</Menu.Item> */}
            </SubMenu>

            {/* <SubMenu
              key="sub8"
              title={
                <span>
                  <Icon type="printer" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Printer Configuration</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.LOGICAL_PRINTERS}>Logical Printers</Menu.Item>
              <Menu.Item key={ROUTES.PHYSICAL_PRINTERS}>Physical Printers</Menu.Item>
            </SubMenu> */}

            {/* <SubMenu
              key="sub9"
              title={
                <span>
                  <Icon type="reconciliation" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Stock Reconcilliation</span>
                </span>
              }
            >
              <Menu.Item key={ROUTES.MOVEMENT_NOTIFICATIONS}>Movement Notifications</Menu.Item>
              <Menu.Item key={ROUTES.MOVEMENT_REASONS}>Movement Reasons</Menu.Item>
              <Menu.Item key={ROUTES.MANUAL_TRANSACTIONS}>Manual Transactions</Menu.Item>
              <Menu.Item key={ROUTES.SPECIAL_MOVEMENTS}>Special Movements</Menu.Item>
            </SubMenu> */}

            <SubMenu
              key="sub10"
              title={
                <span>
                  <Icon type="cluster" theme="outlined" style={{ fontSize: 30 }} />
                  <span>Operations</span>
                </span>
              }
            >
              {/* <Menu.Item key={ROUTES.BAY_VIEW}>Bay View</Menu.Item>
              <Menu.Item key={ROUTES.DRAWER_PRODUCT_ASSETS}>Drawer Product Assets</Menu.Item> */}
              <Menu.Item key={ROUTES.DRIVER_MESSAGING}>Driver Messaging</Menu.Item>
            </SubMenu>
          </Menu>
        </BurgerMenu>
      </div>
    );
  }
}

export default withRouter(Authenticated);
