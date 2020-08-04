import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';

const EffectiveFrom = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.effectiveFrom')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const expiredAfter = form.getFieldValue('mv_dtim_expiry');
    if (input.isAfter(expiredAfter)) {
      return Promise.reject(`${t('validate.effectiveDateLaterThanExpiryDate')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_dtim_effect:
          value.mv_dtim_effect === '' ? null : moment(value.mv_dtim_effect, SETTINGS.DATE_TIME_FORMAT),
      });
    }
    else {
      setFieldsValue({
        mv_dtim_effect: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mv_dtim_effect"
      label={t('fields.effectiveFrom')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default EffectiveFrom;
