import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const MovementTime = ({ form, value, type, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();
  const IS_DISABLED = disabled || !type;

  // Please Use Server Time

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_dtim_start: '' ? null : moment(value.mlitm_dtim_start, SETTINGS.DATE_TIME_FORMAT)
      });
    } else {
      setFieldsValue({
        mlitm_dtim_start: moment()
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mlitm_dtim_start" label={t('fields.movementDateAndTime')}>
      <DatePicker showTime format={FORMAT} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default MovementTime;
