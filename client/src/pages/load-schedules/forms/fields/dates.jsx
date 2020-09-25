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

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = !value ? false : value?.status !== 'F';
  // const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';
  const FORMAT = getDateTimeFormat();
  const NEED_EXPIRY = expiry !== null && expiry !== undefined && expiry !== '' && _.toNumber(expiry) > 0;

  const validateScheduleDate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.scheduleDate')}`);
      }
    }

    // compare scheduleDate with expiryDate
    const expiredAfter = form.getFieldValue('shls_exp2');
    if (!(!input || !expiredAfter)) {
      if (input.isAfter(expiredAfter)) {
        return Promise.reject(`${t('validate.tripScheduleDateLaterThanExpiryDate')}`);
      }
    }

    return Promise.resolve();
  };

  const validateExpiryDate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.expiryDate')}`);
      }
    }

    // compare scheduleDate with expiryDate
    const effectiveFrom = form.getFieldValue('shls_caldate');
    if (!(!input || !effectiveFrom)) {
      if (effectiveFrom.isAfter(input)) {
        return Promise.reject(`${t('validate.tripExpiryDateEarlierThanScheduleDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['shls_caldate', 'shls_exp2']);
  };

  useEffect(() => {
    if (value) {
      console.log('...................trip exp date', value);
      // const baseDate = moment();
      const baseDate = value.shls_caldate === '' ? moment() : moment(value.shls_caldate, SETTINGS.DATE_TIME_FORMAT);
      setFieldsValue({
        shls_caldate: value.shls_caldate === '' ? null : moment(value.shls_caldate, SETTINGS.DATE_TIME_FORMAT),
        shls_exp2: value.shls_exp2 === '' 
          ? (!NEED_EXPIRY ? null : baseDate.add(_.toNumber(expiry), 'hours')) 
          : moment(value.shls_exp2, SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Col span={6}>
        <Form.Item 
          name="shls_caldate" 
          label={t('fields.scheduleDate')}
          rules={[{ required: true, validator: validateScheduleDate }]}
        >
          <DatePicker disabled={IS_DISABLED} showTime format={FORMAT} style={{ width: '100%' }} onChange={onChange} />
        </Form.Item>
      </Col>

      <Col span={6}>
        {NEED_EXPIRY && (
          <Form.Item 
            name="shls_exp2" 
            label={t('fields.expiryDate')}
            rules={[{ required: false, validator: validateExpiryDate }]}
          >
            <DatePicker disabled={IS_DISABLED} showTime format={FORMAT} style={{ width: '100%' }} onChange={onChange} />
          </Form.Item>
        )}
      </Col>
    </>
  );
};

export default Dates;
