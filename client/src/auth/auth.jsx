import React, { useEffect, useState, useContext } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ConfigStore from 'stores/config-store';
import * as ROUTES from 'constants/routes';
import useIdle from 'hooks/use-idle';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const config = useContext(ConfigStore);
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

    return <Authenticated user={user} config={config} />;
  };

  const mapStateToProps = (state) => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
