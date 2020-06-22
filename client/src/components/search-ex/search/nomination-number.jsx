import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const NominationNumber = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="mv_number"
        label={t('fields.nominationNumber')}
      >
        <Input />
      </Form.Item>
  );
};

export default NominationNumber;
