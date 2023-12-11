import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'dayjs';
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
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.wriEffectiveDate')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const expiredAfter = form.getFieldValue('wri_expiry_date');
    if (!(!input || !expiredAfter)) {
      if (input.isAfter(expiredAfter)) {
        return Promise.reject(`${t('validate.effectiveDateLaterThanExpiryDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['wri_effective_date', 'wri_expiry_date']);
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    console.log('zzzzzzzzzzz...........', value, serverCurrent);
    if (value) {
      setFieldsValue({
        wri_effective_date:
          value.wri_effective_date === ''
            ? null
            : moment(value.wri_effective_date, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        wri_effective_date: serverCurrent, // moment(),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="wri_effective_date"
      label={t('fields.wriEffectiveDate')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
    </Form.Item>
  );
};

export default EffectiveFrom;
