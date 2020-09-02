import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';
import useSWR from 'swr';
import { PERSONNEL } from 'api';

const Status = ({ form, value }) => {
  const [mode, setMode] = useState(value?.user_status_flag);
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PERSONNEL.USER_STATUS);

  const { setFieldsValue } = form;

  /* const states = [
    {
      user_status_flag: '0',
      urer_status_name: t('operations.userInactive'),
      enabled: false,
      visible: true,
    },
    {
      user_status_flag: '1',
      urer_status_name: t('operations.userActive'),
      enabled: false,
      visible: true,
    },
    {
      user_status_flag: '2',
      urer_status_name: t('operations.userLocked'),
      enabled: true,
      visible: true,
    },
    {
      user_status_flag: '3',
      urer_status_name: t('operations.userDeleted'),
      enabled: false,
      visible: false,
    },
  ]; */

  useEffect(() => {
    if (value) {
      setFieldsValue({
        user_status_flag: value.user_status_flag
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="user_status_flag" label={t('fields.status')}>
      <Radio.Group
        // buttonStyle="solid"
        style={{ marginBottom: 10, display: 'flex', flexDirection: 'column'  }}
        onChange={(event) => setMode(event.target.value)}
      >
        {options?.records.filter((o)=>(o.user_status_flag!=='3')).map((item, index) => (
          <Radio key={index} value={item.user_status_flag} disabled={item.user_status_flag !== '2'}>
            {item.urer_status_name}
          </Radio>
        ))}
        {/* options?.records.filter((o)=>(o.user_status_flag!=='3')).map((item, index) => (
          <Radio.Button key={index} value={item.user_status_flag} disabled={item.user_status_flag !== '2'}>
            {item.urer_status_name}
          </Radio.Button>
        )) */}
      </Radio.Group>
    </Form.Item>
  );
};

export default Status;
