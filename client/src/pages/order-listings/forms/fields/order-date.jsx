import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const OrderDate= ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ord_time: '' ? null : moment(value.order_ord_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        order_ord_time: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_ord_time" label={t('fields.orderOrdTime')}>
      <DatePicker showTime format={FORMAT} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default OrderDate;
