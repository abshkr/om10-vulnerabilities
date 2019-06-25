import React, { Component } from "react";

import axios from "axios";
import { ROUTES } from "../constants";
import { connect } from "react-redux";
import { Loading } from "../components";

export default Module => {
  class ComposedComponent extends Component {
    state = {
      configuration: null,
      isLoading: true
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
          configuration: response.data,
          isLoading: false
        });
      });
    };

    componentDidMount() {
      this.checkFrame();
      this.getConfiguration();
    }

    componentDidUpdate() {
      this.checkFrame();
    }

    render() {
      const { configuration, isLoading } = this.state;

      if (isLoading) {
        return <Loading />;
      }

      return <Module {...this.props} configuration={configuration} />;
    }
  }

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
