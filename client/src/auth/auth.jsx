import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthContainer } from './style';
import { service } from '../api';

export default Authenticated => {
  const ComposedComponent = () => {
    const [configuration, setConfiguration] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
      const authenticate = () => {
        axios.all([service.config()]).then(
          axios.spread(config => {
            setConfiguration(config.data);
            setLoading(false);
          })
        );
      };

      authenticate();
    }, []);

    return (
      <AuthContainer>
        <Spin indicator={<Icon className="spinner" type="loading" />} spinning={isLoading}>
          <Authenticated t={t} configuration={configuration} user={null} />
        </Spin>
      </AuthContainer>
    );
  };

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
