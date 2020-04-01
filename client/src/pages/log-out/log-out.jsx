import React from 'react';
import { useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';
import { ROUTES } from '../../constants';

const { confirm } = Modal;

const Logout = ({ signout, idle }) => {
  let history = useHistory();

  useEffect(() => {
    confirm({
      title: 'Are you sure want to Log Out?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Log Out',
      centered: true,
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        signout(idle);

        history.push(ROUTES.LOG_IN);
      },

      onCancel() {
        history.push(ROUTES.DASHBOARD);
      }
    });
  }, [history, idle, signout]);

  return null;
};

export default connect(null, actions)(Logout);
