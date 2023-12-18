import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

import { useConfig } from '../../../../hooks';
import { SETTINGS } from '../../../../constants';
import moment from 'dayjs';

const Enter_Time = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;
  const config = useConfig();
  const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        perl_enter_time: serverCurrent._i,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="perl_enter_time" label={t('fields.enterTime')} rules={[{ required: false }]}>
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Enter_Time;
