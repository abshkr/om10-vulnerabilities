import React, { Component } from "react";
import { connect } from "react-redux";
import Authenticated from "./authenticated";

import "./navigation.css";

class Navigation extends Component {
  render() {
    const { authenticated, config } = this.props;
    if (!config.embedded) {
      return authenticated ? <Authenticated /> : null;
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
