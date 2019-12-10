import React from "react";
import { LoginContainer, LoginModal, LoginTitle } from "./style";
import { Form, Icon, Input, Button } from "antd";

const Fields = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <Form>
      <LoginTitle>OMEGA 5000</LoginTitle>
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
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

      <Button className="login-button" shape="round" type="primary">
        Log in
      </Button>
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
    </LoginContainer>
  );
};

export default Login;
