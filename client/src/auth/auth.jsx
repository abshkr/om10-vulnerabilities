import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import ConfigStore from 'stores/config-store';
import useIdle from 'hooks/use-idle';
import * as ROUTES from 'constants/routes';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const config = useContext(ConfigStore);
    const isIdle = useIdle();

    let history = useHistory();

    const [user, setUser] = useState(null);

    useEffect(() => {
      try {
        const decoded = jwtDecode(token);

        if (decoded?.sess_id !== user?.sess_id) {
          setUser(decoded);
        }
      } catch (error) {
        history.push(ROUTES.LOG_OUT);
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
