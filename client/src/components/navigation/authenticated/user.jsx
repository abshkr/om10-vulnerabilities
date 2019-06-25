import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "antd";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changePath = event => {
    this.props.history.push(event.key);
  };

  render() {
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.changePath}>
            <Menu.Item key={ROUTES.SITE_CONFIGURATION}>
              <Icon type="setting" theme="outlined" /> <span>Site Configuration</span>
            </Menu.Item>

            <Menu.Item key={ROUTES.USER_PROFILE}>
              <Icon type="user" theme="outlined" /> <span>User Profile</span>
            </Menu.Item>

            <Menu.Item key={ROUTES.ABOUT}>
              <Icon type="file-text" theme="outlined" /> <span>EULA</span>
            </Menu.Item>

            <Menu.Item key={ROUTES.HELP}>
              <Icon type="question-circle" theme="outlined" /> <span>Help</span>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key={ROUTES.SIGN_OUT}>
              <Icon type="logout" theme="outlined" /> <span>Logout</span>
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Icon type="idcard" theme="outlined" style={{ color: "#fff", fontSize: 40, marginRight: 10 }} />
      </Dropdown>
    );
  }
}

export default withRouter(User);
