import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { ROUTES } from "../../../constants";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class Authenticated extends Component {
  handleNavigation = event => {
    const { history } = this.props;
    history.push(event.key);
  };

  render() {
    const { defaultKey } = this.props;
    return (
      <Menu theme="dark" defaultSelectedKeys={defaultKey} mode="inline" onClick={this.handleNavigation}>
        <Menu.Item key={ROUTES.DASHBOARD}>
          <Icon type="dashboard" />
          <span>Dashboard</span>
        </Menu.Item>

        <SubMenu
          key="schedule"
          title={
            <span>
              <Icon type="schedule" />
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
        </SubMenu>

        <SubMenu
          key="gantry"
          title={
            <span>
              <Icon type="deployment-unit" />
              <span>Gantry</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.BASE_PRODUCTS}>Base Products</Menu.Item>
          <Menu.Item key={ROUTES.TANK_CONFIGURATIONS}>Tank Configurations</Menu.Item>
        </SubMenu>

        <SubMenu
          key="printer"
          title={
            <span>
              <Icon type="printer" />
              <span>Printer</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.LOGICAL_PRINTERS}>Logical</Menu.Item>
          <Menu.Item key={ROUTES.PHYSICAL_PRINTERS}>Physical</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Authenticated);
