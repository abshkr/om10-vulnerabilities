import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const Dates = ({ form, value, expiry }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';
  const FORMAT = getDateTimeFormat();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_caldate: '' ? null : moment(value.shls_caldate, SETTINGS.DATE_TIME_FORMAT),
        shls_exp2: '' ? null : moment(value.shls_exp2, SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Col span={6}>
        <Form.Item name="shls_caldate" label={t('fields.scheduleDate')}>
          <DatePicker disabled={IS_DISABLED} showTime format={FORMAT} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={6}>
        {(expiry !== null && expiry !== undefined && expiry !== '' && _.toNumber(expiry) > 0) && (
          <Form.Item name="shls_exp2" label={t('fields.expiryDate')}>
            <DatePicker disabled={IS_DISABLED} showTime format={FORMAT} style={{ width: '100%' }} />
          </Form.Item>
        )}
      </Col>
    </>
  );
};

export default Dates;
