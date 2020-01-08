import React from 'react';
import { connect } from 'react-redux';

const Login = ({ auth }) => {
  return <div>Login</div>;
};

const AuthStoreMap = state => {
  return { auth: state.auth.authenticated };
};

export default connect(AuthStoreMap)(Login);
