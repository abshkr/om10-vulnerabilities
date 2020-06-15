import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { ROUTES } from '../constants';

import { useIdle } from '../hooks';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const isIdle = useIdle();
    let history = useHistory();

    const [user, setUser] = useState(null);

    useEffect(() => {
      if (token) {
        try {
          const decoded = jwtDecode(token);

          if (decoded?.sess_id !== user?.sess_id) {
            setUser(decoded);
          }
        } catch (error) {
          // invalid jwt
          history.push(ROUTES.LOG_OUT);
        }
      }

      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token]);

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
