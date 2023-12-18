import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'dayjs';

import { useConfig } from '../../../../hooks';
import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const MovementTime = ({ form, value, type, disabled, onChange }) => {
  const config = useConfig();
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();
  const IS_DISABLED = disabled || !type;

  // Please Use Server Time

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        mlitm_dtim_start:
          value.mlitm_dtim_start === ''
            ? serverCurrent
            : moment(value.mlitm_dtim_start, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        mlitm_dtim_start: serverCurrent, // moment(),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item name="mlitm_dtim_start" label={t('fields.movementDateAndTime')}>
      <DatePicker
        showTime
        format={FORMAT}
        disabled={IS_DISABLED}
        style={{ width: '100%' }}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default MovementTime;
