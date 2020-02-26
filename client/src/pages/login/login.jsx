import React, { useEffect, useState } from 'react';
import { Form, Icon, Input, Button, notification, Divider } from 'antd';

import { useHistory } from 'react-router-dom';
import Particles from 'react-particles-js';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import {
  LoginContainer,
  FormContainer,
  LoginSubtitle,
  LoginFooter,
  LoginFooterLogo,
  GraphicContainer,
  FormBlock,
  LoginTitle
} from './style';

import * as actions from '../../actions/auth';
import { ROUTES } from '../../constants';

const LoginForm = ({ form, handleLogin, auth }) => {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        handleLogin(values, response => {
          if (response.status === 200) {
            notification.success({
              placement: 'bottomRight',
              message: 'Login Successful.',
              description: `You have logged in as ${values.code}`,
              icon: <Icon type="smile" style={{ color: '#68a4ec' }} />
            });

            history.push(ROUTES.DASHBOARD);
          } else {
            setLoading(false);

            notification.error({
              placement: 'bottomRight',
              message: 'Login Failed.',
              description: _.capitalize(response.data.msg_desc),
              icon: <Icon type="frown" style={{ color: '#ec6e68' }} />
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    if (auth) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [auth, history]);

  const { getFieldDecorator } = form;

  return (
    <LoginContainer>
      <Helmet>
        <title>Login ─ Auth ─ OMEGA 5000</title>
      </Helmet>

      <FormContainer>
        <FormBlock>
          <LoginTitle>
            <span>OMEGA</span> 5000
          </LoginTitle>
          <LoginSubtitle>Login to your account</LoginSubtitle>
          <Form onSubmit={handleSubmit}>
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

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" loading={isLoading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </FormBlock>

        <LoginFooter>
          <Divider style={{ marginBottom: 12 }} />
          <LoginFooterLogo>
            <img src="/images/dki_big.png" alt="Diamondkey International" />
          </LoginFooterLogo>
        </LoginFooter>
      </FormContainer>

      <GraphicContainer>
        <Particles
          height="95vh"
          params={{
            particles: {
              shape: {
                type: 'triangle'
              },
              number: {
                value: 80
              },
              color: {
                value: '#68a4ec'
              },
              size: {
                value: 3
              },
              line_linked: {
                enable: true,
                color: '#bbbbbb'
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'grab'
                }
              }
            }
          }}
        />
      </GraphicContainer>
    </LoginContainer>
  );
};

const Login = Form.create()(LoginForm);

const mapActionsToProps = dispatch => ({
  handleLogin: (code, password) => dispatch(actions.login(code, password))
});

const mapStateToProps = state => {
  return { auth: state.auth.authenticated };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);

/* <Form onSubmit={handleSubmit}>
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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: 12 }} />

        <LoginLinks>
          <a>Support</a>
          <a>About (EULA)</a>
          <a>Help</a>
        </LoginLinks>

        <LoginFooter>
          <Divider style={{ margin: 12 }} />
          <LoginFooterLogo>
            <img src="/images/dki_big.png" alt="Diamondkey International" />
          </LoginFooterLogo>
        </LoginFooter> */
