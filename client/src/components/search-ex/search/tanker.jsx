import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

import { LOAD_SCHEDULES } from 'api';

const TankerSearch = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.STATUS);

  return (
    <Form.Item
      name="tnkr_code"
      label={t('fields.tanker')}
    >
      <Input></Input>
    </Form.Item>
  );
};

export default TankerSearch;
