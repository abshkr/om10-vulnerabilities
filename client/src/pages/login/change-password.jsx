import React, { useState } from 'react';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { pwdComplexity, complexityDesc } from 'utils'
import { useConfig } from '../../hooks';
import _ from 'lodash';

const ChangePassword = ({language, user_code, old, dispatch, onReturn}) => {
  const { t } = useTranslation();
  const config = useConfig();
  const [form] = Form.useForm();
  const [password, setPassword] = useState(null);

  const onFinish = (values) => {
    if (values.new !== values.confirm) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.passwordDoesntMatch'),
      });
      return;
    }

    if (!pwdComplexity(values.new, values.confirm, config.passwordComplexity)) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.pwdComplexity') + ": " + complexityDesc(config.passwordComplexity, t),
      });
      return;
    }

    Modal.destroyAll();
    onReturn({
      language: language,
      user_code: user_code,
      ret: "ok",
      new_password: values.new,
      old_password: old,
      dispatch: dispatch,
    });
  };

  const onComplete = () => {
    Modal.destroyAll();
    onReturn({
      ret_code: "cancel",
      new_password: null,
    });
  }

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

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}} >
      <Form.Item name="new" 
        label={t("fields.newPassword")} 
        rules={[{ required: true, validator: validatePassword }]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} autoFocus={true} ></Input.Password>
      </Form.Item>  

      <Form.Item 
        name="confirm" 
        label={t("fields.confirmPassword")} 
        rules={[{ required: true, validator: validatePasswordConfirm }]}
      >
        <Input.Password></Input.Password>
      </Form.Item>  

      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => onComplete()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<CheckOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default ChangePassword;