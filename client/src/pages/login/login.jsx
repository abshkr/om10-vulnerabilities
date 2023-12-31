import React, { useEffect, useState } from 'react';
import Icon, {
  SmileOutlined,
  FrownOutlined,
  IdcardOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Form, Input, Button, notification, Divider, Carousel, Modal, Select, Row, Col } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _, { join } from 'lodash';
import api, { COMMON, AUTH } from 'api';
import hash from 'utils/hash';
import useMode from 'hooks/use-mode';
import useAuthConfig from 'hooks/use-auth-config';
import { AUTHORIZED, UNAUTHORIZED } from 'actions/types';
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
  SliderContainer,
  Version,
  ButtonContainer,
} from './style';

import * as actions from '../../actions/auth';

import { ROUTES, SETTINGS } from '../../constants';
import { Icons } from '../../components/';
import ChangePassword from './change-password';
import FaAuth from './fa-auth';

const LoginOutlined = (props) => (
  <Icon className="key-icon" style={{ transform: 'scale(1.8)' }} component={LoginIcon} {...props} />
);

const Login = ({ handleLogin, auth }) => {
  const { isFSC } = useMode();
  const config = useAuthConfig();

  const [form] = Form.useForm();
  const { i18n, t } = useTranslation();

  const [isLoading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(null);
  const [status, setStatus] = useState(1);
  const [authMode, setAuthMode] = useState('DEFAULT');

  const navigate = useNavigate();

  const handleLanguage = (value) => {
    i18n.changeLanguage(value);
    sessionStorage.setItem('language', value);
    sessionStorage.setItem('user', document.getElementById('code')?.value);
    sessionStorage.setItem('password', document.getElementById('password')?.value);
  };

  const handleAuthMode = (value) => {
    setAuthMode(value);
  };

  const getErrorMessage = (code) => {
    let desc = '';
    if (code === '30000') {
      desc = t('descriptions.loginFailureDatabase');
    }
    if (code === '30001') {
      desc = t('descriptions.loginFailurePassword');
    }
    if (code === '30003') {
      desc = t('descriptions.loginFailureUsercode');
    }
    // new prompts for LDAP login
    if (code === '-1') {
      desc = t('descriptions.ldapLoginFailureServer');
    }
    if (code === '-2') {
      desc = t('descriptions.ldapLoginFailureEmail');
    }
    if (code === '-3') {
      desc = t('descriptions.ldapLoginFailureSearchUser');
    }
    if (code === '-4') {
      desc = t('descriptions.ldapLoginFailureRetrieveUser');
    }
    if (code === '-5') {
      desc = t('descriptions.ldapLoginFailureMatchUser');
    }
    if (code === '-9') {
      desc = t('descriptions.ldapLoginFailurePkgFunc');
    }

    return desc;
  };

  const onChangePassword = (ret) => {
    if (ret.ret_code === 'cancel') {
      navigate(ROUTES.LOG_OUT);
    } else {
      const { dispatch } = ret;
      const payload = hash(ret.language, ret.user_code, ret.new_password);
      const payload2 = hash(ret.language, ret.user_code, ret.old_password);
      api
        .post(AUTH.ACTIVATE, {
          per_code: ret.user_code,
          old_password: payload2.psw,
          password: payload.psw,
          refresh_token: false,
        })
        .then(() => {
          const token = sessionStorage.getItem('token_as_new');
          sessionStorage.setItem('token', token);
          dispatch({ type: AUTHORIZED, payload: token });
          navigate(ROUTES.HOME);

          notification.success({
            placement: 'bottomRight',
            message: t('messages.loginSuccess'),
            description: `${t('descriptions.loginSuccess')} ${ret.user_code}`,
            icon: <SmileOutlined style={{ color: '#0054A4' }} />,
          });
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            console.log(error.message);
            notification.error({
              message: error.message,
              description: t('messages.loginFailed'),
            });
          });
          navigate(ROUTES.LOG_OUT);
        });
    }
  };

  const changePwd = (language, user_code, password, dispatch) => {
    Modal.info({
      className: 'form-container',
      title: t('operations.changePassword'),
      centered: true,
      width: '25vw',
      icon: <SafetyCertificateOutlined />,
      keyboard: false,
      content: (
        // <SWRConfig
        //     value={{
        //     refreshInterval: 0,
        //     fetcher,
        //     }}
        // >
        <ChangePassword
          language={language}
          user_code={user_code}
          old={password}
          dispatch={dispatch}
          onReturn={onChangePassword}
        />
        // </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });

    return null;
  };

  const onFaAuth = (ret) => {
    if (ret.ret_code === 'cancel') {
      navigate(ROUTES.LOG_OUT);
    } else {
      const { dispatch } = ret;
      api
        .post(AUTH.FA_AUTH, {
          per_code: ret.user_code,
          two_factor_code: ret.two_factor_code,
          refresh_token: false,
        })
        .then(() => {
          const token = sessionStorage.getItem('token_as_fa');
          sessionStorage.setItem('token', token);
          dispatch({ type: AUTHORIZED, payload: token });
          navigate(ROUTES.HOME);

          notification.success({
            placement: 'bottomRight',
            message: t('messages.loginSuccess'),
            description: `${t('descriptions.loginSuccess')} ${ret.user_code}`,
            icon: <SmileOutlined style={{ color: '#0054A4' }} />,
          });
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            console.log(error.message);
            notification.error({
              message: error.message,
              description: t('messages.loginFailed'),
            });
          });
          navigate(ROUTES.LOG_OUT);
        });
    }
  };

  const faAuth = (language, user_code, password, dispatch) => {
    Modal.info({
      className: 'form-container',
      title: t('operations.faCode'),
      centered: true,
      width: '25vw',
      icon: <SafetyCertificateOutlined />,
      keyboard: false,
      content: (
        // <SWRConfig
        //     value={{
        //     refreshInterval: 0,
        //     fetcher,
        //     }}
        // >
        <FaAuth
          language={language}
          user_code={user_code}
          old={password}
          dispatch={dispatch}
          onReturn={onFaAuth}
        />
        // </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });

    return null;
  };

  const handleSubmit = (values) => {
    setLoading(true);
    sessionStorage.setItem('user', values?.code);
    sessionStorage.setItem('password', values?.password);
    sessionStorage.setItem('language', values?.language);
    sessionStorage.setItem('authmode', values?.auth_type || authMode);

    handleLogin(values, (response, dispatch) => {
      if (response?.data?.token) {
        if (response.data.killsession) {
          Modal.confirm({
            title: t('prompts.killSessions'),
            okText: t('operations.yes'),
            okType: 'primary',
            icon: <QuestionCircleOutlined />,
            cancelText: t('operations.no'),
            centered: true,
            onOk: async () => {
              sessionStorage.setItem('token', response.data.token);
              dispatch({ type: AUTHORIZED, payload: response.data.token });

              await api
                .post(COMMON.KILL_SESSIONS, {
                  per_code: values?.code,
                  sess_id: response?.data.sess_id,
                })
                .then(() => {
                  navigate(ROUTES.HOME);

                  notification.success({
                    placement: 'bottomRight',
                    message: t('messages.loginSuccess'),
                    description: `${t('descriptions.loginSuccess')} ${values.code}`,
                    icon: <SmileOutlined style={{ color: '#0054A4' }} />,
                  });
                })
                .catch((errors) => {
                  _.forEach(errors.response.data.errors, (error) => {
                    console.log(error.message);
                  });
                });
            },
            onCancel() {
              sessionStorage.setItem('token', response.data.token); //So log out can delete session from db
              navigate(ROUTES.LOG_OUT);
            },
          });
        } else if (response.data.user_status_flag === '0') {
          sessionStorage.setItem('token_as_new', response.data.token);
          changePwd(values.language, response.data.userid, values.password, dispatch);
        } else if (response.data.twofa_result === 'AUTH 2FA') {
          sessionStorage.setItem('token_as_fa', response.data.token);
          faAuth(values.language, response.data.userid, values.password, dispatch);
        } else {
          navigate(ROUTES.HOME);

          notification.success({
            placement: 'bottomRight',
            message: t('messages.loginSuccess'),
            description: `${t('descriptions.loginSuccess')} ${values.code}`,
            icon: <SmileOutlined style={{ color: '#0054A4' }} />,
          });
        }
      } else {
        setLoading(false);
        const attempt =
          _.toNumber(response?.data.attempt_left) < 0 ? 0 : _.toNumber(response?.data.attempt_left);

        setStatus(_.toNumber(response?.data.user_status_flag));

        setAttempts(attempt);
        const desc = getErrorMessage(response.data.msg_code);
        notification.error({
          placement: 'bottomRight',
          message: t('messages.loginFailed'),
          description: desc != '' ? desc : _.capitalize(response.data.msg_desc),
          icon: <FrownOutlined style={{ color: '#ec6e68' }} />,
        });
      }

      return true;
    });
  };

  const onHelp = () => {
    Modal.info({
      title: t('generic.helpHeader'),
      content: (
        <div>
          <p>
            <strong>{t('generic.international')}: </strong> +60 3 7661 6218
          </p>
          <p>
            <strong>{t('generic.tollFreeAU')}: </strong> 1800 333 319
          </p>
          <p>
            <strong>{t('generic.tollFreeNZ')}: </strong> 0800 475 032
          </p>

          <p>
            <strong>{t('generic.tollFreeMYS')}: </strong> 1300 133 356
          </p>

          <p>
            <strong>{t('generic.tollFreeINDO')}: </strong> 0803 321 8405
          </p>

          <p>
            <strong>{t('generic.tollFreeTHAI')}: </strong> 1800 012 325
          </p>

          <p>
            <strong>{t('generic.tollFreeUK')}: </strong> 0800 041 8138
          </p>

          <p>
            <strong>{t('generic.directDialPHIL')}: </strong> +63 2395 3486
          </p>

          <p>
            <strong>{t('generic.directDialCN')}: </strong> +86 21 8024 6089
          </p>

          <p>
            <strong>{t('generic.email')}: </strong> support@diamondkey.com
          </p>

          <Divider />
          <h3>{t('generic.help')}</h3>
          <a href="/manual.pdf" target="_blank">
            {t('operations.clickHere')}
          </a>
          <Divider />
          <h3>{t('generic.about')}</h3>
          <a href="/eula.pdf" target="_blank">
            {t('operations.clickHere')}
          </a>
        </div>
      ),
    });
  };

  useEffect(() => {
    if (auth) {
      navigate(ROUTES.HOME);
    }
  }, [auth, navigate]);

  useEffect(() => {
    form.setFieldsValue({
      code: sessionStorage.getItem('user'),
      password: sessionStorage.getItem('password'),
    });
  }, []);

  return (
    <LoginContainer>
      <Helmet>
        <title>{t('generic.title')} ─ OMEGA 5000</title>
      </Helmet>

      <Version>
        {t('generic.version')}: {SETTINGS.VERSION} {isFSC ? ' - FSC' : ''}
      </Version>

      <FormContainer isFSC={isFSC}>
        <FormBlock>
          <LoginTitle>
            <img src={isFSC ? '/images/om_fsc.png' : '/images/omega.png'} alt="OMEGA 5000" />
          </LoginTitle>

          <LoginSubtitle>{t('generic.login')}</LoginSubtitle>

          <Form form={form} onFinish={handleSubmit} initialValues={{ language: i18n.language || 'en' }}>
            {(config?.siteEnabledLDAP || config?.siteEnabledSAML) && (
              <Form.Item name="auth_type">
                <Select onChange={handleAuthMode} defaultValue={'DEFAULT'}>
                  <Select.Option value="DEFAULT">{t('fields.authModeDefault')}</Select.Option>
                  {config?.siteEnabledLDAP && (
                    <Select.Option value="LDAP" disabled={!config?.siteEnabledLDAP}>
                      {t('fields.authModeLDAP')}
                    </Select.Option>
                  )}
                  {config?.siteEnabledSAML && (
                    <Select.Option value="SAML" disabled={!config?.siteEnabledSAML}>
                      {t('fields.authModeSAML')}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>
            )}

            <Form.Item name="code" rules={[{ required: true, message: t('messages.inputOmegaUser') }]}>
              <Input
                style={{ marginBottom: 5 }}
                prefix={<IdcardOutlined style={{ color: '#0054a4' }} />}
                placeholder={t('fields.omegaUser')}
              />
            </Form.Item>

            <Form.Item
              name="password"
              // value={curUser}
              rules={[{ required: true, message: t('messages.inputOmegaPassword') }]}
            >
              <Input
                id="login"
                prefix={<LockOutlined style={{ color: '#0054a4' }} />}
                type="password"
                placeholder={t('fields.password')}
              />
            </Form.Item>

            <div style={{ textAlign: 'center', color: 'red', marginBottom: 10 }}>
              {attempts !== null && !isNaN(attempts) && status !== -1
                ? `${t('descriptions.availableAttempts')}${attempts}`
                : ``}
            </div>

            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Form.Item name="language" style={{ marginRight: 40 }}>
                  <Select onChange={handleLanguage}>
                    <Select.Option value="en">
                      <Icons type="en" scale={1.5} /> English
                    </Select.Option>
                    <Select.Option value="cn">
                      <Icons type="cn" scale={1.5} /> 中文
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item style={{ marginLeft: 40 }}>
                  <ButtonContainer>
                    <Button
                      style={{ marginTop: 0 }}
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      icon={<LoginOutlined />}
                      disabled={status === 2 || attempts < 0}
                    >
                      {status === 2 || attempts < 0 ? t('operations.locked') : t('operations.logIn')}
                    </Button>
                  </ButtonContainer>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ textAlign: 'center', fontSize: 13, width: '100%', fontWeight: 500 }}>
              {/* eslint-disable-next-line */}
              {t('generic.havingTrouble')} <a onClick={onHelp}>{t('operations.clickHere')}</a>
            </div>
          </Form>
        </FormBlock>

        <LoginFooter>
          <LoginFooterLogo>
            <img src="/images/dki_big.png" alt={t('generic.dkiName')} />
          </LoginFooterLogo>
        </LoginFooter>
      </FormContainer>

      <GraphicContainer isFSC={isFSC}>
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
  handleLogin: (values, callback) => dispatch(actions.login(values, callback)),
});

const mapStateToProps = (state) => {
  return { auth: state.auth.authenticated };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
