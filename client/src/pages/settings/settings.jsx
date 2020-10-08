import React, { useState, useEffect } from 'react';

import { LockOutlined, IdcardOutlined, HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Button, Form, Input, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Page } from '../../components';
import api, { PERSONNEL } from '../../api';
import auth from '../../auth';
import useSWR from 'swr';
import { useConfig, useAuth } from '../../hooks';
import { pwdComplexity, complexityDesc } from 'utils'

const Settings = ({ user }) => {
  const config = useConfig();
  const access = useAuth('MENU_HOME');
  const { t } = useTranslation();
  const { data: payload } = useSWR(PERSONNEL.READ_DEPARTMENT);

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [password, setPassword] = useState(null);

  const { setFieldsValue } = profileForm;

  const setPasswordFields = passwordForm.setFieldsValue;

  const page = t('pageMenu.settings');

  const validateOldPassword = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.currentPassword')}`);
    }

    return Promise.resolve();
  };

  const validatePassword = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.password')}`);
    }

    if (input && input.length < _.toNumber(config.passwordLenMin)) {
      return Promise.reject(
        `${t('placeholder.minCharacters')}: ${config.passwordLenMin} ─ ${t('descriptions.minCharacters')}`
      );
    }

    if (input && input.length > _.toNumber(config.passwordLenMax)) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config.passwordLenMax} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    if (!pwdComplexity(input, input, config.passwordComplexity)) {
      return Promise.reject(
        `${t('descriptions.pwdComplexity') + ": " + complexityDesc(config.passwordComplexity, t)}`
      );
    }

    return Promise.resolve();
  };

  const validatePasswordConfirm = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.confirmPassword')}`);
    }

    if (input && input.length < _.toNumber(config.passwordLenMin)) {
      return Promise.reject(
        `${t('placeholder.minCharacters')}: ${config.passwordLenMin} ─ ${t('descriptions.minCharacters')}`
      );
    }

    if (input && input.length > _.toNumber(config.passwordLenMax)) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config.passwordLenMax} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    if (input && input !== password) {
      return Promise.reject(t('descriptions.passwordDoesntMatch'));
    }

    return Promise.resolve();
  };

  const onProfileChange = async () => {
    const values = await profileForm.validateFields();

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PERSONNEL.UPDATE_DEPARTMENT, values)
          .then((response) => {
            notification.success({
              message: t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onPasswordChange = (values) => {
    if (!pwdComplexity(values.password, values.confirm_password, config.passwordComplexity)) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.pwdComplexity') + ": " + complexityDesc(config.passwordComplexity, t),
      });
      return;
    }
    
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PERSONNEL.UPDATE_PASSWORD, values)
          .then((response) => {
            notification.success({
              message: t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (user?.per_code) {
      setFieldsValue({
        per_code: user?.per_code,
      });

      setPasswordFields({
        per_code: user?.per_code,
      });
    }

    if (payload) {
      setFieldsValue({
        per_department: payload?.records[0].per_department,
      });
    }
  }, [setFieldsValue, setPasswordFields, user, payload]);

  return (
    <Page page={page} transparent access={access}>
      <Form
        layout="horizontal"
        form={profileForm}
        onFinish={onProfileChange}
        scrollToFirstError
        style={{ marginBottom: 10 }}
      >
        <Card
          title={t('descriptions.changeUseProfile')}
          size="small"
          hoverable
          style={{ borderColor: '1px solid #0054a43b' }}
          bordered
          actions={[
            <Form.Item>
              <Button style={{ float: 'right', marginRight: 15 }} type="primary" htmlType="submit">
                {t('operations.update')}
              </Button>
            </Form.Item>,
          ]}
        >
          <Form.Item name="per_code">
            <Input
              prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.code')}
              autoComplete="off"
              disabled
            />
          </Form.Item>

          <Form.Item name="per_department">
            <Input
              prefix={<HomeOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.department')}
              autoComplete="off"
            />
          </Form.Item>
        </Card>
      </Form>

      {user && user?.per_code !== '9999' && (
        <Form layout="horizontal" form={passwordForm} onFinish={onPasswordChange} scrollToFirstError>
          <Card
            title={t('descriptions.changeYourPassword')}
            size="small"
            hoverable
            style={{ borderColor: '1px solid #0054a43b' }}
            bordered
            actions={[
              <Form.Item>
                <Button style={{ float: 'right', marginRight: 15 }} type="primary" htmlType="submit">
                  {t('operations.update')}
                </Button>
              </Form.Item>,
            ]}
          >
            <Form.Item name="per_code" noStyle />

            <Form.Item name="old_password" rules={[{ required: true, validator: validateOldPassword }]}>
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={t('fields.currentPassword')}
                type="password"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, validator: validatePassword }]}>
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={t('fields.newPassword')}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  validator: validatePasswordConfirm,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={t('fields.confirmPassword')}
                autoComplete="off"
              />
            </Form.Item>
          </Card>
        </Form>
      )}
    </Page>
  );
};

export default auth(Settings);
