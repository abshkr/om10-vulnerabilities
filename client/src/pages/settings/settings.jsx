import React, { useState } from 'react';

import { LockOutlined, IdcardOutlined, HomeOutlined } from '@ant-design/icons';
import { Card, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Page } from '../../components';
import { PERSONNEL } from '../../api';
import auth from '../../auth';

const Settings = () => {
  const [password, setPassword] = useState(null);

  const { t } = useTranslation();

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

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

    if (input && input.length < 5) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 5 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const validatePasswordConfirm = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.confirmPassword')}`);
    }

    if (input && input.length < 5) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 5 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input && input !== password) {
      return Promise.reject(t('descriptions.passwordDoesntMatch'));
    }

    return Promise.resolve();
  };

  const onProfileChange = (values) => {
    console.log(values);
  };

  const onPasswordChange = (values) => {
    axios.post(PERSONNEL.UPDATE_PASSWORD, {});
  };

  return (
    <Page page={page} auth={auth} minimal>
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
            />
          </Form.Item>

          <Form.Item name="department">
            <Input
              prefix={<HomeOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.department')}
              autoComplete="off"
            />
          </Form.Item>
        </Card>
      </Form>

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
          <Form.Item name="old_password" rules={[{ required: true, validator: validateOldPassword }]}>
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.currentPassword')}
              type="password"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, validator: validatePassword }]}>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.newPassword')}
              type="password"
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
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={t('fields.confirmPassword')}
              type="password"
              autoComplete="off"
            />
          </Form.Item>
        </Card>
      </Form>
    </Page>
  );
};

export default auth(Settings);
