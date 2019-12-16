import React, { useState } from 'react';
import { Input, Button, Modal, notification, Form } from 'antd';
import { personnel } from '../../../../api';
import axios from 'axios';
import _ from 'lodash';

const PasswordReset = ({ value, t }) => {
  const [password, setPassword] = useState(_.times(7, () => _.random(35).toString(36)).join(''));

  const randomize = () => {
    setPassword(_.times(7, () => _.random(35).toString(36)).join(''));
  };

  const handleSubmit = () => {
    if (!!value) {
      const user = value.per_code;
      const hashed = {
        lang: 'EN',
        user,
        psw: password,
      };

      axios.all([personnel.updatePersonnelPassword(hashed.user, hashed.psw)]).then(
        axios.spread(response => {
          Modal.destroyAll();
          if (response.data.result === 0) {
            notification.success({
              message: t('messages.updateSuccess'),
              description: response.data.message,
            });
          } else {
            notification.error({
              message: t('messages.updateFailed'),
              description: response.data.message,
            });
          }
        }),
      );
    }
  };

  const copy = () => {
    let textField = document.createElement('textarea');
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <div>
      <Form.Item label={t('fields.user')}>
        <Input value={!!value && value.per_code} disabled />
      </Form.Item>

      <Form.Item label={t('fields.password')}>
        <Input value={password} onChange={event => setPassword(event.target.value)} />
      </Form.Item>

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-around' }}>
        <Button
          icon="wallet"
          shape="round"
          type="default"
          onClick={randomize}
          style={{ marginRight: 5 }}
        >
          {t('operations.randomize')}
        </Button>
        <Button icon="copy" shape="round" type="dashed" onClick={copy} style={{ marginRight: 5 }}>
          {t('operations.copyToClipboard')}
        </Button>
        <Button icon="check" shape="round" type="primary" onClick={handleSubmit}>
          {t('operations.changePassword')}
        </Button>
      </div>
    </div>
  );
};

export default PasswordReset;
