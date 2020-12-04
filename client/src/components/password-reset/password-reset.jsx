import React, { useState } from 'react';

import { WalletOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Input, Button, Modal, notification, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api, { PERSONNEL } from '../../api';
import generatePassword from 'utils/generate-password';

const PasswordReset = ({ value, setHide }) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState(generatePassword());

  const randomize = () => {
    const password = generatePassword();

    setPassword(password);
  };

  const handleSubmit = () => {
    if (value) {
      const user = value.per_code;

      api
        .post(PERSONNEL.RESET_PASSWORD,
          {
            per_code: user,
            password: password
          })
        .then((response) => {
          Modal.destroyAll();
          notification.success({
            message: t('messages.updateSuccess'),
            description: response.data.message,
          });
          setHide();
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    }
  };

  const copy = () => {
    let textField = document.createElement('textarea');
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    notification.success({
      message: t('messages.copyQuantitySuccess'),
    });
  };

  return (
    <>
      <Form.Item label={t('fields.user')}>
        <Input value={value?.per_code} disabled />
      </Form.Item>

      <Form.Item label={t('fields.password')}>
        <Input readOnly value={password} onChange={(event) => setPassword(event.target.value)} />
      </Form.Item>

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-around' }}>
        <Button icon={<WalletOutlined />} type="default" onClick={randomize} style={{ marginRight: 5 }}>
          {t('operations.randomize')}
        </Button>
        <Button icon={<CopyOutlined />} type="dashed" onClick={copy} style={{ marginRight: 5 }}>
          {t('operations.copyToClipboard')}
        </Button>
        <Button icon={<CheckOutlined />} type="primary" onClick={handleSubmit}>
          {t('operations.changePassword')}
        </Button>
      </div>
    </>
  );
};

export default PasswordReset;
