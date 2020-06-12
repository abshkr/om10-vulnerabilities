import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { ROUTES } from '../constants';

import { useIdle } from '../hooks';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const [user, setUser] = useState(null);

    const isIdle = useIdle();

    const history = useHistory();

    useEffect(() => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          // invalid jwt
          history.push(ROUTES.LOG_OUT);
        }
      }

      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token, history]);

    useEffect(() => {
      if (isIdle) {
        history.push(ROUTES.LOG_OUT);
      }
    }, [isIdle, history]);

    return <Authenticated user={user} />;
  };

  const mapStateToProps = (state) => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
