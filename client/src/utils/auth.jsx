import React, { Component } from "react";
import { connect } from "react-redux";
import checkSession from "./checkSession";
import * as ROUTES from "../constants/routes";
import { Loading } from "../components";
import axios from "axios";

export default Module => {
  class ComposedComponent extends Component {
    state = {
      configuration: null
    };

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

    getConfiguration = () => {
      axios.get("/html/config.json").then(response => {
        this.setState({
          configuration: response.data
        });
      });
    };

    componentDidMount() {
      const { history } = this.props;
      setInterval(() => checkSession(history), 1000);
      this.protectRoute();
      this.checkFrame();
      this.getConfiguration();
    }

    componentDidUpdate() {
      this.protectRoute();
      this.checkFrame();
    }

    render() {
      const { configuration } = this.state;

      if (!configuration) {
        return null;
      }

      return <Module {...this.props} configuration={configuration} />;
    }
  }

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
