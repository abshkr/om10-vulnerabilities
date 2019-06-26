import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Bar from "./bar";

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
