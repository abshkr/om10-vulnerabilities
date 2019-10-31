import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Spin, Icon } from 'antd';
import { withTranslation } from 'react-i18next';

import { ROUTES, SETTINGS } from '../constants';
import { service } from '../api';

import './auth.css';

export default Authenticated => {
  const ComposedComponent = ({ t, history }) => {
    const [configuration, setConfiguration] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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
          }),
        );
      };

      authenticate();
    }, [history]);

    return (
      <Spin indicator={<Icon className="spinner" type="loading" />} spinning={isLoading}>
        {!isLoading && <Authenticated t={t} configuration={configuration} user={user} />}
      </Spin>
    );
  };

  return withTranslation()(ComposedComponent);
};
