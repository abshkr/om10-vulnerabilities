import React, { useEffect, useState } from 'react';
import { SmileOutlined, FrownOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification, Divider, Carousel } from 'antd';

import { useHistory } from 'react-router-dom';

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
  LoginTitle,
  LoginHeader,
  SliderContainer
} from './style';

import * as actions from '../../actions/auth';

import { ROUTES } from '../../constants';

const Login = ({ handleLogin, auth }) => {
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = values => {
    setLoading(true);

    handleLogin(values, response => {
      if (response.status === 200) {
        notification.success({
          placement: 'bottomRight',
          message: 'Login Successful.',
          description: `You have logged in as ${values.code}`,
          icon: <SmileOutlined style={{ color: '#4164e3' }} />
        });

        history.push(ROUTES.DASHBOARD);
      } else {
        setLoading(false);

        notification.error({
          placement: 'bottomRight',
          message: 'Login Failed.',
          description: _.capitalize(response.data.msg_desc),
          icon: <FrownOutlined style={{ color: '#ec6e68' }} />
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
      <Helmet>
        <title>Login ─ Auth ─ OMEGA 5000</title>
      </Helmet>

      <FormContainer>
        <FormBlock>
          <LoginTitle>
            <span>OMEGA</span> 5000
          </LoginTitle>

          <LoginHeader>Terminal Automation At Your Fingertips</LoginHeader>
          <LoginSubtitle>Login to your account</LoginSubtitle>

          <Form onFinish={handleSubmit}>
            <Form.Item
              name="code"
              rules={[{ required: true, message: 'Please Input Your Omega Personnel Code!' }]}
            >
              <Input
                style={{ marginBottom: 5 }}
                prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Omega Personnel Code"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please Input Your Password!' }]}>
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
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
        <Carousel autoplay dotPosition="bottom">
          <>
            <SliderContainer>
              <img src="/svg/oil_truck.svg" alt="oil_tanker" />
              <div>
                <h3>Customize Your Equipment</h3>
                <p>With OMEGA you can manage and create Equipment with a few clicks.</p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/calender.svg" alt="calender" />
              <div>
                <h3>Scheduling</h3>
                <p>Schedule your Loads ahead of time to improve efficiency with OMEGA. </p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/cargo_ship_one.svg" alt="cargo_ship" />
              <div>
                <h3>Inventory Management</h3>
                <p>Scale your ability to manage multiple inventories using bulk editing in OMEGA.</p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/seo.svg" alt="seo" />
              <div>
                <h3>Detailed Reporting</h3>
                <p>
                  OMEGA allows the generation of complex reports to help you understand the detailed workings
                  of your Terminal
                </p>
              </div>
            </SliderContainer>
          </>
        </Carousel>
      </GraphicContainer>
    </LoginContainer>
  );
};

const mapActionsToProps = dispatch => ({
  handleLogin: (code, password) => dispatch(actions.login(code, password))
});

const mapStateToProps = state => {
  return { auth: state.auth.authenticated };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
