import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { useConfig } from '../../../../hooks';
import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const OrderDate = ({ form, value, pageState }) => {
  const config = useConfig();
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderOrdTime')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        order_ord_time:
          value.order_ord_time === '' ? null : moment(value.order_ord_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        order_ord_time: serverCurrent, // moment(),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="order_ord_time"
      label={t('fields.orderOrdTime')}
      rules={[{ required: true, validator: validate }]}
    >
      <DatePicker
        showTime
        format={FORMAT}
        style={{ width: '100%' }}
        disabled={pageState === 'create' ? false : true}
      />
    </Form.Item>
  );
};

export default OrderDate;
