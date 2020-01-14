import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';
import { LoginContainer, FormContainer, LoginHeader, LoginSubtitle, LoginFooter, LoginIcons } from './style';
import { ROUTES } from '../../constants';

const LoginForm = ({ form, handleLogin, auth }) => {
  const { getFieldDecorator } = form;

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        handleLogin(values, () => {
          history.push(ROUTES.DASHBOARD);
        });
      }
    });
  };

  useEffect(() => {
    if (auth) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [auth, history]);

  return (
    <LoginContainer>
      <FormContainer>
        <LoginHeader>OMEGA 5000</LoginHeader>
        <LoginSubtitle>Please Login to Continue</LoginSubtitle>

        <Form>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please Input Your Omega Personnel Code!' }]
            })(
              <Input
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Omega Personnel Code"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please Input Your Password!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Log in
          </Button>
        </Form>
      </FormContainer>

      <LoginFooter>
        <LoginIcons>
          <Icon type="message" />
          <Icon type="info-circle" />
          <Icon type="smile" />
        </LoginIcons>
      </LoginFooter>
    </LoginContainer>
  );
};

const Login = Form.create()(LoginForm);

const AuthActionMap = dispatch => ({
  handleLogin: (code, password) => dispatch(actions.login(code, password))
});

const AuthStoreMap = state => {
  return { auth: state.auth.authenticated };
};

export default connect(AuthStoreMap, AuthActionMap)(Login);
