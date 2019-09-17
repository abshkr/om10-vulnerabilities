import React, { Component } from "react";
import axios from "axios";
import { ROUTES } from "../constants";
import { connect } from "react-redux";
import { Loading } from "../components";
import { api } from "../api";
import { withTranslation } from "react-i18next";

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
      const url =
        process.env.NODE_ENV === "development"
          ? "/config.json"
          : `https://${api}/api/config.php`;

      axios.get(url).then(response => {
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

  const AuthComponent = withTranslation()(ComposedComponent);

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(AuthComponent);
};
