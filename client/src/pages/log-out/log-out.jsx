import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import * as actions from '../../actions/auth';
import { ROUTES } from '../../constants';

const Logout = ({ signout, idle }) => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("password");

  let history = useHistory();

  useEffect(() => {
    sessionStorage.removeItem('alarms');
    sessionStorage.removeItem('lastSequence');
    signout(idle);
    Modal.destroyAll();

    history.push(ROUTES.LOG_IN);
  }, [history, idle, signout]);

  return null;
};

export default connect(null, actions)(Logout);
