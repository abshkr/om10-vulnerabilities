import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const NominationKey = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="mv_key"
        label={t('fields.nominationKey')}
      >
        <Input />
      </Form.Item>
  );
};

export default NominationKey;
