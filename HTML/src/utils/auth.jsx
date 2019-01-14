import React, { Component } from "react";
import { connect } from "react-redux";
import checkSession from "./checkSession";
import configuration from "../configuration";
import * as ROUTES from "../constants/routes";

export default Module => {
  class ComposedComponent extends Component {
    protectRoute = () => {
      const { auth, history } = this.props;
      if (!auth) {
        history.push("/signin");
      }
    };

    checkFrame = () => {
      const { history } = this.props;

      if (process.env.NODE_ENV === "development") {
        if (window !== window.top) {
          history.push(ROUTES.UNAUTHORIZED);
        }
      } else {
        if (window === window.top) {
          history.push(ROUTES.UNAUTHORIZED);
        }
      }
    };

    componentDidMount() {
      const { history } = this.props;
      setInterval(() => checkSession(history), 1000);
      this.protectRoute();
      this.checkFrame();
    }

    componentDidUpdate() {
      this.protectRoute();
      this.checkFrame();
    }

    render() {
      return <Module {...this.props} configuration={configuration} />;
    }
  }

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
