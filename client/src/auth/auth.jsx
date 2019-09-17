import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Loading } from '../components';
import { api } from '../api';
import { withTranslation } from 'react-i18next';

export default Module => {
  class ComposedComponent extends Component {
    state = {
      configuration: null,
      isLoading: true
    };

    getConfiguration = () => {
      axios.get('/config.php').then(response => {
        this.setState({
          configuration: response.data,
          isLoading: false
        });
      });
    };

    componentDidMount() {
      this.getConfiguration();
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
