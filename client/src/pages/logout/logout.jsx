import React, { useEffect, Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';

import { ROUTES } from '../../constants';

const Logout = ({ signout, idle }) => {
  let history = useHistory();

  useEffect(() => {
    signout(idle);

    history.push(ROUTES.LOG_IN);
  }, [history, idle, signout]);

  return <Fragment />;
};

export default connect(null, actions)(Logout);
