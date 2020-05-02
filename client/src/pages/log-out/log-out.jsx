import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import * as actions from '../../actions/auth';
import { ROUTES } from '../../constants';

const Logout = ({ signout, idle }) => {
  let history = useHistory();

  useEffect(() => {
    signout(idle);
    Modal.destroyAll();

    history.push(ROUTES.LOG_IN);
  }, [history, idle, signout]);

  return null;
};

export default connect(null, actions)(Logout);
