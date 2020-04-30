import React, { useEffect } from 'react';

import { SWRConfig } from 'swr';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { AuthContainer } from './style';
import { fetcher } from '../utils';
import { useIdle } from '../hooks';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const isIdle = useIdle();

    const history = useHistory();

    const onError = (error) => {
      notification.error({
        message: 'Error Fetching Data for This View.',
        description: error?.message,
        key: error?.message,
      });
    };

    useEffect(() => {
      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token, history]);

    useEffect(() => {
      if (isIdle) {
        history.push(ROUTES.LOG_OUT);
      }
    }, [isIdle]);

    return (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
          onError,
          errorRetryCount: 3,
        }}
      >
        <AuthContainer>
          <Authenticated />
        </AuthContainer>
      </SWRConfig>
    );
  };

  const mapStateToProps = (state) => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
