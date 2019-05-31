import React, { Component } from "react";
import { connect } from "react-redux";
import { CONFIG } from "../../constants";
import Authenticated from "./authenticated";
import "./navigation.css";

class Navigation extends Component {
  render() {
    if (!CONFIG.EMBEDDED) {
      return <Authenticated />;
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
