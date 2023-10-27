import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';
import { useConfig } from '../../../../hooks';

const ExpiredAfter = ({ form, value }) => {
  const config = useConfig();
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.wriExpiryDate')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const effectiveFrom = form.getFieldValue('wri_effective_date');
    if (!(!input || !effectiveFrom)) {
      if (effectiveFrom.isAfter(input)) {
        return Promise.reject(`${t('validate.expiryDateEarlierThanEffectiveDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['wri_effective_date', 'wri_expiry_date']);
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        wri_expiry_date:
          value.wri_expiry_date === '' ? null : moment(value.wri_expiry_date, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        // wri_expiry_date: moment(),
        // wri_expiry_date: moment().add(60,'days'),//.format(SETTINGS.DATE_TIME_FORMAT),
        wri_expiry_date: serverCurrent.add(config?.wriExpiryDays, 'days'),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="wri_expiry_date"
      label={t('fields.wriExpiryDate')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
    </Form.Item>
  );
};

export default ExpiredAfter;
