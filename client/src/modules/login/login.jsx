import React from "react";
import { Form, Icon, Input, Button } from "antd";

import {
  LoginContainer,
  LoginModal,
  LoginTitle,
  ForgotPasswordTitle,
  LoginView
} from "./style";

const Fields = ({ form }) => {
  const { getFieldDecorator } = form;

  const handleLogin = () => {
    form.validateFields((err, values) => {
      console.log(err, values);
    });
  };

  return (
    <Form>
      <LoginTitle>OMEGA 5000</LoginTitle>

      <p>Please Login to Continue</p>

      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your Username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Omega Personnel Code"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>

      <Button
        className="login-button"
        shape="round"
        type="primary"
        onClick={handleLogin}
      >
        Log in
      </Button>

      <ForgotPasswordTitle>
        <span>Forgot your Password?</span>
      </ForgotPasswordTitle>
    </Form>
  );
};

const Login = () => {
  const LoginForm = Form.create()(Fields);

  return (
    <LoginContainer>
      <LoginModal>
        <LoginForm />
      </LoginModal>
      <LoginView>
        <p>9.10.0</p>
      </LoginView>
    </LoginContainer>
  );
};

export default Login;
