import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import * as actions from '../../actions/auth';
import { ROUTES } from '../../constants';

const Logout = ({ signout, idle }) => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('password');

  let navigate = useNavigate();

  useEffect(() => {
    signout(idle);
    Modal.destroyAll();

    navigate(ROUTES.LOG_IN);
  }, [navigate, idle, signout]);

  return null;
};

export default connect(null, actions)(Logout);
