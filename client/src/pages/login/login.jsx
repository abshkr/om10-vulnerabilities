import React, { useEffect, useState } from 'react';
import Icon, { SmileOutlined, FrownOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification, Divider, Carousel, Modal, Select } from 'antd';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { ReactComponent as LoginIcon } from './login.svg';

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
  SliderContainer,
  Version,
} from './style';

import * as actions from '../../actions/auth';

import { ROUTES, SETTINGS } from '../../constants';
import { Icons } from '../../components/';

const LoginOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.8)' }} component={LoginIcon} {...props} />
);

const Login = ({ handleLogin, auth }) => {
  const { i18n, t } = useTranslation();

  const [isLoading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(null);
  const [status, setStatus] = useState(1);

  const history = useHistory();

  const handleLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const handleSubmit = (values) => {
    setLoading(true);

    handleLogin(values, (response) => {
      if (response?.data?.token) {
        history.push(ROUTES.HOME);

        notification.success({
          placement: 'bottomRight',
          message: t('messages.loginSuccess'),
          description: `${t('descriptions.loginSuccess')} ${values.code}`,
          icon: <SmileOutlined style={{ color: '#0054A4' }} />,
        });
      } else {
        setLoading(false);
        const attempt =
          _.toNumber(response?.data.attempt_left) < 0 ? 0 : _.toNumber(response?.data.attempt_left);

        setStatus(_.toNumber(response?.data.user_status_flag));

        setAttempts(attempt);
        notification.error({
          placement: 'bottomRight',
          message: t('messages.loginFailed'),
          description: _.capitalize(response.data.msg_desc),
          icon: <FrownOutlined style={{ color: '#ec6e68' }} />,
        });
      }
    });
  };

  const onHelp = () => {
    Modal.info({
      title: t('generic.helpHeader'),
      content: (
        <div>
          <p>
            <strong>{t('generic.international')}: </strong> +61 3 9730 8883
          </p>
          <p>
            <strong>{t('generic.withinAustralia')}: </strong> 03 9730 8883
          </p>
          <p>
            <strong>{t('generic.tollFree')}: </strong> 1800 333 319
          </p>
          <p>
            <strong>{t('generic.email')}: </strong> support@diamondkey.com
          </p>
          <p>
            <strong>{t('generic.facsimile')}: </strong> +61 3 9764 9601
          </p>
          <Divider />
          <h3>{t('generic.help')}</h3>
          <a href="/om5000/docs/manual.pdf">{t('operations.clickHere')}</a>
          <Divider />
          <h3>{t('generic.about')}</h3>
          <a href="/om5000/docs/eula.pdf">{t('operations.clickHere')}</a>
        </div>
      ),
    });
  };

  useEffect(() => {
    if (auth) {
      history.push(ROUTES.HOME);
    }
  }, [auth, history]);

  return (
    <LoginContainer>
      <Helmet>
        <title>{t('generic.title')} ─ OMEGA 5000</title>
      </Helmet>

      <Version>
        {t('generic.version')}: {SETTINGS.VERSION}
      </Version>

      <FormContainer>
        <FormBlock>
          <LoginTitle>
            <img src="/images/omega.png" alt="OMEGA 5000" />
          </LoginTitle>

          <LoginHeader>{t('generic.loginHeader')}</LoginHeader>
          <LoginSubtitle>{t('generic.login')}</LoginSubtitle>

          <Form onFinish={handleSubmit} initialValues={{ language: i18n.language || 'en' }}>
            <Form.Item name="code" rules={[{ required: true, message: t('messages.inputOmegaUser') }]}>
              <Input
                style={{ marginBottom: 5 }}
                prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={t('fields.omegaUser')}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: t('messages.inputOmegaPassword') }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder={t('fields.password')}
              />
            </Form.Item>

            <Form.Item
              extra={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ marginTop: 5 }}>
                    <Form.Item name="language">
                      <Select
                        style={{ fontSize: 13, width: 100, color: '#0054a4' }}
                        onChange={handleLanguage}
                        bordered={false}
                      >
                        <Select.Option value="en">
                          <Icons type="en" scale={1.5} /> English
                        </Select.Option>
                        <Select.Option value="cn">
                          <Icons type="cn" scale={1.5} /> 中文
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div style={{ textAlign: 'left', marginTop: 10, fontSize: 13 }}>
                    {/* eslint-disable-next-line */}
                    {t('generic.havingTrouble')} <a onClick={onHelp}>{t('operations.clickHere')}</a>
                  </div>
                </div>
              }
            >
              <div style={{ textAlign: 'center', color: 'red' }}>
                {attempts !== null ? `You have ${attempts} attempts left.` : ``}
              </div>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<LoginOutlined />}
                disabled={status === 2 || attempts < 0}
              >
                {status === 2 || attempts < 0 ? t('operations.locked') : t('operations.logIn')}
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
                <h3>{t('messages.cuztomizeLanding')}</h3>
                <p>{t('descriptions.cuztomizeLanding')}</p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/calender.svg" alt="calender" />
              <div>
                <h3>{t('messages.scheduling')}</h3>
                <p>{t('descriptions.scheduling')}</p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/cargo_ship_one.svg" alt="cargo_ship" />
              <div>
                <h3>{t('messages.inventoryManagement')}</h3>
                <p>{t('descriptions.inventoryManagement')}</p>
              </div>
            </SliderContainer>
          </>
          <>
            <SliderContainer>
              <img src="/svg/seo.svg" alt="seo" />
              <div>
                <h3>{t('messages.detailedReporting')}</h3>
                <p>{t('descriptions.detailedReporting')}</p>
              </div>
            </SliderContainer>
          </>
        </Carousel>
      </GraphicContainer>
    </LoginContainer>
  );
};

const mapActionsToProps = (dispatch) => ({
  handleLogin: (code, password) => dispatch(actions.login(code, password)),
});

const mapStateToProps = (state) => {
  return { auth: state.auth.authenticated };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
