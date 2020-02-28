import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { AuthContainer } from './style';
import { fetcher } from '../utils';

export default Authenticated => {
  const ComposedComponent = ({ token }) => {
    const history = useHistory();

    useEffect(() => {
      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token, history]);

    useEffect(() => {
      const interval = setInterval(() => {
        const token = sessionStorage.getItem('token');

        console.log(token);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher
        }}
      >
        <AuthContainer>
          <Authenticated />
        </AuthContainer>
      </SWRConfig>
    );
  };

  const mapStateToProps = state => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
