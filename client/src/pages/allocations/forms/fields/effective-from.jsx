import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';
import { useConfig } from '../../../../hooks';

const EffectiveFrom = ({ form, value }) => {
  const config = useConfig();
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.allocStartDate')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const expiredAfter = form.getFieldValue('alloc_end_date');
    if (!(!input || !expiredAfter)) {
      if (input.isAfter(expiredAfter)) {
        return Promise.reject(`${t('validate.startDateLaterThanEndDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['alloc_start_date', 'alloc_end_date']);
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        alloc_start_date:
          value.alloc_start_date === '' ? null : moment(value.alloc_start_date, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        alloc_start_date: serverCurrent, // moment(),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="alloc_start_date"
      label={t('fields.allocStartDate')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
    </Form.Item>
  );
};

export default EffectiveFrom;
