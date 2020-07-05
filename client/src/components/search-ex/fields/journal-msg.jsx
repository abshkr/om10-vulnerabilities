import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const JournalSearch = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="target_str"
        label={t('fields.message')}
      >
        <Input.TextArea rows='2'/>
      </Form.Item>
  );
};

export default JournalSearch;
