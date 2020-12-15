import React, { useState } from 'react';

import { WalletOutlined, SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { Input, Button, Modal, notification, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api, { PERSONNEL_ON_SITE } from 'api';
import { Area } from './fields';

const ChangeArea = ({ value, setHide }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [area, setArea] = useState(value?.perl_ara);

  const handleSubmit = () => {
    if (value) {
      api
        .post(PERSONNEL_ON_SITE.UPDATE, {
          perl_psn: value?.per_code,
          perl_ara: area
        })
        .then((response) => {
          Modal.destroyAll();
          notification.success({
            message: t('messages.updateSuccess'),
            description: response.data.message,
          });
          value.perl_ara = area;
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

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label={t('fields.user')}>
        <Input value={value?.per_code} disabled />
      </Form.Item>

      <Area form={form} value={value} onAreaChange={setArea} />

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'end' }}>
        <Button icon={<SaveOutlined />} type="primary" style={{ marginRight: 5 }} onClick={handleSubmit}>
          {t('operations.save')}
        </Button>
        <Button onClick={setHide} style={{ marginRight: 5 }}>
          {t('operations.cancel')}
        </Button>
      </div>
    </Form>
  );
};

export default ChangeArea;
