import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const ExpiryDate= ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_exp_time: '' ? null : moment(value.order_exp_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        order_exp_time: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_exp_time" label={t('fields.orderExpTime')}>
      <DatePicker showTime format={FORMAT} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default ExpiryDate;
