import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';
import { useTime } from '../../../../hooks';

const Dates = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();
  const time = useTime();
  // Please Use Server Time

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_caldate: '' ? null : moment(value.shls_caldate, SETTINGS.DATE_TIME_FORMAT),
        shls_exp2: '' ? null : moment(value.shls_caldate, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        shls_caldate: moment(),
        shls_exp2: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Col span={12}>
        <Form.Item name="shls_caldate" label={t('fields.scheduleDate')}>
          <DatePicker showTime format={FORMAT} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="shls_exp2" label={t('fields.expiryDate')}>
          <DatePicker showTime format={FORMAT} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </>
  );
};

export default Dates;
