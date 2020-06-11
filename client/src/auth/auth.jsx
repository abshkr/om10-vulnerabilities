import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

import { ROUTES } from '../constants';

import { useIdle } from '../hooks';

export default (Authenticated) => {
  const ComposedComponent = ({ token }) => {
    const isIdle = useIdle();

    const history = useHistory();

    useEffect(() => {
      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token, history]);

    useEffect(() => {
      if (isIdle) {
        Modal.destroyAll();

        history.push(ROUTES.LOG_OUT);
      }
    }, [isIdle, history]);

    return <Authenticated token={token} />;
  };

  const mapStateToProps = (state) => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
