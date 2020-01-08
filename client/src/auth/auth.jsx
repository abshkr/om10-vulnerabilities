import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ROUTES, SETTINGS } from '../constants';
import { AuthContainer } from './style';
import { service } from '../api';

export default Authenticated => {
  const ComposedComponent = ({ history, auth }) => {
    const [configuration, setConfiguration] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
      const authenticate = () => {
        axios.all([service.user(), service.config()]).then(
          axios.spread((currentUser, config) => {
            if (!SETTINGS.IS_DEVELOPMENT && currentUser.data.records.length === 0) {
              history.push(ROUTES.UNAUTHORIZED);
              setLoading(false);
            } else {
              setUser(currentUser.data.records[0]);
              setConfiguration(config.data);
              setLoading(false);
            }
          })
        );
      };

      authenticate();
    }, [history]);

    useEffect(() => {
      if (!auth) {
        history.push(ROUTES.LOG_IN);
      }
    }, [history, auth]);

    return (
      <AuthContainer>
        <Spin indicator={<Icon className="spinner" type="loading" />} spinning={isLoading}>
          {!isLoading && <Authenticated t={t} configuration={configuration} user={user} />}
        </Spin>
      </AuthContainer>
    );
  };

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
