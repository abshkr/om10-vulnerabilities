import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signout extends Component {
  componentDidMount() {
    const { signout, history } = this.props;
    signout(this.props.idle);
    history.push("/signin");
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  actions
)(Signout);
