import React, { Component } from "react";
import { stack as BurgerMenu } from "react-burger-menu";
import { Menu, Icon } from "antd";
import Bar from "./bar";
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
        <Bar />
      </div>
    );
  }
}

export default withRouter(Authenticated);
